import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import InfoItem from "@/components/sections/settings/InfoItem";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { getProfileImage } from "@/services/image.service";
import useAppStore from "@/store/store";
import { scale, verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as Icons from "phosphor-react-native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const SettingScreen = () => {
	const { currentUser, logout } = useAppStore();
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
							source={getProfileImage(currentUser?.avatar)}
							style={styles.avatar}
							contentFit="cover"
							transition={100}
						/>
					</View>

					<View style={styles.formContainer}>
						<InfoItem
							value={currentUser?.fullname?.split(" ")[0] ?? ""}
							label="First Name"
						/>

						<InfoItem
							value={currentUser?.fullname?.split(" ")[1] ?? ""}
							label="Last Name"
						/>

						<InfoItem value={currentUser?.email ?? ""} label="Email" />
					</View>
				</ScrollView>
				<View style={styles.footer}>
					<Button
						buttonText="Update Profile"
						handleOnPress={() => {
							router.push("/(modals)/profileModal");
						}}
						variant="default"
						style={{ flex: 1 }}
					/>

					<TouchableOpacity
						onPress={() => {
							logout();
							router.replace("/(auth)/register");
						}}
						style={styles.deleteButton}
					>
						<Icons.SignOut color={colors.white} size={25} />
					</TouchableOpacity>
				</View>
			</View>
		</ScreenWrapper>
	);
};

export default SettingScreen;

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
	formContainer: {
		marginTop: verticalScale(20),
		gap: verticalScale(20),
	},
	footer: {
		flexDirection: "row",
		gap: scale(10),
	},
	deleteButton: {
		width: scale(50),
		height: verticalScale(50),
		backgroundColor: colors.rose,
		borderRadius: radius?._12,
		alignItems: "center",
		justifyContent: "center",
	},
});
