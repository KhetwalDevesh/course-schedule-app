import { startOfMonth } from "date-fns";
import { v4 as uuid } from "uuid";

export const getNumberOfDatesAvailableInCurrentMonth = (
	numberOfDaysInCurrentMonth
) => {
	const arrayOfElements = [];
	for (let i = 1; i <= numberOfDaysInCurrentMonth; i++) {
		arrayOfElements.push(i);
	}
	return arrayOfElements;
};

export const getNumbersOfDaysToBeSkipped = (currentDate) => {
	let startingDay = startOfMonth(currentDate).getDay();
	// console.log("startingDay", JSON.stringify(startingDay, null, 2));
	if (startingDay === 0) {
		startingDay = 7;
	}
	const numbersOfDays = [...Array(startingDay - 1).fill(uuid())];
	// console.log("numberOfDays", JSON.stringify(numbersOfDays, null, 2));
	return numbersOfDays;
};

export const getNumberOfDaysInCurrentMonth = (currentDate) => {
	const numberOfDays = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0
	).getDate();
	return numberOfDays;
};

export const onNext = ({ _currentDate }) => {
	let newDate = new Date(_currentDate);
	function getFirstDateOfNextMonth(date) {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDayOfNextMonth = new Date(year, month + 1, 1);
		return firstDayOfNextMonth;
	}
	const firstDateOfNextMonth = getFirstDateOfNextMonth(newDate);
	console.log(firstDateOfNextMonth);
	return firstDateOfNextMonth;
};

export const onPrev = ({ _currentDate }) => {
	let newDate = new Date(_currentDate);
	function getFirstDateOfPreviousMonth(date) {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDayOfPreviousMonth = new Date(year, month - 1, 1);
		return firstDayOfPreviousMonth;
	}
	const firstDateOfPreviousMonth = getFirstDateOfPreviousMonth(newDate);
	return firstDateOfPreviousMonth;
};
