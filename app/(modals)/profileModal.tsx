import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { getProfileImage } from "@/services/image.service";
import { updateProfileApi } from "@/services/profile.service";
import useAppStore from "@/store/store";
import { CurrentUserProps } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

const schema = z.object({
	first_name: z.string().min(1, { message: "First name is required" }),
	last_name: z.string().min(1, { message: "Last name is required" }),
	email: z.string().email({ message: "Invalid email" }),
	avatar: z.string(),
});

type FormSchemaProps = z.infer<typeof schema>;

const profileModal = () => {
	const { currentUser, updateProfile } = useAppStore();
	const [image, setImage] = useState<string | null>(null);
	const [imageUrl, setImageUrl] = useState<string>("");

	const {
		formState: { errors },
		setValue,
		watch,
		handleSubmit,
		reset,
	} = useForm<FormSchemaProps>({
		resolver: zodResolver(schema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
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
		const updatedImageUrl = image ? getProfileImage(image) : imageUrl;
		const data: CurrentUserProps = {
			fullname: values?.first_name + " " + values?.last_name,
			email: values?.email,
			avatar: updatedImageUrl,
		};

		const res = await updateProfileApi(data);

		if (res?.success && res?.data) {
			updateProfile(res?.data);

			Toast.show({
				type: "success",
				text1: "Updated Successfully",
				text2: "Profile was updated successfully",
			});

			reset();
			router.back();
			return;
		}

		Toast.show({
			type: "error",
			text1: "Error",
			text2: "Failed to update profile",
		});
	};

	useEffect(() => {
		if (currentUser) {
			setValue("email", currentUser?.email ?? "");

			setValue("first_name", currentUser?.fullname?.split(" ")[0] ?? "");
			setValue("last_name", currentUser?.fullname?.split(" ")[1] ?? "");
			setImageUrl(currentUser?.avatar ?? "");
		}
	}, [currentUser]);

	return (
		<ModalWrapper>
			<View style={styles.container}>
				<Header
					title="Update Profile"
					leftIcon={<BackButton />}
					style={{ marginBottom: spacingY._10, paddingHorizontal: 0 }}
				/>

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
					</View>
				</ScrollView>
				<Button
					buttonText="Update profile"
					handleOnPress={handleSubmit(onSubmit)}
					variant="default"
				/>
			</View>
		</ModalWrapper>
	);
};

export default profileModal;

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
});
