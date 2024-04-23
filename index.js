#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.red("What would you like to add in todo list"));
let toDo = [];
let condition = true;
while (condition) {
    let addTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "what do you like to add in you toDO? ",
        },
    ]);
    const task = addTask.task.trim();
    if (task !== "") {
        toDo.push(addTask.task);
    }
    else {
        console.log("please add something , task cant be empty");
    }
    let addMore = await inquirer.prompt({
        name: "addMore",
        type: "confirm",
        message: "do you want to add more?",
        default: "false",
    });
    console.log(toDo);
    condition = addMore.addMore;
}
let update = await inquirer.prompt({
    name: "replaceTask",
    type: "number",
    message: "please insert the index you wanna replace idx starts from 0 make sure to enter correct idx",
});
let updatedidx = update.replaceTask;
if (updatedidx >= 0 && updatedidx < toDo.length) {
    let newTask = await inquirer.prompt({
        name: "updatedTask",
        message: "please enter your task",
        type: "input",
    });
    const task = newTask.updatedTask.trim();
    if (task !== "") {
        toDo.splice(updatedidx, 1, task);
        console.log("task updated successfully!");
    }
    else {
        console.log("please enter something task cant be empty");
    }
}
else {
    console.log("invalid index make sure to start counting from 0 not 1");
}
console.log(toDo);
let condition1 = true;
while (condition1) {
    let moreOpt = await inquirer.prompt([
        {
            name: "delete",
            type: "confirm",
            message: "do you want to delete task?",
            default: false,
        },
    ]);
    if (moreOpt.delete === true) {
        let askchoice = await inquirer.prompt({
            name: "ask",
            type: "list",
            message: "please select one to delete!",
            choices: ["start", "end", "cancel"],
        });
        if (askchoice.ask === "start") {
            toDo.shift();
            console.log(toDo);
        }
        else if (askchoice.ask === "end") {
            toDo.pop();
            console.log(toDo);
        }
        else if (askchoice.ask === "cancel") {
            console.log(chalk.gray(`your list items are ${toDo}`));
            console.log("see ya later!");
        }
    }
    else if (moreOpt.delete === false) {
        console.log(chalk.gray(`your list items are ${toDo}`));
        console.log(chalk.yellow("see you again!"));
    }
    condition1 = moreOpt.delete;
}
let list = await inquirer.prompt({
    name: "seeList",
    type: "confirm",
    message: "would you like to see ur todo list?",
    default: false,
});
if (list.seeList === true) {
    console.log(`your list items are ${toDo}`);
}
else {
    console.log("see ya later!");
}
