import EmptyState from "@/components/EmptyState";
import Input from "@/components/Input";
import StudentCard from "@/components/StudentCard";
import { colors } from "@/constants/theme";
import useAppStore from "@/store/store";
import { Student } from "@/types";
import { verticalScale } from "@/utils/styling";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const StudentList = () => {
	const { allStudents } = useAppStore();
	const [search, setSearch] = useState("");

	const studentsResults: Student[] = useMemo(() => {
		if (search) {
			return allStudents.filter((student) => {
				return (
					student?.first_name
						?.toLowerCase()
						?.includes(search?.toLowerCase()) ||
					student?.last_name
						?.toLowerCase()
						?.includes(search?.toLowerCase())
				);
			});
		}
		return allStudents;
	}, [allStudents, search]);

	return (
		<View style={styles.contianer}>
			<View style={styles.searchContainer}>
				<Input
					value={search}
					onHandleTextChange={setSearch}
					placeHolder="Search for student"
					placeholderTextColor={colors.neutral400}
				/>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ marginTop: 20 }}
				contentContainerStyle={{
					gap: verticalScale(10),
					paddingBottom: verticalScale(20),
				}}
			>
				{studentsResults?.length === 0 ? (
					<EmptyState message="No student found" />
				) : (
					studentsResults?.map((student, index) => (
						<StudentCard key={student.id} {...student} />
					))
				)}
			</ScrollView>
		</View>
	);
};

export default StudentList;

const styles = StyleSheet.create({
	contianer: {
		marginTop: 20,
		flex: 1,
	},

	searchContainer: {
		height: verticalScale(50),
	},
});
