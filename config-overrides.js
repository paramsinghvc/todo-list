const { override, fixBabelImports, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addWebpackAlias({
    "@scenes": path.resolve(__dirname, "./src/scenes"),
    "@shared": path.resolve(__dirname, "./src/shared"),
    "@core": path.resolve(__dirname, "./src/core"),
  })
);
