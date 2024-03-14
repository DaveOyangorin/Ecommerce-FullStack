const bcrypt = require('bcrypt');
// const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const auth = require("../auth");

module.exports.checkEmailExists = (req,res) => {

	if (req.body.email.includes("@")){
		return User.find({ email : req.body.email })
		.then(result => {

			if (result.length > 0) {
				return res.status(409).send({ error: "Duplicate Email Found" });
			} else {
	            return res.status(404).send({ message: "Email not found" });
			};
		})
		.catch(err => {
			console.error("Error in find", err)
			return res.status(500).send({ error: "Error in find"});
		});
	} else {
	    res.status(400).send({ error: "Invalid Email"})
	};

};

module.exports.registerUser = (req,res) => {

	if (!req.body.email.includes("@")){
	    return res.status(400).send({ error: "Email invalid" });
	} else if (req.body.mobileNo.length !== 11){
	    return res.status(400).send({ error: "Mobile number invalid" });
	} else if (req.body.password.length < 8) {
	    return res.status(400).send({ error: "Password must be atleast 8 characters" });
	} else {
		let newUser = new User({
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
			mobileNo : req.body.mobileNo,
			password : bcrypt.hashSync(req.body.password, 10)
		})

		return newUser.save()
		.then((user) => res.status(201).send({ message: "Registered Successfully" }))
		.catch(err => {
			console.error("Error in saving: ", err)
			return res.status(500).send({ error: "Error in save"})
		})
	}

};

module.exports.loginUser = (req,res) => {

	if(req.body.email.includes("@")){
		return User.findOne({ email : req.body.email })
		.then(result => {

			if(result == null){
				return res.status(404).send({ error: "No Email Found" });
			} else {
				const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

				if (isPasswordCorrect) {
					return res.status(200).send({ access : auth.createAccessToken(result)})
				} else {
					return res.status(401).send({ message: "Email and password do not match" });
				}

			}

		})
		.catch(err => err);
	} else {
	    return res.status(400).send(false)
	}
};

module.exports.getProfile = (req, res) => {

	return User.findById(req.user.id)
	.then(user => {
	    if (!user) {
	        return res.status(404).send({ error: 'User not found' });
	    }

	    user.password = undefined;

	    return res.status(200).send({ user });
	})
	.catch(err => {
		console.error("Error in fetching user profile", err)
		return res.status(500).send({ error: 'Failed to fetch user profile' })
	});

};

module.exports.enroll = (req, res) => {

    console.log(req.user.id);
    console.log(req.body.enrolledCourses) ;

    if(req.user.isAdmin){
        return res.status(403).send({ error: "Admin is forbidden" });
    }

    let newEnrollment = new Enrollment ({
        userId : req.user.id,
        enrolledCourses: req.body.enrolledCourses,
        totalPrice: req.body.totalPrice
    })

    return newEnrollment.save()
    .then(enrolled => {
        return res.status(201).send({ 
			message: "Successfully Enrolled",
			enrolled: enrolled
		 });
    })
    .catch(err => {
    	console.error("Error in enrolling: ", err)
    	return res.status(500).send({ error: "Error in enrolling" })
    })

}

module.exports.getEnrollments = (req, res) => {
	return Enrollment.find({userId : req.user.id})
	.then(enrollments => {
		console.log(enrollments)
		if (enrollment.length > 0) {
			return res.status(200).send({ enrollments });
		}
		return res.status(404).send({ error: 'No enrollments not found' });
	})
	.catch(err => {
		console.error("Error in fetching enrollments")
		return res.status(500).send({ error: 'Failed to fetch enrollments' })
	});
};

module.exports.resetPassword = async (req, res) => {

	try {

		const { newPassword } = req.body;
		const { id } = req.user;

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		
		await User.findByIdAndUpdate(id, { password: hashedPassword });

		res.status(200).json({ message: 'Password reset successfully' });

	} catch (error) {

		console.error(error);
		res.status(500).json({ message: 'Internal server error' });

	}

};

module.exports.updateProfile = async (req, res) => {
	try {

		const userId = req.user.id;

		const { firstName, lastName, mobileNo } = req.body;

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ firstName, lastName, mobileNo },
			{ new: true }
		);

		res.send(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Failed to update profile' });
	}
}
