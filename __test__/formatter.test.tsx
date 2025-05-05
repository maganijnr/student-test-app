import { Student } from "@/types";
import {
	calculateTotalNumberOfAlumniStudents,
	calculateTotalNumberOfEnrolledStudents,
	calculateTotalNumberOfGraduatedStudents,
	calculateTotalNumberOfStudents,
} from "@/utils/formatter";

const createMockStudent = (
	id: string,
	status: Student["enrollment_status"] = "Enrolled"
): Student => ({
	id,
	first_name: `Student ${id}`,
	last_name: `Last ${id}`,
	email: `student${id}@example.com`,
	avatar: `https://example.com/image${id}.png`,
	enrollment_status: status,
});

describe("calculateTotalNumberOfStudents", () => {
	it("should return 0 for an empty array", () => {
		const students: Student[] = [];
		expect(calculateTotalNumberOfStudents(students)).toBe(0);
	});

	it("should return 0 if the input array is undefined", () => {
		expect(calculateTotalNumberOfStudents(undefined as any)).toBe(0);
	});

	it("should return 0 if the input array is null", () => {
		expect(calculateTotalNumberOfStudents(null as any)).toBe(0);
	});

	it("should return the correct count for an array with one student", () => {
		const students: Student[] = [createMockStudent("1")];
		expect(calculateTotalNumberOfStudents(students)).toBe(1);
	});

	it("should return the correct count for an array with multiple students", () => {
		const students: Student[] = [
			createMockStudent("1"),
			createMockStudent("2"),
			createMockStudent("3"),
		];
		expect(calculateTotalNumberOfStudents(students)).toBe(3);
	});
});

describe("calculateTotalNumberOfAlumniStudents", () => {
	it("should return 0 for an empty array", () => {
		const students: Student[] = [];
		expect(calculateTotalNumberOfAlumniStudents(students)).toBe(0);
	});

	it("should return 0 if the input array is undefined", () => {
		expect(calculateTotalNumberOfAlumniStudents(undefined as any)).toBe(0);
	});

	it("should return 0 if the input array is null", () => {
		expect(calculateTotalNumberOfAlumniStudents(null as any)).toBe(0);
	});

	it("should return 0 if no students are alumni", () => {
		const students: Student[] = [
			createMockStudent("1", "Enrolled"),
			createMockStudent("2", "Graduated"),
		];
		expect(calculateTotalNumberOfAlumniStudents(students)).toBe(0);
	});

	it("should return 1 if one student is alumni", () => {
		const students: Student[] = [
			createMockStudent("1", "Graduated"),
			createMockStudent("2", "Enrolled"),
			createMockStudent("3", "Alumni"),
		];
		expect(calculateTotalNumberOfAlumniStudents(students)).toBe(1);
	});

	it("should return the correct count if multiple students are alumni", () => {
		const students: Student[] = [
			createMockStudent("1", "Alumni"),
			createMockStudent("2", "Graduated"),
			createMockStudent("3", "Enrolled"),
			createMockStudent("4", "Alumni"),
			createMockStudent("5", "Alumni"),
		];
		expect(calculateTotalNumberOfAlumniStudents(students)).toBe(3);
	});
});

describe("calculateTotalNumberOfEnrolledStudents", () => {
	it("should return 0 for an empty array", () => {
		const students: Student[] = [];
		expect(calculateTotalNumberOfEnrolledStudents(students)).toBe(0);
	});

	it("should return 0 if the input array is undefined", () => {
		expect(calculateTotalNumberOfEnrolledStudents(undefined as any)).toBe(0);
	});

	it("should return 0 if the input array is null", () => {
		expect(calculateTotalNumberOfEnrolledStudents(null as any)).toBe(0);
	});

	it("should return 0 if no students are enrolled", () => {
		const students: Student[] = [
			createMockStudent("1", "Graduated"),
			createMockStudent("2", "Alumni"),
		];
		expect(calculateTotalNumberOfEnrolledStudents(students)).toBe(0);
	});

	it("should return 1 if one student is enrolled", () => {
		const students: Student[] = [
			createMockStudent("1", "Graduated"),
			createMockStudent("2", "Enrolled"),
			createMockStudent("3", "Alumni"),
		];
		expect(calculateTotalNumberOfEnrolledStudents(students)).toBe(1);
	});

	it("should return the correct count if multiple students are enrolled", () => {
		const students: Student[] = [
			createMockStudent("1", "Enrolled"),
			createMockStudent("2", "Graduated"),
			createMockStudent("3", "Enrolled"),
			createMockStudent("4", "Alumni"),
			createMockStudent("5", "Enrolled"),
		];
		expect(calculateTotalNumberOfEnrolledStudents(students)).toBe(3);
	});
});

// --- Tests for calculateTotalNumberOfGraduatedStudents ---
describe("calculateTotalNumberOfGraduatedStudents", () => {
	it("should return 0 for an empty array", () => {
		const students: Student[] = [];
		expect(calculateTotalNumberOfGraduatedStudents(students)).toBe(0);
	});

	it("should return 0 if the input array is undefined", () => {
		expect(calculateTotalNumberOfGraduatedStudents(undefined as any)).toBe(0);
	});

	it("should return 0 if the input array is null", () => {
		expect(calculateTotalNumberOfGraduatedStudents(null as any)).toBe(0);
	});

	it("should return 0 if no students are graduated", () => {
		const students: Student[] = [
			createMockStudent("1", "Enrolled"),
			createMockStudent("2", "Alumni"),
		];
		expect(calculateTotalNumberOfGraduatedStudents(students)).toBe(0);
	});

	it("should return 1 if one student is graduated", () => {
		const students: Student[] = [
			createMockStudent("1", "Graduated"),
			createMockStudent("2", "Enrolled"),
			createMockStudent("3", "Alumni"),
		];
		expect(calculateTotalNumberOfGraduatedStudents(students)).toBe(1);
	});

	it("should return the correct count if multiple students are graduated", () => {
		const students: Student[] = [
			createMockStudent("1", "Enrolled"),
			createMockStudent("2", "Graduated"),
			createMockStudent("3", "Enrolled"),
			createMockStudent("4", "Graduated"),
			createMockStudent("5", "Graduated"),
		];
		expect(calculateTotalNumberOfGraduatedStudents(students)).toBe(3);
	});
});
