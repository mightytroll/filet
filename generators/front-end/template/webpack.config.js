const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'web')
    },
    context: path.resolve(__dirname, "src"),
    entry: {
        "__PACKAGE_NAME__": "./index.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: /src/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            }, {
                loader: "xola-style-loader"
            }, {
                loader: "xola-template-loader"
            }]
        }, {
            test: /\.less$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
        }, {
            test: /\.njk/,
            use: [{
                loader: "nunjucks-loader"
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new MiniCssExtractPlugin({

            filename: "css/[name].css"
        }),
        new CopyWebpackPlugin([
            { from: "../web/index.html", to: "." }
        ]),
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
        library: "__VARIABLE_NAME__",
        libraryTarget: "umd",
        publicPath: "/",
        umdNamedDefine: true,
        globalObject: `typeof self !== "undefined" ? self : this`,
    }
};