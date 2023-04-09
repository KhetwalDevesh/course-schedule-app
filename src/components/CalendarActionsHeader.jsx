import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import { onNext, onPrev } from "../utils";
import { format } from "date-fns";

const CalendarActionsHeader = ({ currentDate, setCurrentDate }) => {
	let monthToDisplay = format(currentDate, "LLLL");
	let yearToDisplay = format(currentDate, "yyyy");
	return (
		<span className="flex rounded-md bg-blue-500 w-fit">
			<button
				onClick={() => {
					const updatedDate = onPrev({ _currentDate: currentDate });
					setCurrentDate(updatedDate);
				}}
				className="flex items-center justify-center rounded-l-md border border-r-0 text-white w-9 p-2">
				<ChevronLeftIcon />
			</button>
			<button
				onClick={() => {
					setCurrentDate(new Date());
				}}
				className="border-t border-b   px-3.5 text-sm font-medium text-white ">
				Today, {monthToDisplay} {yearToDisplay}
			</button>
			<button
				onClick={() => {
					const updatedDate = onNext({ _currentDate: currentDate });
					setCurrentDate(updatedDate);
				}}
				className="flex items-center justify-center rounded-r-md border border-l-0 text-white w-9 p-2">
				<ChevronRightIcon />
			</button>
		</span>
	);
};

export default CalendarActionsHeader;
