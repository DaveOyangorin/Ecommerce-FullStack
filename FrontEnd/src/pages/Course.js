import CourseCard from '../components/CourseCard'
import courseData from "../data/courseData";

export default function Courses() {

	const courses = courseData.map(course => {
		return(
			<>
				<CourseCard key={course.id} courseProp={course}/>	
			</>
	)
})

	return (
		<>
			{courses}
		</>

	)

}