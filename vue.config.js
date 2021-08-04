const webpack = require("webpack");
const path = require("path");
const { ENV } = require("./src/config/index.js");
const port = 9797;

module.exports = {
    publicPath: "/",
    outputDir: "dist",
    assetsDir: "static",
    lintOnSave: ENV === "development",
    productionSourceMap: false,
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "拖拽平台"
        },
        view: {
            entry: "src/views/drag/h5/main.js",
            template: "public/view.html",
            filename: "view.html",
            title: ""
        }
    },
    devServer: {
        port: port,
        open: ENV === "development",
        compress: true,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    configureWebpack: {
        name: "vue3 + webpack5 + vue-cli",
        resolve: {
            alias: {
                "@": path.join(__dirname, "src/")
            }
        },
        // webpack5 文件缓存利器 从此干掉 HardSourceWebpackPlugin
        cache: {
            type: "filesystem",
            buildDependencies: {
                config: [__filename, path.join(__dirname, "babel.config.js")]
            },
            version: "1.0"
        },
        plugins: [
            new webpack.DefinePlugin({
                "ENV": JSON.stringify(ENV) // 字符串
            })
        ]
    },
    chainWebpack(config) {
        config.optimization.splitChunks({
            chunks: "all",
            cacheGroups: {
                libs: {
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // only package third parties that are initially dependent
                },
                elementUI: {
                    name: "chunk-elementUI", // split elementUI into a single package
                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                    name: "chunk-commons",
                    test: path.join(__dirname, "src/components"), // can customize your rules
                    minChunks: 3, //  minimum common number
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        });
        config.module
            .rule("md")
            .test(/\.md$/)
            .use("vue-loader")
            .loader("vue-loader")
            .end()
            .use("vue-markdown-loader")
            .loader("vue-markdown-loader/lib/markdown-compiler")
            .options({
                raw: true
            });
    }
};
