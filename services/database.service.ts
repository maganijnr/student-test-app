import { CurrentUserProps, Student } from "@/types";
import * as SQLite from "expo-sqlite";

const setupDatabase = async () => {
	const db = await SQLite.openDatabaseAsync("student.db");

	return db;
};
export const initiateDatabase = async () => {
	try {
		const myDb = await setupDatabase();

		//Students table
		await myDb.execAsync(`CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        enrollment_status TEXT NOT NULL,
        avatar TEXT
      );`);

		//Setup Admin Profile
		await myDb.execAsync(`CREATE TABLE IF NOT EXISTS user_profile (
        fullname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        avatar TEXT
      );`);
	} catch (error: any) {
		return error?.response;
	}
};

export const fetchAllStudentsFromDB = async (): Promise<Student[]> => {
	try {
		const myDb = await setupDatabase();

		const allRows = await myDb.getAllAsync<Student>(
			`SELECT * FROM students;`
		);

		// Return the array of students
		return allRows;
	} catch (error) {
		return [];
	}
};

export const addStudentToDB = async (
	student: Student
): Promise<Student | null> => {
	try {
		const myDb = await setupDatabase();

		await myDb.runAsync(
			`INSERT INTO students (id, first_name, last_name, email, enrollment_status, avatar) VALUES (?, ?, ?, ?, ?, ?);`,
			[
				student.id,
				student.first_name,
				student.last_name,
				student.email,
				student.enrollment_status,
				student.avatar,
			]
		);

		return student;
	} catch (error) {
		return null;
	}
};

export const updateStudentInDB = async (
	student: Student
): Promise<Student | null> => {
	try {
		const myDb = await setupDatabase();

		await myDb.runAsync(
			`UPDATE students SET first_name = ?, last_name = ?, email = ?, enrollment_status = ?, avatar = ? WHERE id = ?;`,
			[
				student.first_name,
				student.last_name,
				student.email,
				student.enrollment_status,
				student.avatar,
				student.id,
			]
		);

		return student;
	} catch (error) {
		return null;
	}
};

export const deleteStudentFromDB = async (
	studentId: string
): Promise<string> => {
	try {
		const myDb = await setupDatabase();

		await myDb.runAsync(`DELETE FROM students WHERE id = ?;`, [studentId]);

		return studentId;
	} catch (error) {
		return "";
	}
};

export const fetchUserProfileFromDB =
	async (): Promise<CurrentUserProps | null> => {
		try {
			const myDb = await setupDatabase();

			const user = await myDb.getAllAsync<CurrentUserProps>(
				`SELECT id, fullname, email, avatar FROM user_profile LIMIT 1;`
			);

			return user[0] || null;
		} catch (error) {
			return null;
		}
	};

export const updateUserProfileInDB = async (
	user: CurrentUserProps
): Promise<CurrentUserProps | null> => {
	try {
		const myDb = await setupDatabase();

		// Execute the query with user data
		await myDb.runAsync(
			`INSERT OR REPLACE INTO user_profile ( fullname, email, avatar) VALUES ( ?, ?, ?);`,
			[user.fullname, user.email, user?.avatar ?? ""]
		);

		return user;
	} catch (error) {
		return null;
	}
};
