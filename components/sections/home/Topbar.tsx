import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { getProfileImage } from "@/services/image.service";
import useAppStore from "@/store/store";
import { scale } from "@/utils/styling";
import { Image } from "expo-image";
import * as Icons from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Topbar = () => {
	const { currentUser } = useAppStore();
	return (
		<View style={styles.container}>
			<View style={styles.leftViewWrapper}>
				<View style={styles.imageContainer}>
					<Image
						source={
							currentUser?.avatar
								? currentUser?.avatar
								: getProfileImage("")
						}
						contentFit="cover"
						transition={1000}
						style={styles.image}
					/>
				</View>
				<View>
					<Typo color={colors.black} fontWeight={300} size={12}>
						Hello
					</Typo>
					<Typo color={colors.primaryDark} fontWeight={600} size={14}>
						{currentUser?.fullname}
					</Typo>
				</View>
			</View>

			<View style={styles.rightViewWrapper}>
				<View style={styles.notificationWrapper}>
					<TouchableOpacity>
						<Icons.Bell
							weight="fill"
							size={25}
							color={colors.primaryDark}
						/>
					</TouchableOpacity>
					<View style={styles.notificationIndicator} />
				</View>
			</View>
		</View>
	);
};

export default Topbar;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	leftViewWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	rightViewWrapper: {},
	imageContainer: {
		width: scale(40),
		height: scale(40),
		borderRadius: "100%",
		overflow: "hidden",
		borderWidth: 1,
		borderColor: colors.primaryDark,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	notificationWrapper: {
		position: "relative",
	},
	notificationIndicator: {
		position: "absolute",
		top: 0,
		right: 0,
		width: 10,
		height: 10,
		borderRadius: 10,
		backgroundColor: colors.rose,
	},
});
