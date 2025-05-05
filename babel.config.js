module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		// Add any other plugins or presets you might need here
	};
};
