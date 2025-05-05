import { studentsData } from "@/data/student-data";
import {
	addStudentToDB,
	deleteStudentFromDB,
	fetchAllStudentsFromDB,
	fetchUserProfileFromDB,
	initiateDatabase,
	updateStudentInDB,
	updateUserProfileInDB,
} from "@/services/database.service";
import { CurrentUserProps, Student } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StoreProps {
	allStudents: Student[];
	currentUser: CurrentUserProps | null;
	isNewUser: boolean;
	selectedStudent: Student | null;
	loadInitialData: () => void;
	setCurrentUser: (user: CurrentUserProps) => void;
	addNewStudent: (student: Student) => void;
	updateStudent: (student: Student) => void;
	deleteStudent: (studentId: string) => void;
	updateProfile: (user: CurrentUserProps) => void;
	setSelectedStudent: (student: Student) => void;
	logout: () => void;
}

initiateDatabase();
const useAppStore = create<StoreProps>()(
	persist(
		(set, get) => ({
			allStudents: [],
			currentUser: null,
			isNewUser: true,
			selectedStudent: null,

			loadInitialData: async () => {
				try {
					let students = await fetchAllStudentsFromDB();
					const userProfile = await fetchUserProfileFromDB();

					if (students.length === 0 && !userProfile) {
						for (const student of studentsData) {
							await addStudentToDB(student);
						}
						// Fetch students again after seeding
						students = await fetchAllStudentsFromDB();
					}

					set({
						allStudents: students?.length === 0 ? studentsData : students,
						currentUser: userProfile,
						isNewUser: !userProfile,
					});
				} catch (error) {
					console.error("Failed to load initial data from DB:", error);
					// Handle error appropriately
				}
			},

			setCurrentUser: async (user: CurrentUserProps) => {
				try {
					// Persist user profile to DB when set
					const updatedUser = await updateUserProfileInDB(user);
					console.log("🚀 ~ setCurrentUser: ~ updatedUser:", updatedUser);

					set({ currentUser: updatedUser, isNewUser: false });
				} catch (error) {
					console.error("Failed to save user profile to DB:", error);
					// Handle error (e.g., show toast)
				}
			},

			addNewStudent: async (student: Student) => {
				try {
					const addedStudent = await addStudentToDB(student);
					set((state: any) => ({
						allStudents: [...state.allStudents, addedStudent],
					}));
					// Maybe return success status or the student?
				} catch (error) {
					console.error("Failed to add student to DB:", error);
					// Handle error
				}
			},

			updateStudent: async (student: Student) => {
				try {
					const updatedStudent = await updateStudentInDB(student);
					set((state: any) => ({
						allStudents: state.allStudents.map((s: Student) =>
							s.id === updatedStudent?.id ? updatedStudent : s
						),
						// Clear selected student if it was the one updated
						selectedStudent:
							state.selectedStudent?.id === updatedStudent?.id
								? updatedStudent
								: state.selectedStudent,
					}));
				} catch (error) {
					console.error("Failed to update student in DB:", error);
					// Handle error
				}
			},

			deleteStudent: async (studentId: string) => {
				try {
					await deleteStudentFromDB(studentId);
					set((state: any) => ({
						allStudents: state.allStudents.filter(
							(s: Student) => s.id !== studentId
						),
						// Clear selected student if it was the one deleted
						selectedStudent:
							state.selectedStudent?.id === studentId
								? null
								: state.selectedStudent,
					}));
				} catch (error) {
					console.error("Failed to delete student from DB:", error);
					// Handle error
				}
			},

			setSelectedStudent: (student: Student) =>
				set({ selectedStudent: student }),

			updateProfile: async (user: CurrentUserProps) => {
				try {
					const updatedUser = await updateUserProfileInDB(user);
					set({ currentUser: updatedUser });
				} catch (error) {
					console.error("Failed to update profile in DB:", error);
				}
			},

			logout: () => {
				set({
					currentUser: null,
					selectedStudent: null,
				});
			},
		}),
		{
			name: "student-test-storage",
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state: any) => ({
				currentUser: state?.currentUser,
				isNewUser: state?.isNewUser,
			}),
			version: 1,
		}
	)
);

export default useAppStore;
