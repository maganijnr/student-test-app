import { colors } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

const EmptyState: FC<{ message: string }> = ({ message }) => {
	return (
		<View style={styles.container}>
			<Icons.Empty size={verticalScale(100)} color={colors.primaryDark} />
			<Typo size={20} fontWeight={700} color={colors.black}>
				{message}
			</Typo>
		</View>
	);
};

export default EmptyState;

const styles = StyleSheet.create({
	container: {
		flex: 1,

		height: verticalScale(350),
		alignItems: "center",
		justifyContent: "center",
	},
});
