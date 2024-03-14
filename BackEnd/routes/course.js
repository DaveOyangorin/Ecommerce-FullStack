//[SECTION] Dependencies and Modules
	const express = require('express');
	const courseController = require("../controllers/course");
	const auth = require("../auth") 

	const {verify, verifyAdmin} = auth;

//[SECTION] Routing Component
	const router = express.Router();


//[ACTIVITY] create a course POST
	router.post("/", verify, verifyAdmin, courseController.addCourse);


//[SECTION] Route for retrieving all the courses 
	router.get("/all", courseController.getAllCourses);

//[SECTION] Route for retrieving all the ACTIVE courses for all users
	// Middleware for verifying JWT is not required because users who aren't logged in should also be able to view the courses
	router.get("/", courseController.getAllActive);


//[SECTION] Route for Search Course by Name
	router.post('/searchByName', courseController.searchCoursesByName);	

//[ACTIVITY] Search Courses By Price Range
	router.post('/searchByPrice', courseController.searchCoursesByPriceRange);

//[SECTION] Route for retrieving a specific course
	router.get("/:courseId", courseController.getCourse);

//[SECTION] Route for updating a course (Admin)
	router.put("/:courseId", verify, verifyAdmin, courseController.updateCourse);

// [SECTION]Route to get the emails of users enrolled in a course

// Solution
	router.get('/:courseId/enrolled-users', courseController.getEmailsOfEnrolledUsers);

//Given to students:
	// router.post('/:courseId/enrolled-users', getEmailsOfEnrolledUsers;

//[ACTIVITY] Route to archiving a course (Admin)
	router.put("/:courseId/archive", verify, verifyAdmin, courseController.archiveCourse);

//[ACTIVITY] Route to activating a course (Admin)
	router.put("/:courseId/activate", verify, verifyAdmin, courseController.activateCourse);





// Allows us to export the "router" object that will be accessed in our "index.js" file
		module.exports = router;

