import { studentsData } from "@/data/student-data";
import { Student } from "@/types";

//MOCK API CALLS
export const getAllStudents = async (): Promise<Student[]> => {
	return studentsData;
};

export const addNewStudentApi = async (
	data: Student
): Promise<{ success: boolean; message: string; data: Student | null }> => {
	if (!data) {
		return {
			success: false,
			message: "Invalid data",
			data: null,
		};
	}

	return {
		success: true,
		message: "Created student successfully",
		data: data,
	};
};

export const updateStudentApi = async (
	data: Student
): Promise<{ success: boolean; message: string; data: Student | null }> => {
	if (!data) {
		return {
			success: false,
			message: "Invalid data",
			data: null,
		};
	}

	return {
		success: true,
		message: "Updated student successfully",
		data: data,
	};
};

export const deleteStudentApi = async (
	data: string
): Promise<{ success: boolean; message: string; data: string | null }> => {
	if (!data) {
		return {
			success: false,
			message: "Invalid data",
			data: null,
		};
	}

	return {
		success: true,
		message: "Deleted student successfully",
		data: data,
	};
};
