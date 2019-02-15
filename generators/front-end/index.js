const inquirer = require("inquirer");
const camelCase = require('camelcase');
const shell = require('shelljs');

module.exports = {
    async run() {
        const app = require("./template/package");

        app.name = "my-app";
        app.version = "1.0.0";

        let response = await inquirer.prompt([{
            name: "name",
            type: "input",
            message: "package name:",
            default: app.name
        }, {
            name: "version",
            type: "input",
            message: "version:",
            default: app.version
        }, {
            name: "description",
            type: "input",
            message: "description:"
        }]);

        app.name = response.name;
        app.version = response.version;
        app.description = response.description;
        app.main = `dist/${app.name}.js`;
        app.repository.url = `git+https://github.com/xola/${app.name}.git`;

        let {lib} = await inquirer.prompt([{
            name: "lib",
            type: "input",
            message: "variable name:",
            default: camelCase(app.name, {pascalCase: true})
        }]);

        await shell.ShellString(JSON.stringify(app, null, 4))
            .to("package.json");

        await shell.sed("__PACKAGE_NAME__", app.name, `${__dirname}/template/webpack.config.js`)
            .sed("__LIBRARY_NAME__", lib)
            .to("webpack.config.js");

        await shell.mkdir("-p", "web");
        await shell.sed("__PACKAGE_NAME__", app.name, `${__dirname}/template/web/index.html`)
            .to("web/index.html");

        await shell.cp("-r", `${__dirname}/template/src`, "src");

        await shell.mkdir("-p", "test");
    }
};