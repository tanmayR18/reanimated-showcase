// const { getDefaultConfig } = require('@react-native/metro-config');
// const {
//   wrapWithReanimatedMetroConfig,
// } = require('react-native-reanimated/metro-config');

// const config = getDefaultConfig(__dirname);

// module.exports = wrapWithReanimatedMetroConfig(config);

const { getDefaultConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Step 1: Get the default Metro config
const defaultConfig = getDefaultConfig(__dirname);

// Step 2: Apply NativeWind wrapping first (this reads your global.css)
const nativeWindConfig = withNativeWind(defaultConfig, {
  input: './global.css', // or wherever your css file is
});

// Step 3: Wrap the result with Reanimated's config
module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);

