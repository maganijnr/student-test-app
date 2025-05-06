import EmptyState from "@/components/EmptyState";
import Input from "@/components/Input";
import StudentCard from "@/components/StudentCard";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import useAppStore from "@/store/store";
import { Student } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import React, { useMemo, useState } from "react";
import {
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

const filterOptions: { label: string; value: string }[] = [
	{ label: "Enrolled", value: "Enrolled" },
	{ label: "Alumni", value: "Alumni" },
	{ label: "Graduated", value: "Graduated" },
];

const StudentList = () => {
	const [filter, setFilter] = useState("");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const { allStudents } = useAppStore();
	const [search, setSearch] = useState("");

	const studentsResults: Student[] = useMemo(() => {
		if (search) {
			const data = allStudents.filter((student) => {
				return (
					student?.first_name
						?.toLowerCase()
						?.includes(search?.toLowerCase()) ||
					student?.last_name
						?.toLowerCase()
						?.includes(search?.toLowerCase())
				);
			});

			if (filter) {
				return data.filter((student) => {
					return student?.enrollment_status !== filter;
				});
			}

			return data;
		}

		if (filter) {
			return allStudents.filter((student) => {
				return student?.enrollment_status === filter;
			});
		}
		return allStudents;
	}, [allStudents, search, filter]);

	return (
		<View style={styles.contianer}>
			<View style={styles.searchContainer}>
				<Input
					value={search}
					onHandleTextChange={setSearch}
					placeHolder="Search for student"
					placeholderTextColor={colors.neutral400}
					style={{
						flex: 1,
					}}
				/>
				<TouchableOpacity
					style={{
						width: Platform.OS === "ios" ? scale(45) : scale(55),
						height:
							Platform.OS === "ios"
								? verticalScale(50)
								: verticalScale(60),
						backgroundColor: colors.primaryDark,
						borderRadius: scale(10),
						alignItems: "center",
						justifyContent: "center",
					}}
					onPress={() => {
						setIsFilterOpen(!isFilterOpen);
					}}
				>
					<Icons.SlidersHorizontal color="#fff" />
				</TouchableOpacity>

				{isFilterOpen && (
					<View style={styles.filterContainer}>
						{filterOptions?.map((option) => (
							<Pressable
								key={option.value}
								style={styles.filterButton}
								onPress={() => {
									setIsFilterOpen(false);
									setFilter(option.value);
								}}
							>
								<Typo
									size={14}
									color={
										filter === option?.value
											? colors.primaryDark
											: colors.black
									}
									fontWeight={600}
								>
									{option.label}
								</Typo>
							</Pressable>
						))}
						<Pressable
							style={[
								styles.filterButton,
								{
									alignItems: "center",
									backgroundColor: colors.primaryDark,
									borderRadius: scale(10),

									height: verticalScale(35),
								},
							]}
							onPress={() => {
								setIsFilterOpen(false);
								setFilter("");
							}}
						>
							<Typo size={14} color={colors.white} fontWeight={600}>
								Close
							</Typo>
						</Pressable>
					</View>
				)}
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
						<StudentCard key={student.id} item={student} index={index} />
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
		flexDirection: "row",
		gap: scale(10),
		position: "relative",
	},

	filterContainer: {
		position: "absolute",
		top: verticalScale(55),
		right: 0,
		width: scale(200),
		// height: 100,
		backgroundColor: "#fff",
		borderRadius: scale(10),
		borderWidth: 1,
		borderColor: colors.neutral300,
		zIndex: 1,
		padding: scale(10),
		gap: verticalScale(10),
	},
	filterButton: {
		height: verticalScale(30),
		justifyContent: "center",
	},
});
