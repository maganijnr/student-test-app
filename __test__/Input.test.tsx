import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import Input from "@/components/Input";
import { colors } from "@/constants/theme";

jest.mock("@/components/Typo", () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { Text } = require("react-native");
	return ({ children, ...props }: any) => <Text {...props}>{children}</Text>;
});

// Mock phosphor-react-native icons
jest.mock("phosphor-react-native", () => ({
	Eye: (props: any) => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const { View } = require("react-native");
		return <View testID="eye-icon" {...props} />;
	},
	EyeSlash: (props: any) => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const { View } = require("react-native");
		return <View testID="eye-slash-icon" {...props} />;
	},
}));

// Mock scaling utility
jest.mock("@/utils/styling", () => ({
	verticalScale: (val: number) => val,
	scale: (val: number) => val,
}));

// Test Suites
describe("<Input />", () => {
	const mockOnChangeText = jest.fn();
	const defaultProps = {
		label: "Test Label",
		value: "",
		onHandleTextChange: mockOnChangeText,
		placeHolder: "Enter text here",
	};

	beforeEach(() => {
		mockOnChangeText.mockClear();
	});

	it("renders label and placeholder correctly", () => {
		render(<Input {...defaultProps} />);
		expect(screen.getByText("Test Label")).toBeTruthy();
		expect(screen.getByPlaceholderText("Enter text here")).toBeTruthy();
	});

	it("does not render label if not provided", () => {
		render(<Input {...defaultProps} label={undefined} />);
		expect(screen.queryByText("Test Label")).toBeNull();
	});

	it("calls onHandleTextChange when text changes", () => {
		render(<Input {...defaultProps} />);
		const textInput = screen.getByPlaceholderText("Enter text here");
		fireEvent.changeText(textInput, "new text");
		expect(mockOnChangeText).toHaveBeenCalledTimes(1);
		expect(mockOnChangeText).toHaveBeenCalledWith("new text");
	});

	it("renders error message when error prop is provided", () => {
		const errorText = "This field is required";
		render(<Input {...defaultProps} error={errorText} />);
		const errorElement = screen.getByText(errorText);
		expect(errorElement).toBeTruthy();
		expect(errorElement.props.color).toBe(colors.rose);
	});

	it("does not render error message when error prop is not provided", () => {
		render(<Input {...defaultProps} />);
		expect(screen.queryByText(/required/i)).toBeNull(); // Example check
	});

	it("renders as secure text entry when isSecured is true", () => {
		render(<Input {...defaultProps} isSecured={true} />);
		const textInput = screen.getByPlaceholderText("Enter text here");
		expect(textInput.props.secureTextEntry).toBe(true);
	});

	it("renders as normal text entry when isSecured is false or default", () => {
		render(<Input {...defaultProps} />);
		const textInput = screen.getByPlaceholderText("Enter text here");
		expect(textInput.props.secureTextEntry).toBe(false); // Default is false
	});

	it("does not render eye icon if isPassword is false", () => {
		render(<Input {...defaultProps} isSecured={true} />);
		expect(screen.queryByTestId("eye-icon")).toBeNull();
		expect(screen.queryByTestId("eye-slash-icon")).toBeNull();
	});

	it("renders EyeSlash icon initially when isPassword and isSecured are true", () => {
		render(<Input {...defaultProps} isPassword={true} isSecured={true} />);
		expect(screen.getByTestId("eye-slash-icon")).toBeTruthy();
		expect(screen.queryByTestId("eye-icon")).toBeNull();
		const textInput = screen.getByPlaceholderText("Enter text here");
		expect(textInput.props.secureTextEntry).toBe(true);
	});

	it("renders Eye icon initially when isPassword is true and isSecured is false", () => {
		render(<Input {...defaultProps} isPassword={true} isSecured={false} />);
		expect(screen.getByTestId("eye-icon")).toBeTruthy();
		expect(screen.queryByTestId("eye-slash-icon")).toBeNull();
		const textInput = screen.getByPlaceholderText("Enter text here");
		expect(textInput.props.secureTextEntry).toBe(false);
	});

	it("toggles visibility and icon when eye icon is pressed", () => {
		render(<Input {...defaultProps} isPassword={true} isSecured={true} />);
		const textInput = screen.getByPlaceholderText("Enter text here");
		const eyeButton = screen.getByTestId("eye-slash-icon");

		expect(textInput.props.secureTextEntry).toBe(true);
		expect(screen.getByTestId("eye-slash-icon")).toBeTruthy();
		expect(screen.queryByTestId("eye-icon")).toBeNull();

		// Press the icon
		fireEvent.press(eyeButton);

		//  Toggled state (should show Eye icon, secureTextEntry false)
		expect(textInput.props.secureTextEntry).toBe(false);
		expect(screen.queryByTestId("eye-slash-icon")).toBeNull();
		expect(screen.getByTestId("eye-icon")).toBeTruthy();

		// Click button icon again to toggle back
		fireEvent.press(screen.getByTestId("eye-icon"));

		// Track toggled state
		expect(textInput.props.secureTextEntry).toBe(true);
		expect(screen.getByTestId("eye-slash-icon")).toBeTruthy();
		expect(screen.queryByTestId("eye-icon")).toBeNull();
	});

	it("passes keyboardType and maxLength to TextInput", () => {
		render(<Input {...defaultProps} keyboardType="numeric" maxLength={10} />);
		const textInput = screen.getByPlaceholderText("Enter text here");
		expect(textInput.props.keyboardType).toBe("numeric");
		expect(textInput.props.maxLength).toBe(10);
	});
});
