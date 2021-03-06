const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use("/login", proxy({
        target: "http://localhost:8000",
        changeOrigin: true
    }));

    app.use("/main", proxy({
        target: "http://localhost:8000",
        changeOrigin: true
    }));

    app.use("/logout", proxy({
        target: "http://localhost:8000",
        changeOrigin: true
    }));
    app.use("/api/people", proxy({
        target: "http://localhost:8000",
        changeOrigin: true
    }));
    app.use("/register_person/", proxy({
        target: "http://localhost:8000",
        changeOrigin: true
    }));
    app.use("/recognize_person/", proxy({
        target: "http://localhost:8000",
        changeOrigin: true
    }));
}