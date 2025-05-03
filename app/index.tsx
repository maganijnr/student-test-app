import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export default function Page() {
	const [user, setUser] = useState(null);
	const isNewUser = true;
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

	useEffect(() => {
		setTimeout(() => {
			if (!isNewUser) {
				router.replace("/(auth)/login");
			} else {
				if (!user) {
					router.replace("/(auth)/(onboarding)");
				}
			}
		}, 2000);
	}, [user, isNewUser]);

	return (
		<View style={styles.container}>
			<StatusBar barStyle={"light-content"} />
			<Animated.View style={[animatedStyle]}>
				<Typo fontWeight={700} size={40}>
					ELesson
				</Typo>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primaryDark,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
