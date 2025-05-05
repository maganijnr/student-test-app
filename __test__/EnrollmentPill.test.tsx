import EnrollmentPill from "@/components/EnrollmentPill";
import { render, screen } from "@testing-library/react-native";
import React from "react";

// Mock the Typo component
jest.mock("@/components/Typo", () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { Text } = require("react-native");

	return ({ children, ...props }: any) => <Text {...props}>{children}</Text>;
});

describe("<EnrollmentPill />", () => {
	it("renders the enrollment string correctly", () => {
		const testEnrollment = "Graduated";
		render(<EnrollmentPill enrollment={testEnrollment} />);

		// Is the enrollment text is rendered
		expect(screen.getByText(testEnrollment)).toBeTruthy();
	});

	it("renders a different enrollment string correctly", () => {
		const testEnrollment = "Alumni";
		render(<EnrollmentPill enrollment={testEnrollment} />);

		expect(screen.getByText(testEnrollment)).toBeTruthy();
	});

	it("renders a default message if an empty string is provided", () => {
		const defaultMessage = "Invalid";
		render(<EnrollmentPill enrollment={""} />);
		expect(screen.getByText(defaultMessage)).toBeTruthy();
	});
});
