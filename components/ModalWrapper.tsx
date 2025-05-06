import { colors, spacingY } from "@/constants/theme";
import { ModalWrapperProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

const ModalWrapper = ({
	style,
	children,
	bg = colors.white,
}: ModalWrapperProps) => {
	return (
		<View style={[styles.container, { backgroundColor: bg }, style && style]}>
			{children}
		</View>
	);
};

export default ModalWrapper;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === "ios" ? spacingY._20 : verticalScale(20),
		paddingBottom:
			Platform.OS === "ios" ? verticalScale(25) : verticalScale(15),
	},
});
