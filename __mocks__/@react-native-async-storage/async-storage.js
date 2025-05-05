// Mock implementation for @react-native-async-storage/async-storage

let store = {};

export default {
	setItem: jest.fn((key, value) => {
		return new Promise((resolve) => {
			store[key] = value;
			resolve(null);
		});
	}),
	getItem: jest.fn((key) => {
		return new Promise((resolve) => {
			resolve(store[key] || null);
		});
	}),
	removeItem: jest.fn((key) => {
		return new Promise((resolve) => {
			delete store[key];
			resolve(null);
		});
	}),
	clear: jest.fn(() => {
		return new Promise((resolve) => {
			store = {};
			resolve(null);
		});
	}),
	getAllKeys: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(Object.keys(store));
		});
	}),
	mergeItem: jest.fn((key, value) => {
		return new Promise((resolve) => {
			const oldValue = store[key] ? JSON.parse(store[key]) : {};
			const newValue = JSON.parse(value);
			store[key] = JSON.stringify({ ...oldValue, ...newValue });
			resolve(null);
		});
	}),
};
