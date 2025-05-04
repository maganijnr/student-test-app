import WidgetCard from "@/components/WidgetCard";
import useAppStore from "@/store/store";
import { scale, verticalScale } from "@/utils/styling";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const WidgetsCards = () => {
	const { allStudents } = useAppStore();
	const [totalNumberOfStudents, setTotalNumberOfStudents] = useState(0);
	const [totalNumberOfGraduateStudents, setTotalNumberOfGraduateStudents] =
		useState(0);

	const [totalNumberOfEnrolledStudents, setTotalNumberOfEnrolledStudents] =
		useState(0);

	const [totalNumberOfAlumniStudents, setTotalNumberOfAlumniStudents] =
		useState(0);

	const data: { label: string; value: number }[] = [
		{
			label: "Total Students",
			value: totalNumberOfStudents,
		},
		{
			label: "Total Graduate Students",
			value: totalNumberOfGraduateStudents,
		},
		{
			label: "Total Enrolled Students",
			value: totalNumberOfEnrolledStudents,
		},
		{
			label: "Total Alumni Students",
			value: totalNumberOfAlumniStudents,
		},
	];

	const calculateTotalNumberOfStudents = () => {
		setTotalNumberOfStudents(allStudents.length);

		if (allStudents.length > 0) {
			let graduateStudents = allStudents.filter(
				(student) => student.enrollment_status === "Graduated"
			);
			setTotalNumberOfGraduateStudents(graduateStudents.length);

			let enrolledStudents = allStudents.filter(
				(student) => student.enrollment_status === "Enrolled"
			);
			setTotalNumberOfEnrolledStudents(enrolledStudents.length);

			let alumniStudents = allStudents.filter(
				(student) => student.enrollment_status === "Alumni"
			);
			setTotalNumberOfAlumniStudents(alumniStudents.length);
		}
	};

	useEffect(() => {
		calculateTotalNumberOfStudents();
	}, [allStudents]);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={({ item, index }) => (
					<WidgetCard key={index} item={item} />
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
				contentContainerStyle={{
					gap: scale(20),
				}}
			/>
		</View>
	);
};

export default WidgetsCards;

const styles = StyleSheet.create({
	container: {
		marginTop: verticalScale(20),
	},
});
