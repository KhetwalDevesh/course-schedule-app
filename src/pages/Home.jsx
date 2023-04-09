import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const baseURL = "http://localhost:8000";
function Home() {
	const [courses, setCourses] = useState([
		{
			_id: "1",
			courseId: "java",
			name: "java",
			duration: [
				{
					_id: "dur_one",
					duration: 2,
				},
				{
					_id: "dur_two",
					duration: 4,
				},
				{
					_id: "dur_three",
					duration: 6,
				},
			],
		},
	]);

	const [selectedCourse, setSelectedCourse] = useState();
	const [selectedDuration, setSelectedDuration] = useState();
	const navigate = useNavigate();
	const durationsAvailableForSelectedCourse = courses?.find(
		(course) => course.courseId === selectedCourse
	)?.duration;

	const enrollForCourse = async () => {
		try {
			const data = {
				course: selectedCourse,
				durationPerDay: selectedDuration,
				enrollmentDate: new Date(),
			};
			const response = await axios({
				method: "post",
				url: `${baseURL}/enroll`,
				data,
			});
			toast.success("You have enrolled for the course successfully");
		} catch (error) {
			console.log(error);
			if (error.response.status === 409) {
				toast.error("You are already enrolled in this course");
			}
		}
	};

	const goToSchedulePage = async () => {
		try {
			navigate("/schedule", { state: { course: selectedCourse } });
		} catch (error) {}
	};

	const deleteAllEnrollments = async () => {
		try {
			const response = await axios({
				method: "delete",
				url: `${baseURL}/enroll`,
			});
			toast.success("All enrollments have been deleted");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="flex flex-col space-y-4 max-w-md w-full">
				{/* first name and last name section */}
				<div className="">
					<div className="flex flex-col items-start space-y-3 w-full">
						<label htmlFor="courses" className="text-base font-semibold">
							Courses
						</label>
						<select
							id="courses"
							type="text"
							placeholder="Course"
							value={selectedCourse}
							onChange={(e) => {
								setSelectedCourse(e.target.value);
							}}
							className={clsx("p-4 rounded-xl border border-silver w-full")}>
							<option value="">Select Course</option>
							{courses.map((course) => {
								return (
									<option key={course.courseId} value={course.courseId}>
										{course.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="flex  mt-4  flex-col items-start space-y-3 w-full">
						<label htmlFor="courses" className="text-base font-semibold">
							Duration
						</label>

						<select
							id="duration"
							type="number"
							placeholder="Duration"
							value={selectedDuration}
							onChange={(e) => {
								setSelectedDuration(e.target.value);
							}}
							className={clsx("p-4 rounded-xl border border-silver w-full")}>
							<option value="">Select duration</option>
							{durationsAvailableForSelectedCourse &&
								durationsAvailableForSelectedCourse?.map((durationItem) => {
									return (
										<option
											key={durationItem._id}
											value={durationItem.duration}>
											{durationItem.duration}
										</option>
									);
								})}
						</select>
					</div>
				</div>
				{/* city */}

				<div className="pt-4">
					<button
						onClick={enrollForCourse}
						className={clsx(
							"p-4 px-10 rounded-xl w-full bg-blue-500 text-white",
							{
								"cursor-not-allowed bg-gray-300":
									!selectedCourse || !selectedDuration,
							}
						)}>
						Enroll
					</button>
				</div>

				<div className="pt-4">
					<button
						onClick={goToSchedulePage}
						className={clsx(
							"p-4 px-10 rounded-xl w-full bg-pink-500 text-white"
						)}>
						Go to schedule
					</button>
				</div>

				<div className="pt-4">
					<button
						onClick={deleteAllEnrollments}
						className={clsx(
							"p-4 px-10 rounded-xl w-full bg-rose-600 text-white"
						)}>
						Delete all enrollments (testing)
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;
