import { fireEvent, render } from "@testing-library/react-native"; // Import fireEvent
import React from "react";

import Button from "@/components/Button";

describe("<Button />", () => {
	const mockOnPress = jest.fn();
	const buttonText = "Click Me";

	beforeEach(() => {
		// Reset mock function calls before each test
		mockOnPress.mockClear();
	});

	it("renders the button text correctly", () => {
		const { getByText } = render(
			<Button
				buttonText={buttonText}
				handleOnPress={mockOnPress}
				variant="default"
			/>
		);
		expect(getByText(buttonText)).toBeTruthy();
	});

	it("calls handleOnPress when pressed", () => {
		const { getByText } = render(
			<Button
				buttonText={buttonText}
				handleOnPress={mockOnPress}
				variant="default"
			/>
		);
		fireEvent.press(getByText(buttonText));
		expect(mockOnPress).toHaveBeenCalledTimes(1);
	});
});
