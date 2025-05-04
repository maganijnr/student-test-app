import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Typo from "./Typo";

interface DropdownProps {
	options: { value: string; label: string }[];
	value: string;
	handleOnSelect: (val: string) => void;
	hasSearch?: boolean;
	placeHolder?: string;
	label?: string;
	error?: string;
}

const CustomDropdown: FC<DropdownProps> = ({
	options,
	value,
	handleOnSelect,
	hasSearch = false,
	placeHolder,
	label,
	error,
}) => {
	const [isFocus, setIsFocus] = useState(false);
	return (
		<View style={styles.inputContainer}>
			{label && (
				<Typo color={colors.primaryDark} size={14} fontWeight={600}>
					{label}
				</Typo>
			)}
			<Dropdown
				style={[
					styles.dropdown,
					isFocus && { borderColor: colors?.primaryDark },
				]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				iconStyle={styles.iconStyle}
				data={options}
				search={hasSearch}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={placeHolder ? placeHolder : "Select item"}
				searchPlaceholder="Search..."
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					handleOnSelect(item.value);
					setIsFocus(false);
				}}
				showsVerticalScrollIndicator={false}
				itemTextStyle={styles.itemTextStyle}
				itemContainerStyle={styles.itemContainerStyle}
				containerStyle={styles.containerStyle}
			/>
			{error && (
				<Typo size={10} color={colors.rose}>
					{error}
				</Typo>
			)}
		</View>
	);
};

export default CustomDropdown;

const styles = StyleSheet.create({
	inputContainer: {
		gap: verticalScale(8),
		position: "relative",
	},
	dropdown: {
		height: verticalScale(50),
		borderWidth: 1.5,
		borderColor: colors.primaryDark,
		borderRadius: radius._10,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: "absolute",
		backgroundColor: "white",
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: verticalScale(13),
		color: colors.neutral400,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	containerStyle: {
		backgroundColor: colors.neutral100,
		borderRadius: radius._10,
		borderWidth: 1.5,
		borderColor: colors.primaryDark,
	},
	itemTextStyle: {},
	itemContainerStyle: {
		borderRadius: radius._10,
		// backgroundColor: "red",
	},
});
