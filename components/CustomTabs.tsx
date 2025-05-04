import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Icons from "phosphor-react-native";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

const CustomTabs = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	const tabbarIcons: any = {
		index: (isFocused: boolean) => (
			<Icons.House
				size={verticalScale(30)}
				color={isFocused ? colors.primaryDark : colors.primaryLight}
				weight={isFocused ? "fill" : "regular"}
			/>
		),
		add: (isFocused: boolean) => (
			<Icons.Student
				size={verticalScale(30)}
				color={isFocused ? colors.primaryDark : colors.primaryLight}
				weight={isFocused ? "fill" : "regular"}
			/>
		),
		setting: (isFocused: boolean) => (
			<Icons.Gear
				size={verticalScale(30)}
				color={isFocused ? colors.primaryDark : colors.primaryLight}
				weight={isFocused ? "fill" : "regular"}
			/>
		),
	};
	return (
		<View style={styles.tabBar}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label: any =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						key={route.name}
						// href={buildHref(route.name, route.params)}
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarButtonTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={styles.tabbarItem}
					>
						{tabbarIcons[route.name] &&
							tabbarIcons[route.name](isFocused)}
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default CustomTabs;

const styles = StyleSheet.create({
	tabBar: {
		flexDirection: "row",
		width: "100%",
		height: Platform.OS === "ios" ? verticalScale(73) : verticalScale(55),
		backgroundColor: colors.white,
		alignItems: "center",
		borderTopColor: colors.primaryDark,
		borderTopWidth: 1,
	},
	tabbarItem: {
		flex: 1,
		marginBottom: Platform.OS === "ios" ? spacingY._10 : spacingY._5,
		justifyContent: "center",
		alignItems: "center",
	},
});
