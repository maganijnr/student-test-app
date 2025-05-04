import Typo from "@/components/Typo";
import { colors, radius, spacingX } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

const InfoItem: FC<{ value: string; label: string }> = ({ value, label }) => {
	return (
		<View style={styles.conatiner}>
			<Typo color={colors.primaryDark} size={12} fontWeight={600}>
				{label}
			</Typo>
			<View style={styles.valuesWrapper}>
				<Typo size={14} fontWeight={600} color={colors.black}>
					{value}
				</Typo>
			</View>
		</View>
	);
};

export default InfoItem;

const styles = StyleSheet.create({
	conatiner: {
		gap: verticalScale(8),
		position: "relative",
	},
	valuesWrapper: {
		backgroundColor: colors.white,
		height: verticalScale(50),
		borderWidth: 1.5,
		borderColor: colors.primaryDark,
		borderRadius: radius._10,
		paddingLeft: spacingX._10,
		justifyContent: "center",
	},
});
