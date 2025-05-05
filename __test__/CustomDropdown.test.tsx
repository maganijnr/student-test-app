import CustomDropdown from "@/components/CustomDropdown";
import { colors } from "@/constants/theme";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

jest.mock("@/components/Typo", () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { Text } = require("react-native");
	return ({ children, style, ...props }: any) => (
		<Text style={style} {...props} testID="header-title">
			{children}
		</Text>
	);
});
// Mock react-native-element-dropdown

jest.mock("react-native-element-dropdown", () => ({
	Dropdown: ({
		data,
		value,
		onChange,
		placeholder,
		labelField,
		valueField,
		placeholderStyle,
		selectedTextStyle,
		itemTextStyle,
		testID = "dropdown-mock",
		...props
	}: any) => {
		const { Pressable, Text } = require("react-native");
		const selectedItem = data.find((item: any) => item[valueField] === value);
		const displayValue = selectedItem
			? selectedItem[labelField]
			: placeholder;

		const handlePress = () => {
			if (data && data.length > 0) {
				onChange(data[0]);
			}
		};

		return (
			<Pressable onPress={handlePress} testID={testID} {...props}>
				<Text style={value ? selectedTextStyle : placeholderStyle}>
					{displayValue}
				</Text>
			</Pressable>
		);
	},
}));

jest.mock("@/utils/styling", () => ({
	verticalScale: (val: number) => val,
	scale: (val: number) => val,
}));

const mockOptions = [
	{ label: "Option 1", value: "1" },
	{ label: "Option 2", value: "2" },
	{ label: "Option 3", value: "3" },
];

describe("<CustomDropdown />", () => {
	const mockHandleOnSelect = jest.fn();

	const defaultProps = {
		options: mockOptions,
		value: "",
		handleOnSelect: mockHandleOnSelect,
		placeHolder: "Select an item",
		label: "Test Dropdown",
	};

	beforeEach(() => {
		mockHandleOnSelect.mockClear();
	});

	it("renders the label correctly", () => {
		render(<CustomDropdown {...defaultProps} />);
		expect(screen.getByText("Test Dropdown")).toBeTruthy();
	});

	it("renders the placeholder when no value is selected", () => {
		render(<CustomDropdown {...defaultProps} />);
		expect(screen.getByText("Select an item")).toBeTruthy();
	});

	it("renders the selected value's label when a value is provided", () => {
		render(<CustomDropdown {...defaultProps} value="2" />);

		expect(screen.getByText("Option 2")).toBeTruthy();
		expect(screen.queryByText("Select an item")).toBeNull();
	});

	it("calls handleOnSelect when an item is selected", () => {
		render(<CustomDropdown {...defaultProps} />);
		const dropdownMock = screen.getByTestId("dropdown-mock");

		fireEvent.press(dropdownMock);

		expect(mockHandleOnSelect).toHaveBeenCalledTimes(1);
		expect(mockHandleOnSelect).toHaveBeenCalledWith("1");
	});

	it("renders error message when error prop is provided", () => {
		const errorText = "This field is required";
		render(<CustomDropdown {...defaultProps} error={errorText} />);
		const errorElement = screen.getByText(errorText);
		expect(errorElement).toBeTruthy();

		expect(errorElement.props.color).toBe(colors.rose);
	});

	it("does not render error message when error prop is not provided", () => {
		render(<CustomDropdown {...defaultProps} />);
		expect(screen.queryByText(/required/i)).toBeNull();
	});
});
