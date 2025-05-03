import { Stack } from "expo-router";

const StackLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		/>
	);
};

export default function RootLayout() {
	return <StackLayout />;
}
