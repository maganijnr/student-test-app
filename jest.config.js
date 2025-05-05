module.exports = {
	preset: "jest-expo",
	// This pattern tells Jest to NOT ignore react-native and other related modules
	// allowing Babel to transform them.
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))",
	],
	// Ensure you have a setup file if needed (like the one discussed previously)
	// setupFilesAfterEnv: ['./jest.setup.js'], // Uncomment or add if you have a setup file
};
