const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use("/login", proxy({
        target: "http://localhost:8000",
        changeOrigin: true
    }));
}