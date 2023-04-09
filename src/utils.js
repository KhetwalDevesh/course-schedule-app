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
	const startingDay = startOfMonth(currentDate).getDay();

	const numbersOfDays = [...Array(startingDay - 1).fill(uuid())];
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
	let nextMonth = null;
	if (newDate.getMonth() === 11) {
		nextMonth = 0;
	} else {
		nextMonth = newDate.getMonth() + 1;
	}
	let nextYear = newDate.getFullYear();
	if (nextMonth === 0) {
		nextYear = nextYear + 1;
	}
	newDate.setMonth(nextMonth);
	newDate.setFullYear(nextYear);
	return newDate;
};

export const onPrev = ({ _currentDate }) => {
	let newDate = new Date(_currentDate);
	let prevMonth = null;
	if (newDate.getMonth() === 0) {
		prevMonth = 11;
	} else {
		prevMonth = newDate.getMonth() - 1;
	}
	let prevYear = newDate.getFullYear();
	if (prevMonth === 11) {
		prevYear = prevYear - 1;
	}
	newDate.setMonth(prevMonth);
	newDate.setFullYear(prevYear);
	return newDate;
};
