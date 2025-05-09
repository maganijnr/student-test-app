import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX } from "@/constants/theme";
import useAppStore from "@/store/store";
import { verticalScale } from "@/utils/styling";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

const schema = z.object({
	fullname: z.string().min(1, { message: "Full name is required" }),
	email: z.string().email({ message: "Invalid email" }),
});

type FormSchemaProps = z.infer<typeof schema>;

const RegisterScreen = () => {
	const { setCurrentUser } = useAppStore();
	const {
		formState: { errors },
		setValue,
		watch,
		handleSubmit,
	} = useForm<FormSchemaProps>({
		resolver: zodResolver(schema),
		defaultValues: {
			fullname: "",
			email: "",
		},
	});

	const onSubmit = (data: FormSchemaProps) => {
		if (data.fullname && data.email) {
			setCurrentUser(data);

			router.replace("/(tabs)");
		}
	};

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

				<Typo
					fontWeight={700}
					style={{
						textAlign: "center",
						marginTop: verticalScale(10),
					}}
					size={20}
					color={colors.primaryDark}
				>
					Create an account
				</Typo>

				<View style={styles.formContainer}>
					<Input
						label="Full name"
						onHandleTextChange={(val) => {
							setValue("fullname", val);
						}}
						value={watch("fullname")}
						placeHolder="Enter your first name"
						keyboardType="default"
						error={errors?.fullname?.message && errors?.fullname?.message}
					/>

					<Input
						label="Email"
						onHandleTextChange={(val) => {
							setValue("email", val);
						}}
						value={watch("email")}
						placeHolder="Enter your email"
						keyboardType="email-address"
						error={errors?.email?.message && errors?.email?.message}
					/>

					<Button
						buttonText={"Create account"}
						handleOnPress={handleSubmit(onSubmit)}
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
