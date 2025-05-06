import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { studentsData } from "@/data/student-data";
import useAppStore from "@/store/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export default function Page() {
	const { currentUser, isNewUser, allStudents, setAllStudents } =
		useAppStore();

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
		const timer = setTimeout(() => {
			if (currentUser) {
				router.replace("/(tabs)");
				return;
			} else {
				if (allStudents.length === 0) {
					setAllStudents(studentsData);
				}
				router.replace("/(auth)/(onboarding)");
			}
		}, 2000);

		return () => clearTimeout(timer);
	}, [currentUser, isNewUser, allStudents.length]);

	return (
		<View style={styles.container}>
			<StatusBar barStyle={"dark-content"} />
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
