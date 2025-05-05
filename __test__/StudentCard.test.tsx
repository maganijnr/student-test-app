import StudentCard from "@/components/StudentCard";
import useAppStore from "@/store/store";
import { Student } from "@/types";
import { shortenWord } from "@/utils/formatter";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";

// Mocks

// Mock Zustand store
jest.mock("@/store/store");
const mockSetSelectedStudent = jest.fn();
const mockedUseAppStore = useAppStore as jest.MockedFunction<
	typeof useAppStore
>;

// Mock expo-router
jest.mock("expo-router", () => ({
	router: {
		push: jest.fn(),
	},
}));
const mockedRouterPush = router.push as jest.Mock;

// Mock expo-image
jest.mock("expo-image", () => ({
	Image: ({ source, style, testID }: any) => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const { View } = require("react-native");
		// Pass down source to check which image was used
		return <View testID={testID} style={style} data-source={source} />;
	},
}));

jest.mock("@/components/Typo", () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { Text } = require("react-native");
	return ({ children, ...props }: any) => <Text {...props}>{children}</Text>;
});

// Mock EnrollmentPill component
jest.mock("@/components/EnrollmentPill", () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { View, Text } = require("react-native");
	return ({ enrollment, ...props }: any) => (
		<View {...props} testID="enrollment-pill">
			<Text>{enrollment}</Text>
		</View>
	);
});

// Mock scaling utility
jest.mock("@/utils/styling", () => ({
	scale: (val: number) => val,
	verticalScale: (val: number) => val,
}));

// --- Test Data ---
const mockStudent: {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	enrollment_status: "Enrolled" | "Alumni" | "Graduated";
	avatar: string;
} = {
	id: "123",
	first_name: "John",
	last_name: "Doe",
	email: "john.doe.very.long.email@example.com",
	enrollment_status: "Enrolled",
	avatar: "https://example.com/avatar.png",
};

const mockStudentWithoutAvatar: Student = {
	...mockStudent,
	id: "456",
	avatar: "", // No avatar provided
};

const fallbackImageSource = require("@/assets/images/no-profile.png");

// Test Suites
describe("<StudentCard />", () => {
	beforeEach(() => {
		// Reset mocks before each test
		mockSetSelectedStudent.mockClear();
		mockedRouterPush.mockClear();
		// Setup the mock return value for the store hook
		mockedUseAppStore.mockReturnValue({
			setSelectedStudent: mockSetSelectedStudent,
			// Mock other store values/actions if needed by the component
			allStudents: [],
			selectedStudent: null,
			setAllStudents: jest.fn(),
			addStudent: jest.fn(),
			updateStudent: jest.fn(),
			deleteStudent: jest.fn(),
		});
	});

	it("renders student name correctly", () => {
		render(<StudentCard {...mockStudent} />);
		expect(screen.getByText("John Doe")).toBeTruthy();
	});

	it("renders shortened email correctly", () => {
		render(<StudentCard {...mockStudent} />);
		const expectedShortEmail = shortenWord(mockStudent.email, 18); // 'john.doe.very.long...'
		expect(screen.getByText(expectedShortEmail)).toBeTruthy();
	});

	it("renders avatar image when provided", () => {
		render(<StudentCard {...mockStudent} />);
		const image = screen.getByTestId("student-avatar-image");
		expect(image.props["data-source"]).toBe(mockStudent.avatar);
	});

	it("renders fallback image when avatar is not provided", () => {
		render(<StudentCard {...mockStudentWithoutAvatar} />);
		const image = screen.getByTestId("student-avatar-image");
		expect(image.props["data-source"]).not.toBe(mockStudent.avatar);
	});

	it("calls setSelectedStudent and router.push on press", () => {
		render(<StudentCard {...mockStudent} />);

		const nameText = screen.getByText("John Doe");
		fireEvent.press(nameText);

		// Check if setSelectedStudent was called correctly
		expect(mockSetSelectedStudent).toHaveBeenCalledTimes(1);
		expect(mockSetSelectedStudent).toHaveBeenCalledWith({
			id: mockStudent.id,
			first_name: mockStudent.first_name,
			last_name: mockStudent.last_name,
			email: mockStudent.email,
			enrollment_status: mockStudent.enrollment_status,
			avatar: mockStudent.avatar,
		});

		// Check if router.push was called correctly
		expect(mockedRouterPush).toHaveBeenCalledTimes(1);
		expect(mockedRouterPush).toHaveBeenCalledWith("/(modals)/studentModal");
	});
});

// Add testID to the Image mock for easier selection:
jest.mock("expo-image", () => ({
	Image: ({ source, style, contentFit, transition }: any) => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const { View } = require("react-native");
		return (
			<View
				testID="student-avatar-image"
				style={style}
				data-source={source}
			/>
		);
	},
}));
