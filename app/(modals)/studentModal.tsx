import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import CustomDropdown from "@/components/CustomDropdown";
import Header from "@/components/Header";
import Input from "@/components/Input";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";
import ModalWrapper from "@/components/ModalWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { getProfileImage } from "@/services/image.service";
import { deleteStudentApi, updateStudentApi } from "@/services/student.service";
import useAppStore from "@/store/store";
import { EnrollmentStatus, Student } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	Platform,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

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

const studentModal = () => {
	const { updateStudent, selectedStudent, setSelectedStudent, deleteStudent } =
		useAppStore();
	const [image, setImage] = useState<string | null>(null);
	const [imageUrl, setImageUrl] = useState<string>("");

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
		const updatedImageUrl = image ? getProfileImage(image) : imageUrl;

		if (!updatedImageUrl || typeof updatedImageUrl !== "string") {
			setError("avatar", { message: "Student Image is required" });
			return;
		}

		clearErrors();

		const data: Student = {
			id: selectedStudent?.id!,
			first_name,
			last_name,
			email,
			enrollment_status,
			avatar: updatedImageUrl,
		};

		const res = await updateStudentApi(data);

		if (res?.success && res?.data) {
			updateStudent(data);

			Toast.show({
				type: "success",
				text1: "Updated Successfully",
				text2: "Student data was updated successfully",
			});

			reset();
			router.back();
			// setSelectedStudent(null);
			return;
		}

		Toast.show({
			type: "error",
			text1: "Error",
			text2: "Failed to update student data",
		});
	};

	const handleDeleteStudent = async () => {
		if (!selectedStudent) {
			Toast.show({
				type: "error",
				text1: "Deleting Error",
				text2: "Selected a student to delete",
			});
			router.back();
			// setSelectedStudent(null);
			return;
		}

		const res = await deleteStudentApi(selectedStudent?.id);

		if (res?.success && res?.data) {
			deleteStudent(res?.data);

			Toast.show({
				type: "success",
				text1: "Deleted Successfully",
				text2: "Student data was deleted successfully",
			});

			reset();
			router.back();
			// setSelectedStudent(null);
			return;
		}

		Toast.show({
			type: "error",
			text1: "Error",
			text2: "Failed to delete student data",
		});
	};

	useEffect(() => {
		if (selectedStudent) {
			setValue("email", selectedStudent?.email ?? "");
			setValue(
				"enrollment_status",
				selectedStudent?.enrollment_status ?? ""
			);
			setValue("first_name", selectedStudent?.first_name ?? "");
			setValue("last_name", selectedStudent?.last_name ?? "");
			setImageUrl(selectedStudent?.avatar);
		}
	}, [selectedStudent]);
	return (
		<ModalWrapper>
			<View style={styles.container}>
				<Header
					title="Update Student Info"
					leftIcon={<BackButton />}
					style={{ marginBottom: spacingY._10, paddingHorizontal: 0 }}
				/>

				<KeyboardAvoidingViewContainer>
					<ScrollView contentContainerStyle={styles.form}>
						<View style={styles.avatarContainer}>
							<Image
								source={
									image
										? getProfileImage(image)
										: imageUrl
										? imageUrl
										: getProfileImage(image)
								}
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
									errors?.last_name?.message &&
									errors?.last_name?.message
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
				</KeyboardAvoidingViewContainer>
			</View>
			<View style={styles.footer}>
				<TouchableOpacity
					onPress={handleDeleteStudent}
					style={styles.deleteButton}
				>
					<Icons.Trash color={colors.white} size={25} />
				</TouchableOpacity>
				<Button
					buttonText="Update student"
					handleOnPress={handleSubmit(onSubmit)}
					variant="default"
					style={{ flex: 1 }}
				/>
			</View>
		</ModalWrapper>
	);
};

export default studentModal;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: spacingX._20,
	},
	footer: {
		gap: scale(12),
		paddingTop: spacingY._15,
		marginBottom: spacingY._5,
		paddingHorizontal: spacingX._20,
		flexDirection: "row",
		alignItems: "center",
	},
	form: {
		gap: spacingY._30,
		marginTop: spacingY._15,
	},
	avatarContainer: {
		position: "relative",
		alignSelf: "center",
	},
	avatar: {
		alignSelf: "center",
		backgroundColor: colors.neutral300,
		height: verticalScale(100),
		width: verticalScale(100),
		borderRadius: 200,
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
	inputContainer: {
		gap: spacingY._10,
	},
	formContainer: {
		marginTop: verticalScale(20),
		gap: verticalScale(20),
	},
	deleteButton: {
		width: Platform.OS === "ios" ? scale(45) : scale(55),
		height: Platform.OS === "ios" ? verticalScale(50) : verticalScale(60),
		backgroundColor: colors.rose,
		borderRadius: radius?._12,
		alignItems: "center",
		justifyContent: "center",
	},
});
