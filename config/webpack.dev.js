module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    proxy: {
      "/proxy": {
        target: "http://127.0.0.1:80",
        pathRewrite: { "^/proxy": "" },
        changeOrigin: true,
      },
    },
  },
};
