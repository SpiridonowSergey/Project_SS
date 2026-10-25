const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Меняем путь на ./src/global.css
module.exports = withNativeWind(config, { input: "./src/global.css" });