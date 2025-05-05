import { render, screen } from "@testing-library/react-native";
import React from "react";

import Header from "@/components/Header";
import { Text, View } from "react-native"; // Import basic RN components for mocking/icon

// Mocks

jest.mock("@/components/Typo", () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { Text } = require("react-native");
	return ({ children, style, ...props }: any) => (
		<Text style={style} {...props} testID="header-title">
			{children}
		</Text>
	);
});

// Test Suites
describe("<Header />", () => {
	const mockLeftIcon = (
		<View testID="mock-icon">
			<Text>Icon</Text>
		</View>
	);

	it("renders title correctly when provided", () => {
		const titleText = "My Header Title";
		render(<Header title={titleText} />);

		const titleElement = screen.getByText(titleText);
		expect(titleElement).toBeTruthy();
		// Check default style when no icon is present
		expect(titleElement.props.style).toEqual(
			expect.objectContaining({ width: "100%" })
		);
	});

	it("renders left icon correctly when provided", () => {
		render(<Header leftIcon={mockLeftIcon} />);

		// Is the mock icon is rendered
		expect(screen.getByTestId("mock-icon")).toBeTruthy();
		expect(screen.getByText("Icon")).toBeTruthy();
		expect(screen.queryByTestId("header-title")).toBeNull();
	});

	it("renders both title and left icon correctly", () => {
		const titleText = "Title With Icon";
		render(<Header title={titleText} leftIcon={mockLeftIcon} />);

		const titleElement = screen.getByText(titleText);
		expect(titleElement).toBeTruthy();

		expect(titleElement.props.style).toEqual(
			expect.objectContaining({ width: "82%" })
		);
		expect(screen.getByTestId("mock-icon")).toBeTruthy();
	});
});
