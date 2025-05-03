import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

interface FormProps {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

const RegisterScreen = () => {
	const {
		register,
		formState: { errors },

		setValue,
		watch,
	} = useForm<FormProps>();

	console.log("🚀 ~ RegisterScreen ~ errors:", errors);

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Typo
					fontWeight={700}
					style={{
						textAlign: "center",
					}}
					size={28}
					color={colors.primaryDark}
				>
					ELESSON
				</Typo>

				<View style={styles.formContainer}>
					<Input
						label="First name"
						onHandleTextChange={(val) => {
							setValue("firstname", val);
						}}
						value={watch("firstname")}
						placeHolder="Enter your first name"
						keyboardType="default"
						error={errors?.firstname && errors?.firstname}
					/>

					<Input
						label="Last name"
						onHandleTextChange={(val) => {
							setValue("lastname", val);
						}}
						value={watch("lastname")}
						placeHolder="Enter your last name"
						keyboardType="default"
						error={errors?.lastname && errors?.lastname}
					/>

					<Input
						label="Email"
						onHandleTextChange={(val) => {
							setValue("email", val);
						}}
						value={watch("email")}
						placeHolder="Enter your email"
						keyboardType="email-address"
						error={errors?.email && errors?.email}
					/>

					<Input
						label="Password"
						onHandleTextChange={(val) => {
							setValue("password", val);
						}}
						value={watch("password")}
						placeHolder="Enter your password"
						keyboardType="email-address"
						error={errors?.password && errors?.password}
						isSecured={true}
						isPassword={true}
					/>

					<Button
						buttonText={"Create account"}
						handleOnPress={() => {}}
						variant="default"
					/>
				</View>
			</View>
		</ScreenWrapper>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacingX._20,
		flex: 1,

		paddingTop: verticalScale(20),
	},

	formContainer: {
		marginTop: verticalScale(20),
		gap: verticalScale(20),
	},
});
