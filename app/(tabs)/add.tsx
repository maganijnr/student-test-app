import Button from "@/components/Button";
import CustomDropdown from "@/components/CustomDropdown";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { getProfileImage } from "@/services/image.service";
import useAppStore from "@/store/store";
import { EnrollmentStatus, Student } from "@/types";
import { generateRandomId } from "@/utils/formatter";
import { verticalScale } from "@/utils/styling";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

const enrollmentOptions: {
	label: EnrollmentStatus;
	value: EnrollmentStatus;
}[] = [
	{
		label: "Graduated",
		value: "Graduated",
	},
	{
		label: "Alumni",
		value: "Alumni",
	},
	{
		label: "Enrolled",
		value: "Enrolled",
	},
];

const schema = z.object({
	first_name: z.string().min(1, { message: "First name is required" }),
	last_name: z.string().min(1, { message: "Last name is required" }),
	email: z.string().email({ message: "Invalid email" }),
	enrollment_status: z
		.string()
		.min(1, { message: "Enrollment status is required" }),
	avatar: z.string(),
});

type FormSchemaProps = z.infer<typeof schema>;

const AddStudentScreen = () => {
	const { addNewStudent } = useAppStore();
	const [image, setImage] = useState<string | null>(null);

	const {
		formState: { errors },
		setValue,
		watch,
		handleSubmit,
		setError,
		reset,
		clearErrors,
	} = useForm<FormSchemaProps>({
		resolver: zodResolver(schema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			enrollment_status: "",
			avatar: "",
		},
	});

	const onPickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images", "videos"],
			// allowsEditing: true,
			aspect: [4, 3],
			quality: 0.5,
		});

		if (!result.canceled) {
			setImage(result?.assets[0]?.uri);
		}
	};

	const onSubmit = async (values: FormSchemaProps) => {
		const { first_name, last_name, email, enrollment_status } = values;
		const imageUrl = getProfileImage(image);

		if (!imageUrl || typeof imageUrl !== "string") {
			console.log("failed here");
			setError("avatar", { message: "Student Image is required" });
			return;
		}

		clearErrors();

		const data: Student = {
			id: generateRandomId(),
			first_name,
			last_name,
			email,
			enrollment_status,
			avatar: imageUrl,
		};

		addNewStudent(data);
		Toast.show({
			type: "success",
			text1: "Created Successfully",
			text2: "Student was created successfully",
		});

		reset();
		router.push("/(tabs)");
	};

	return (
		<ScreenWrapper>
			<View
				style={{
					flex: 1,
					paddingBottom: spacingY._10,
					paddingHorizontal: spacingX._20,
				}}
			>
				<ScrollView style={styles.container} contentContainerStyle={{}}>
					<View style={styles.avatarContainer}>
						<Image
							source={getProfileImage(image)}
							style={styles.avatar}
							contentFit="cover"
							transition={100}
						/>

						<TouchableOpacity
							style={styles.editIcon}
							onPress={onPickImage}
						>
							<Icons.Pencil
								size={verticalScale(20)}
								color={colors.white}
							/>
						</TouchableOpacity>
					</View>
					{errors?.avatar?.message && (
						<Typo
							size={10}
							color={colors.rose}
							style={{ textAlign: "center", marginTop: spacingY._5 }}
						>
							{errors?.avatar?.message}
						</Typo>
					)}

					<View style={styles.formContainer}>
						<Input
							label="First name"
							onHandleTextChange={(val) => {
								setValue("first_name", val);
							}}
							value={watch("first_name")}
							placeHolder="Enter student first name"
							placeholderTextColor={colors.neutral400}
							keyboardType="default"
							error={
								errors?.first_name?.message &&
								errors?.first_name?.message
							}
						/>

						<Input
							label="Last name"
							onHandleTextChange={(val) => {
								setValue("last_name", val);
							}}
							value={watch("last_name")}
							placeHolder="Enter student first name"
							placeholderTextColor={colors.neutral400}
							keyboardType="default"
							error={
								errors?.last_name?.message && errors?.last_name?.message
							}
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
							placeholderTextColor={colors.neutral400}
						/>

						<CustomDropdown
							options={enrollmentOptions}
							handleOnSelect={(val) => {
								setValue("enrollment_status", val);
							}}
							value={watch("enrollment_status")}
							placeHolder="Select enrollment status"
							label="Enrollment status"
							error={
								errors?.enrollment_status?.message &&
								errors?.enrollment_status?.message
							}
						/>
					</View>
				</ScrollView>

				<Button
					buttonText="Add Student"
					handleOnPress={handleSubmit(onSubmit)}
					variant="default"
				/>
			</View>
		</ScreenWrapper>
	);
};

export default AddStudentScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: spacingX._10,
	},

	avatarContainer: {
		position: "relative",
		alignSelf: "center",

		borderRadius: 200,
	},
	avatar: {
		alignSelf: "center",
		backgroundColor: colors.neutral300,
		height: verticalScale(100),
		width: verticalScale(100),
		borderRadius: 200,
		overflow: "hidden",
	},
	editIcon: {
		position: "absolute",
		bottom: spacingY._5,
		right: spacingY._7,
		borderRadius: 50,
		backgroundColor: colors.primaryDark,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 0 },
		padding: spacingY._7,
		elevation: 4,
		shadowOpacity: 0.25,
		shadowRadius: 10,
	},
	formContainer: {
		marginTop: verticalScale(20),
		gap: verticalScale(20),
	},
});
