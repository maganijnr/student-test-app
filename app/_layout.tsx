import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

const StackLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="(modals)/studentModal"
				options={{
					presentation: "modal",
				}}
			/>
			<Stack.Screen
				name="(modals)/profileModal"
				options={{
					presentation: "modal",
				}}
			/>
		</Stack>
	);
};

export default function RootLayout() {
	return (
		<>
			<StackLayout />
			<Toast />
		</>
	);
}
