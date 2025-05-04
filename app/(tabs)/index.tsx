import ScreenWrapper from "@/components/ScreenWrapper";
import StudentList from "@/components/sections/home/StudentList";
import Topbar from "@/components/sections/home/Topbar";
import WidgetsCards from "@/components/sections/home/WidgetsCards";
import { spacingX, spacingY } from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

const HomeScreen = () => {
	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Topbar />
				<WidgetsCards />
				<StudentList />
			</View>
		</ScreenWrapper>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacingX._20,
		paddingTop: spacingY._10,
		flex: 1,
	},
});
