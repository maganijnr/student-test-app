import { Tabs } from "expo-router";

const TabLayout = () => {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="add-student" />
			<Tabs.Screen name="settings" />
		</Tabs>
	);
};

export default TabLayout;
