//[SECTION] Dependencies and Modules
	const Course = require("../models/Course");
	const User = require("../models/User");


//[SECTION] Create a new course

	module.exports.addCourse = (req, res) => {
		let newCourse = new Course({
				name : req.body.name,
				description : req.body.description,
				price : req.body.price
			});

		return newCourse.save().then((course, error) => {
			// Course creation successful
			if (error) {
				return res.send(false);

			// Course creation failed
			} else {
				return res.send(true);
			}
		})
		.catch(err => res.send(err))
	}


//[SECTION] Retrieve all courses
	module.exports.getAllCourses = (req, res) => {
		return Course.find({}).then(result => {
			return res.send(result);
		})
		.catch(err => res.send(err))
	};


//[SECTION] Retrieve all ACTIVE courses
	module.exports.getAllActive = (req, res) => {
		return Course.find({ isActive : true }).then(result => {
			return res.send(result);
		})
		.catch(err => res.send(err))
	};

//[SECTION] Retrieving a specific course
	module.exports.getCourse = (req, res) => {
		return Course.findById(req.params.courseId).then(result => {
			return res.send(result);
		})
		.catch(err => res.send(err))
	};


//[SECTION] Update a course
	module.exports.updateCourse = (req, res) => {
			// Specify the fields/properties of the document to be updated
			let updatedCourse = {
				name : req.body.name,
				description	: req.body.description,
				price : req.body.price
			};

			// Syntax
				// findByIdAndUpdate(document ID, updatesToBeApplied)
			return Course.findByIdAndUpdate(req.params.courseId, updatedCourse).then((course, error) => {

				// Course not updated
				if (error) {
					return res.send(false);

				// Course updated successfully
				} else {				
					return res.send(true);
				}
			})
			.catch(err => res.send(err))
		};


//SECTION] Archive a course
	module.exports.archiveCourse = (req, res) => {

		let updateActiveField = {
			isActive: false
		}

		return Course.findByIdAndUpdate(req.params.courseId, updateActiveField)
		.then((course, error) => {

			//course archived successfully
			if(error){
				return res.send(false)

			// failed
			} else {
				return res.send(true)
			}
		})
		.catch(err => res.send(err))

	};


//[SECTION] Activate a course
	module.exports.activateCourse = (req, res) => {

		let updateActiveField = {
			isActive: true
		}

		return Course.findByIdAndUpdate(req.params.courseId, updateActiveField)
			.then((course, error) => {

			//course archived successfully
			if(error){
				return res.send(false)

			// failed
			} else {
				return res.send(true)
				}
		})
		.catch(err => res.send(err))

	};

//ChatGPT Generated Code

module.exports.searchCoursesByName = async (req, res) => {
	try {
	  const { courseName } = req.body;
  
	  // Use a regular expression to perform a case-insensitive search
	  const courses = await Course.find({
		name: { $regex: courseName, $options: 'i' }
	  });
  
	  res.json(courses);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Controller to get the list of emails of users enrolled in a course
//Solution
module.exports.getEmailsOfEnrolledUsers = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    // Find the course by courseId
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Get the userIds of enrolled users from the course
    const userIds = course.enrollees.map(enrollee => enrollee.userId);

    // Find the users with matching userIds
    const enrolledUsers = await User.find({ _id: { $in: userIds } });

    // Extract the emails from the enrolled users
    const emails = enrolledUsers.map(user => user.email);

    res.status(200).json({ emails });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving enrolled users' });
  }
};

//Given to students:
/* 
	const getEmailsOfEnrolledUsers = async (req, res) => {
	const courseId = req.body.courseId;
  
	try {
	  // Find the course by courseId
	  const course = await Course.findById(courseId);
  
	  if (!course) {
		return res.status(404).json({ message: 'Course not found' });
	  }
  
	  // Get the userIds of enrolled users from the course
	  const userIds = course.enrollees.map(enrollee => enrollee.userId);
  
	  // Find the users with matching userIds
	  const enrolledUsers = await User.find({ _id: { $in: users } });
  
	  // Extract the emails from the enrolled users
	  const emails = enrolledStudents.forEach(user => user.email);
  
	  res.status(200).json({ userEmails });
	} catch (error) {
	  res.status(500).json({ message: 'An error occurred while retrieving enrolled users' });
	}
  }; 
  
 
*/

//[ACTIVITY]

	exports.searchCoursesByPriceRange = async (req, res) => {
		try {
		  const { minPrice, maxPrice } = req.body;
	  
		  // Find courses within the price range
		  const courses = await Course.find({
			price: { $gte: minPrice, $lte: maxPrice }
		  });
	  
		  res.status(200).json({ courses });
		} catch (error) {
		  res.status(500).json({ error: 'An error occurred while searching for courses' });
		}
	  };

























