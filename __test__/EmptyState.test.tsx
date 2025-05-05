import EmptyState from "@/components/EmptyState";
import { colors } from "@/constants/theme";
import { render, screen } from "@testing-library/react-native";
import React from "react";

//Mocks
jest.mock("@/components/Typo", () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { Text } = require("react-native");
	return ({ children, ...props }: any) => <Text {...props}>{children}</Text>;
});

jest.mock("phosphor-react-native", () => ({
	Empty: (props: any) => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const { View } = require("react-native");
		return <View testID="empty-icon" {...props} />;
	},
}));

jest.mock("@/utils/styling", () => ({
	verticalScale: (val: number) => val,
	scale: (val: number) => val,
}));

//Test suite
describe("<EmptyState />", () => {
	it("renders the provided message correctly", () => {
		const testMessage = "No students found.";
		render(<EmptyState message={testMessage} />);

		expect(screen.getByText(testMessage)).toBeTruthy();

		expect(screen.getByTestId("empty-icon")).toBeTruthy();
	});

	it("renders the default message when message prop is empty", () => {
		const defaultMessage = "No data found";
		render(<EmptyState message="" />);

		// Is the default message text is rendered
		expect(screen.getByText(defaultMessage)).toBeTruthy();
		// Is the icon is rendered
		expect(screen.getByTestId("empty-icon")).toBeTruthy();
	});

	it("renders the default message when message prop is not provided", () => {
		const defaultMessage = "No data found";

		render(<EmptyState message="" />);

		expect(screen.getByText(defaultMessage)).toBeTruthy();
		expect(screen.getByTestId("empty-icon")).toBeTruthy();
	});

	it("renders the Empty icon", () => {
		render(<EmptyState message="Some message" />);
		const icon = screen.getByTestId("empty-icon");
		expect(icon).toBeTruthy();
		expect(icon.props.size).toBe(100);
		expect(icon.props.color).toBe(colors.primaryDark);
	});
});
