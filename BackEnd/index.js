//[SECTION] Dependencies and Modules
	const express = require("express");
	const mongoose = require("mongoose");
	const cors = require("cors");
	const userRoutes = require("./routes/user");
	const courseRoutes = require("./routes/course");


//[SECTION] Environment Setup
	const port = 4000;

//[SECTION] Server Setup
	const app = express();
	
	app.use(cors())
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));


//[SECTION] Database Connection 
	mongoose.connect("mongodb+srv://daveoyangorin:admin1234@batch364.njbbrbz.mongodb.net/BookingCourseFullstack?retryWrites=true&w=majority&appName=Cluster0", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));


//[SECTION] Backend Routes 
	//http://localhost:4000/users
	app.use("/users", userRoutes);
	//http://localhost:4000/courses
	app.use("/courses", courseRoutes);


//[SECTION] Server Gateway Response
	if(require.main === module) {
		app.listen( process.env.PORT || port, () => {
			console.log(`API is now online on port ${ process.env.PORT || port }`)
		});
	}


module.exports = app;
