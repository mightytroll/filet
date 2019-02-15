#!/usr/bin/env node

const inquirer = require("inquirer");

const run = async () => {
    console.log("This utility will walk you through creating a skeleton for your app.");
    console.log("It only covers the most common items, and tries to guess sensible defaults.");
    console.log("");
    console.log("Press ^C at any time to quit.");

    let answers = await inquirer.prompt({
        name: "type",
        type: "list",
        message: "app type:",
        choices: ["front-end", "library", "micro-service"]
    });

    let generator = require(`./generators/${answers.type}`);
    await generator.run();

    console.log("Done.");
    console.log("");
    console.log("Readme file was generated. Refer to it for next steps.");
    console.log("You can now run `npm install` to install dependencies.");
    console.log("");
};

run();
