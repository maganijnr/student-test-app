import { render, screen } from "@testing-library/react-native";
import React from "react";

import WidgetCard from "@/components/WidgetCard";
import { numberWithCommas } from "@/utils/formatter";

// Mock the Typo component to just render its children
jest.mock("@/components/Typo", () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { Text } = require("react-native");
	// Render children within a Text component, passing down props like testID
	return ({ children, ...props }: any) => <Text {...props}>{children}</Text>;
});

// Mocking scaling utilities
jest.mock("@/utils/styling", () => ({
	scale: (val: number) => val,
	verticalScale: (val: number) => val,
}));

describe("<WidgetCard />", () => {
	it("renders the label correctly", () => {
		const testItem = { label: "Total Students", value: 150 };
		render(<WidgetCard item={testItem} />);

		// Check if the label text is present
		expect(screen.getByText("Total Students")).toBeTruthy();
	});

	it("renders the value formatted with commas", () => {
		const testItem = { label: "Large Count", value: 1234567 };
		render(<WidgetCard item={testItem} />);

		expect(screen.getByText("1,234,567")).toBeTruthy();
		expect(numberWithCommas(testItem.value)).toBe("1,234,567");
	});

	it("renders a value without commas correctly", () => {
		const testItem = { label: "Small Count", value: 50 };
		render(<WidgetCard item={testItem} />);

		expect(screen.getByText("50")).toBeTruthy();
		expect(numberWithCommas(testItem.value)).toBe("50");
	});

	it("renders a value of 0 correctly", () => {
		const testItem = { label: "Zero Count", value: 0 };
		render(<WidgetCard item={testItem} />);

		expect(screen.getByText("0")).toBeTruthy();
		expect(numberWithCommas(testItem.value)).toBe(0);
	});
});
