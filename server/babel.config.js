module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: 10
        }
      }
    ]
  ],
  plugins: ["@babel/plugin-transform-runtime", "import-graphql"]
};
