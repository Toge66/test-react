module.exports = async function(context) {
  // const { babelOptions } = context;

  // babelOptions.plugins.push(["import", { style: true, libraryName: "antd" }]);

  context.aggressive = false;

  context.entry = {
    index: "./src/index.js"
  };
};
