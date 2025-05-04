import { ReactNode } from "react";
import {
	ColorValue,
	ImageProps,
	KeyboardTypeOptions,
	NativeSyntheticEvent,
	TextInputFocusEventData,
	TextProps,
	TextStyle,
	ViewStyle,
} from "react-native";

export type ScreenWrapperProps = {
	style?: ViewStyle;
	children: React.ReactNode;
};

export type TypoProps = {
	size?: number;
	color?: string;
	fontWeight?: TextStyle["fontWeight"];
	children: any | null;
	style?: TextStyle;
	textProps?: TextProps;
};

export type IconComponent = React.ComponentType<{
	height?: number;
	width?: number;
	strokeWidth?: number;
	color?: string;
	fill?: string;
}>;

export type IconProps = {
	name: string;
	color?: string;
	size?: number;
	strokeWidth?: number;
	fill?: string;
};

export type HeaderProps = {
	title?: string;
	style?: ViewStyle;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
};

export type BackButtonProps = {
	style?: ViewStyle;
	iconSize?: number;
};

export type OnboardingItemProps = {
	header: string;
	subHeader: string;
	image: ImageProps;
	bgColors: string[];
};

export type ButtonProps = {
	style?: ViewStyle;
	buttonText: string;
	variant: "default" | "void" | "outline";
	handleOnPress: () => void;
};

export type InputProps = {
	label?: string;
	value: string;
	onHandleTextChange: (value: string) => void;
	isSecured?: boolean;
	placeHolder: string;
	maxLength?: number;
	onBlur?:
		| ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
		| undefined;
	onFocus?:
		| ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
		| undefined;
	placeholderTextColor?: ColorValue;
	keyboardType?: KeyboardTypeOptions;
	error?: string;
	isPassword?: boolean;
	disabled?: boolean;
};

export type Student = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	enrollment_status: string;
	avatar: string;
};

export type EnrollmentStatus = "Graduated" | "Enrolled" | "Alumni";

export type AppStoreProps = {
	allStudents: Student[];
	currentUser: CurrentUserProps | null;
	isNewUser: boolean;
	setIsNewUser: (isNewUser: boolean) => void;
	addNewStudent: (student: Student) => void;
	setAllStudents: (students: Student[]) => void;
	setCurrentUser: (user: CurrentUserProps) => void;
	updateStudent: (student: Student) => void;
	deleteStudent: (studentId: string) => void;
	selectedStudent: Student | null;
	setSelectedStudent: (student: Student | null) => void;
	updateProfile: (user: CurrentUserProps) => void;
	logout: () => void;
};

export type CurrentUserProps = {
	fullname: string;
	email: string;
	password?: string;
	avatar?: string;
};

export type ModalWrapperProps = {
	style?: ViewStyle;
	children: ReactNode;
	bg?: string;
};
