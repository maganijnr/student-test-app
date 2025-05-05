import { colors, radius, spacingX } from "@/constants/theme";
import useAppStore from "@/store/store";
import { Student } from "@/types";
import { shortenWord } from "@/utils/formatter";
import { scale } from "@/utils/styling";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import EnrollmentPill from "./EnrollmentPill";
import Typo from "./Typo";

const StudentCard: FC<Student> = ({
	id,
	first_name,
	last_name,
	email,
	enrollment_status,
	avatar,
}) => {
	const { setSelectedStudent } = useAppStore();
	return (
		<TouchableOpacity
			onPress={() => {
				setSelectedStudent({
					id,
					first_name,
					last_name,
					email,
					enrollment_status,
					avatar,
				});
				router.push("/(modals)/studentModal");
			}}
		>
			<View style={styles.container}>
				<View
					style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
				>
					<View style={styles.imageContainer}>
						<Image
							source={
								avatar
									? avatar
									: require("@/assets/images/no-profile.png")
							}
							contentFit="cover"
							transition={1000}
							style={styles.image}
						/>
					</View>

					<View>
						<Typo size={14} fontWeight={600}>
							{first_name + " " + last_name}
						</Typo>
						<Typo size={12} fontWeight={700}>
							{shortenWord(email, 18)}
						</Typo>
					</View>

					<EnrollmentPill enrollment={enrollment_status} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default StudentCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primaryDark,
		paddingHorizontal: spacingX._10,
		height: scale(60),
		borderRadius: radius._12,
		justifyContent: "center",
	},
	imageContainer: {
		width: scale(30),
		height: scale(30),
		borderRadius: "100%",
		overflow: "hidden",
		borderWidth: 1,
		borderColor: colors.white,
		backgroundColor: colors.white,
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
