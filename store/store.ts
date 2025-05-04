import { AppStoreProps, CurrentUserProps, Student } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAppStore = create<AppStoreProps>()(
	persist(
		(set, get) => ({
			allStudents: [],
			currentUser: null,
			isNewUser: true,
			setIsNewUser: (value: boolean) => set({ isNewUser: value }),
			addNewStudent: (student: Student) =>
				set({ allStudents: [...get().allStudents, student] }),
			setCurrentUser: (user: CurrentUserProps) => set({ currentUser: user }),
			setAllStudents: (students: Student[]) =>
				set({ allStudents: students }),
			deleteStudent: (studentId: string) =>
				set({
					allStudents: get().allStudents?.filter(
						(student) => student.id !== studentId
					),
				}),
			updateStudent: (student: Student) =>
				set({
					allStudents: get().allStudents?.map((user) =>
						user?.id === student.id ? student : user
					),
				}),
			selectedStudent: null,
			setSelectedStudent: (data: Student | null) =>
				set({
					selectedStudent: data,
				}),
			updateProfile: (data: CurrentUserProps) =>
				set({
					currentUser: data,
				}),
			logout: () =>
				set({
					currentUser: null,
					isNewUser: true,
					allStudents: [],
				}),
		}),
		{
			name: "student-test-storage",
			storage: createJSONStorage(() => AsyncStorage),
			version: 1,
		}
	)
);

export default useAppStore;
