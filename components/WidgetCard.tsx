import { radius, spacingX } from "@/constants/theme";
import { numberWithCommas } from "@/utils/formatter";
import { scale, verticalScale } from "@/utils/styling";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

const WidgetCard: FC<{
	item: { label: string; value: number };
}> = ({ item }) => {
	return (
		<LinearGradient
			colors={["#0369a1", "#0ea5e9"]}
			style={styles.bgContainer}
			start={{ x: 0, y: 0.5 }}
			end={{ x: 1, y: 0.5 }}
		>
			<View style={styles.container}>
				<Typo size={14} fontWeight={700}>
					{item.label}
				</Typo>
				<Typo size={28} fontWeight={800}>
					{numberWithCommas(item.value)}
				</Typo>
			</View>
		</LinearGradient>
	);
};

export default WidgetCard;

const styles = StyleSheet.create({
	bgContainer: {
		width: scale(260),
		height: verticalScale(120),
		borderRadius: radius._15,
	},
	container: {
		width: "100%",
		height: "100%",
		overflow: "hidden",
		paddingHorizontal: spacingX._10,
		paddingVertical: spacingX._20,
		gap: 10,
	},
});
