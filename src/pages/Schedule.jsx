import React, { useEffect, useMemo } from "react";
import { format } from "date-fns";

import {
	getNumberOfDatesAvailableInCurrentMonth,
	getNumberOfDaysInCurrentMonth,
	getNumbersOfDaysToBeSkipped,
	onNext,
	onPrev,
} from "../utils";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "./Home";
import CalendarActionsHeader from "../components/CalendarActionsHeader";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import clsx from "clsx";

const Schedule = () => {
	const location = useLocation();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [tasksToRenderInModal, setTasksToRenderInModal] = useState();
	const [isOpen, setIsOpen] = useState();
	const [allTasksPerSchedule, setAllTasksPerSchedule] = useState({});
	const [loading, setLoading] = useState(false);
	let monthToDisplay = format(currentDate, "LLLL");
	let yearToDisplay = format(currentDate, "yyyy");
	let currentMonth = currentDate.getMonth() + 1;

	const numberOfDaysInCurrentMonth = getNumberOfDaysInCurrentMonth(currentDate);
	const availableDates = getNumberOfDatesAvailableInCurrentMonth(
		numberOfDaysInCurrentMonth
	);
	const numberOfDaysToSkip = getNumbersOfDaysToBeSkipped(currentDate);
	const courseEnrolledOn = location.state.course;
	// console.log("courseEnrolledOn", JSON.stringify(courseEnrolledOn, null, 2));
	const getScheduleForCurrentMonth = async () => {
		try {
			if (courseEnrolledOn === undefined) {
				return;
			}
			setLoading(true);
			const response = await axios({
				method: "get",
				url: `${baseURL}/enroll/?course=${courseEnrolledOn}`,
			});
			setAllTasksPerSchedule(response.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	useEffect(() => {
		getScheduleForCurrentMonth();
	}, [currentDate]);

	return (
		<div className="p-12">
			<CalendarActionsHeader
				currentDate={currentDate}
				setCurrentDate={setCurrentDate}
			/>
			<div className="grid grid-cols-7 p-2 m-2 gap-x-6">
				<div className="">Monday</div>
				<div className="">Tuesday</div>
				<div className="">Wednesday</div>
				<div className="">Thursday</div>
				<div className="">Friday</div>
				<div className="">Saturday</div>
				<div className="">Sunday</div>
			</div>
			<div className="grid grid-cols-7">
				{numberOfDaysToSkip.map((day, index) => {
					return (
						<div
							key={day + index}
							className="m-2 p-2 w-[90%] h-32 bg-slate-100"
						/>
					);
				})}
				{availableDates.map((date, index) => {
					let keyForCurrentDateTasks = new Date(
						`${yearToDisplay}-${currentMonth}-${date}`
					);
					keyForCurrentDateTasks = keyForCurrentDateTasks.toDateString();
					const tasksForCurrentDate =
						allTasksPerSchedule[keyForCurrentDateTasks];
					return (
						<span
							onClick={() => {
								setTasksToRenderInModal(tasksForCurrentDate);
								setIsOpen(true);
							}}
							key={date + index}
							height={80}
							className={clsx("h-32 m-2 bg-blue-100 p-2 cursor-pointer", {
								"animate-pulse": loading,
							})}>
							<span>{date}</span>
							<div className="absolute">
								{tasksForCurrentDate &&
									tasksForCurrentDate.slice(0, 3).map((task) => {
										return (
											<div key={task._id} className="p-1 text-sm">
												{`${task.title.substring(0, 12)}...`}
											</div>
										);
									})}
							</div>
						</span>
					);
				})}
			</div>
			<div className="grid grid-cols-7 gap-4"></div>
			<div>
				{open && tasksToRenderInModal && (
					<Modal
						open={isOpen}
						onClose={() => setIsOpen(false)}
						center
						classNames={{
							modal: "bg-slate-50 max-w-xl w-full",
						}}>
						<div className="flex flex-col bg-slate-50 p-4">
							<span className="mb-4">
								Tasks to complete on {format(currentDate, "dd MMMM yyyy")}
							</span>
							<div className="space-y-4">
								{tasksToRenderInModal.map((task) => {
									return (
										<div
											key={task._id}
											className="space-y-4 border text-base bg-slate-100 p-2">
											{task.title}
										</div>
									);
								})}
							</div>
						</div>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default Schedule;
