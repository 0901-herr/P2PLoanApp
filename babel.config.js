module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // require("flowbite/plugin")({
      //   charts: true,
      // }),
      //   // Required for expo-router
      //   "expo-router/babel",
      //   "react-native-reanimated/plugin",
    ],
  };
};
