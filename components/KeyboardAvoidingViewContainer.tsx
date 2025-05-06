import React, { useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	ViewStyle,
} from "react-native";

import { colors, KEYBOARD_VERTICAL_OFFSET, spacingX } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { Keyboard } from "react-native";

const KeyboardAvoidingViewContainer = ({
	children,
	customStyle,
}: {
	children: React.ReactNode;
	customStyle?: ViewStyle;
}) => {
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
			() => {
				setKeyboardVisible(true);
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
			() => {
				setKeyboardVisible(false);
			}
		);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	return (
		<KeyboardAvoidingView
			style={[styles.container, { backgroundColor: colors.white }]}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
		>
			<ScrollView
				style={{ flexGrow: 1 }}
				contentContainerStyle={[
					{
						flexGrow: 1,
						paddingBottom: isKeyboardVisible
							? Platform.OS === "ios"
								? spacingX._30
								: spacingX._20
							: 0,
					},
					customStyle && customStyle,
					!customStyle && {
						paddingTop: verticalScale(20),
						// paddingHorizontal: spacingX._20,
						justifyContent: "space-between",
						gap: spacingX._20,
					},
				]}
				showsVerticalScrollIndicator={false}
				bounces={false}
			>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default KeyboardAvoidingViewContainer;
