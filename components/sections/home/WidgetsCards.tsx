import WidgetCard from "@/components/WidgetCard";
import useAppStore from "@/store/store";
import {
	calculateTotalNumberOfAlumniStudents,
	calculateTotalNumberOfEnrolledStudents,
	calculateTotalNumberOfGraduatedStudents,
	calculateTotalNumberOfStudents,
} from "@/utils/formatter";
import { scale, verticalScale } from "@/utils/styling";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const WidgetsCards = () => {
	const { allStudents } = useAppStore();

	const data: { label: string; value: number }[] = [
		{
			label: "Total Students",
			value: calculateTotalNumberOfStudents(allStudents),
		},
		{
			label: "Total Graduate Students",
			value: calculateTotalNumberOfGraduatedStudents(allStudents),
		},
		{
			label: "Total Enrolled Students",
			value: calculateTotalNumberOfEnrolledStudents(allStudents),
		},
		{
			label: "Total Alumni Students",
			value: calculateTotalNumberOfAlumniStudents(allStudents),
		},
	];

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
