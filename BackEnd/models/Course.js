//[SECTION] Dependencies and Modules
  const mongoose = require('mongoose');

//[SECTION] Schema/Blueprint
  const courseSchema = new mongoose.Schema({
  		name: {
  			type: String,
  			required: [true, 'is Required']
  		},
  		description: {
  			type: String,
  			required: [true, 'is Required']
  		},
  		price: {
  			type: Number,
  			required: [true, 'Course Price is Required']
  		},
  		isActive: {
  			type: Boolean,
  			default: true
  		}, 
  		createdOn: {
  			type: Date,
  			default: new Date()
  		},  
  		enrollees: [
  			{
  				userId: {
  					type: String,
  					required: [true, 'Student ID is Required']
  				},
  				enrolledOn: {
  					type: Date,
  					default: new Date()
  				}
  			}
  		]
  });

//[SECTION] Model
	module.exports = mongoose.model('Course', courseSchema);