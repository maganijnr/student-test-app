import CustomTabs from "@/components/CustomTabs";
import { Tabs } from "expo-router";

const TabLayout = () => {
	return (
		<Tabs tabBar={CustomTabs} screenOptions={{ headerShown: false }}>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="add" />
			<Tabs.Screen name="setting" />
		</Tabs>
	);
};

export default TabLayout;
