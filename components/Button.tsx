import { colors, radius } from "@/constants/theme";
import { ButtonProps } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import React, { FC } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import Typo from "./Typo";

const Button: FC<ButtonProps> = ({
	style,
	buttonText,
	variant,
	handleOnPress,
}) => {
	return (
		<TouchableOpacity
			onPress={handleOnPress}
			style={[
				variant === "void"
					? styles.voidButton
					: variant === "outline"
					? styles.outlineButton
					: styles.defaultButton,
				style && style,
			]}
		>
			<Typo
				color={variant === "default" ? colors.white : colors.primaryDark}
				fontWeight={700}
			>
				{buttonText}
			</Typo>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	outlineButton: {
		backgroundColor: colors.white,
		height: Platform.OS === "ios" ? verticalScale(50) : verticalScale(60),
		paddingHorizontal: scale(30),
		borderRadius: radius._10,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1.5,
		borderColor: colors.primaryDark,
	},

	voidButton: {
		backgroundColor: colors.white,
		height: Platform.OS === "ios" ? verticalScale(50) : verticalScale(60),
		paddingHorizontal: scale(30),
		borderRadius: radius._10,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1.5,
		borderColor: colors.white,
	},
	defaultButton: {
		backgroundColor: colors.primaryDark,
		// paddingVertical: verticalScale(10),
		paddingHorizontal: scale(30),
		borderRadius: radius._10,
		height: Platform.OS === "ios" ? verticalScale(50) : verticalScale(60),
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1.5,
		borderColor: colors.primaryDark,
	},
});
