import { colors, radius } from "@/constants/theme";
import { OnboardingItemProps } from "@/types";
import {
	customPaddingTop,
	scale,
	SCREEN_WIDTH,
	verticalScale,
} from "@/utils/styling";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import Button from "./Button";
import Typo from "./Typo";

const OnboardingItem: FC<{
	item: OnboardingItemProps;
	index: number;
	onScrollToNext: () => void;
}> = ({ item, index, onScrollToNext }) => {
	const opacity = useSharedValue(0);
	const translateY = useSharedValue(-50);

	useEffect(() => {
		opacity.value = withTiming(1, {
			duration: 600,
			easing: Easing.ease,
		});
		translateY.value = withTiming(0, {
			duration: 600,
			easing: Easing.ease,
		});
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			transform: [{ translateY: translateY.value }],
		};
	});

	return (
		<LinearGradient
			//@ts-ignore
			colors={[...item.bgColors]}
			style={styles.bgContainer}
		>
			<View style={styles.container}>
				<Animated.View style={[styles.imageContainer, animatedStyle]}>
					<Image
						source={item.image}
						contentFit="contain"
						transition={1000}
						style={styles.image}
					/>
				</Animated.View>
				<View style={styles.infoContainer}>
					<Typo
						color={colors.black}
						style={{ textAlign: "center" }}
						size={25}
						fontWeight={"800"}
					>
						Education is the best learn ever
					</Typo>
					<Typo
						color={colors.black}
						style={{ textAlign: "center" }}
						size={12}
					>
						It is a long established fact that a reader will be distracted
						by the readable content of a page when looking at its layout.
					</Typo>

					<View style={styles.buttonContainer}>
						{index !== 2 && (
							<Button
								buttonText="Skip"
								handleOnPress={() => {
									router.replace("/(auth)/register");
								}}
								variant="void"
							/>
						)}

						<Button
							buttonText="Next"
							handleOnPress={onScrollToNext}
							variant="default"
							style={{
								width: index === 2 ? "100%" : "auto",
							}}
						/>
					</View>
				</View>
			</View>
		</LinearGradient>
	);
};

export default OnboardingItem;

const styles = StyleSheet.create({
	bgContainer: {
		width: SCREEN_WIDTH,
		flex: 1,
	},

	container: {
		position: "relative",
		flex: 1,
		backgroundColor: "transparent",
		paddingTop: customPaddingTop,
	},

	imageContainer: {
		height: verticalScale(450),
		width: "100%",
		marginHorizontal: "auto",
		alignItems: "center",
		justifyContent: "center",
	},

	infoContainer: {
		backgroundColor: colors.white,
		width: "95%",
		position: "absolute",
		bottom: verticalScale(40),
		left: "50%",
		transform: [{ translateX: "-50%" }],
		height: verticalScale(250),
		borderRadius: radius._20,
		padding: verticalScale(20),
		gap: verticalScale(10),
	},

	image: {
		width: verticalScale(300),
		height: verticalScale(300),
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: verticalScale(40),
	},

	outlineButton: {
		backgroundColor: colors.white,
		height: verticalScale(50),
		paddingHorizontal: scale(30),
		borderRadius: radius._10,
		alignItems: "center",
		justifyContent: "center",
	},
	fillButton: {
		backgroundColor: colors.primaryDark,
		// paddingVertical: verticalScale(10),
		paddingHorizontal: scale(30),
		borderRadius: radius._10,
		height: verticalScale(50),
		alignItems: "center",
		justifyContent: "center",
	},
});
