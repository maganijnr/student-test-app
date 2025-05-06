import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { Dimensions, Platform, StatusBar, View } from "react-native";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
	//Create padding top dynamically
	let paddingTop = Platform.OS == "ios" ? height * 0.06 : verticalScale(10);
	return (
		<View
			style={[
				{
					paddingTop: paddingTop,
					flex: 1,
					backgroundColor: colors.white,
				},
				style,
			]}
		>
			<StatusBar barStyle={"dark-content"} />
			{children}
		</View>
	);
};

export default ScreenWrapper;
