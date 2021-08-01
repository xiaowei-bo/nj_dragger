const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const koaStatic = require("koa-static-server");
const Koa = require("koa");
// const httpProxy = require("http-proxy");
const app = new Koa();
const KoaRouter = require("koa-router");
const router = new KoaRouter();
const port = 9797;
// const proxy = httpProxy.createProxyServer({});

const pcHtmlFile = path.resolve(__dirname, "../dist/index.html");
const h5HtmlFile = path.resolve(__dirname, "../dist/view.html");
let pcTemplate = "";
let h5Template = "";
if (fs.existsSync(pcHtmlFile)) {
    pcTemplate = fs.readFileSync(pcHtmlFile, "utf-8");
}
if (fs.existsSync(h5HtmlFile)) {
    h5Template = fs.readFileSync(h5HtmlFile, "utf-8");
}

app.use(koaStatic({
    maxage: process.env.NODE_ENV === "development" ? 0 : 1000 * 60 * 60 * 24, // 1000 * 60 * 60 * 24 cookie有效时长
    rootDir: "./dist/static",
    rootPath: "/static"
}));
app.use(koaStatic({
    maxage: process.env.NODE_ENV === "development" ? 0 : 1000 * 60 * 60 * 24, // 1000 * 60 * 60 * 24 cookie有效时长
    rootDir: "./dist/favicon.ico",
    rootPath: "/favicon.ico"
}));

app.use(router.routes());
app.use(router.allowedMethods());

router.get("/", async (ctx, next) => {
    ctx.set("Content-Type", "text/html");
    ctx.body = pcTemplate;
});

router.get("/view", async (ctx, next) => {
    ctx.set("Content-Type", "text/html");
    ctx.body = h5Template;
});

app.listen(port, function() {
    console.log(chalk.green(`> Preview at  http://localhost:${port}`));
});