import { colors, radius } from "@/constants/theme";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

const EnrollmentPill: FC<{ enrollment: string }> = ({ enrollment }) => {
	return (
		<View style={styles.container}>
			<Typo size={10} color={colors.primaryDark} fontWeight={700}>
				{enrollment}
			</Typo>
		</View>
	);
};

export default EnrollmentPill;

const styles = StyleSheet.create({
	container: {
		marginLeft: "auto",
		backgroundColor: colors.white,
		paddingHorizontal: 5,
		paddingVertical: 2,
		borderRadius: radius._15,
	},
});
