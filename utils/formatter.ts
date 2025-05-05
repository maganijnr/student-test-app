import { Student } from "@/types";

export function numberWithCommas(number: number) {
	if (!number) return number;
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const generateRandomId = () => {
	return Math.random().toString(36).substring(2, 15);
};

export const shortenWord = (str: string, n: number) => {
	return str?.length >= n ? str.slice(0, n) + "..." : str;
};

export function calculateTotalNumberOfStudents(data: Student[]): number {
	return data?.length || 0;
}

export function calculateTotalNumberOfEnrolledStudents(
	data: Student[]
): number {
	return (
		data?.filter((student) => student.enrollment_status === "Enrolled")
			.length || 0
	);
}

export function calculateTotalNumberOfGraduatedStudents(
	data: Student[]
): number {
	return (
		data?.filter((student) => student.enrollment_status === "Graduated")
			.length || 0
	);
}

export function calculateTotalNumberOfAlumniStudents(data: Student[]): number {
	return (
		data?.filter((student) => student.enrollment_status === "Alumni")
			.length || 0
	);
}
