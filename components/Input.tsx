import { colors, radius, spacingX } from "@/constants/theme";
import { InputProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import { Eye, EyeSlash } from "phosphor-react-native";
import React, { FC, useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import Typo from "./Typo";

const Input: FC<InputProps> = ({
	label,
	value,
	onHandleTextChange,
	isSecured = false,
	onBlur,
	onFocus,
	placeHolder,
	placeholderTextColor,
	maxLength,
	keyboardType,
	error,
	isPassword = false,
	style,
}) => {
	const [isVisible, setIsVisible] = useState(isSecured);
	return (
		<View style={[styles.inputContainer, style && style]}>
			{label && (
				<Typo color={colors.primaryDark} size={14} fontWeight={600}>
					{label}
				</Typo>
			)}
			<TextInput
				value={value}
				onChangeText={onHandleTextChange}
				style={styles.inputSyle}
				secureTextEntry={isVisible}
				placeholder={placeHolder}
				placeholderTextColor={placeholderTextColor}
				keyboardType={keyboardType}
				maxLength={maxLength}
			/>
			{error && (
				<Typo size={10} color={colors.rose}>
					{error}
				</Typo>
			)}
			{isPassword && (
				<Pressable
					style={styles.eyeIcon}
					onPress={() => {
						setIsVisible(!isVisible);
					}}
				>
					{isVisible ? (
						<EyeSlash color="#0369a1" />
					) : (
						<Eye color="#0369a1" />
					)}
				</Pressable>
			)}
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		gap: verticalScale(8),
		position: "relative",
	},
	inputSyle: {
		backgroundColor: colors.white,
		height: Platform.OS === "ios" ? verticalScale(50) : verticalScale(60),
		borderWidth: 1.5,
		borderColor: colors.primaryDark,
		borderRadius: radius._10,
		paddingLeft: spacingX._10,
	},

	eyeIcon: {
		position: "absolute",
		right: "3%",
		top: "55%",
	},
});
