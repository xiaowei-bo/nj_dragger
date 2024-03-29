#!/usr/bin/env zx

import { $ } from "zx";
import fs from 'fs';
import { createMD5 } from "./utils.mjs";
const gitRes = await $`git pull`;
if(gitRes.exitCode !== 0) {
    console.log(chalk.red("git pull报错！！！"));
}
const hasMd5 = fs.existsSync("package.md5");
import figlet from "figlet";
let md5_old = "";
let md5_new = "";
if(hasMd5) {
    md5_old = (await $`cat package.md5`).stdout;
    md5_new = await createMD5("package.json");
}
const hasNodeModules = fs.existsSync("node_modules");
if(!hasNodeModules || !hasMd5 || md5_old !== md5_new) {
    console.log(chalk.green("> 依赖有变更，开始安装依赖..."));
    const installRes = await $`npm i`;
    if(installRes.exitCode !== 0) {
        console.log(chalk.red("依赖安装报错！！！"));
    }
    fs.writeFileSync('package.md5', md5_new);
} else {
    console.log(chalk.green("> 依赖无变更，无需安装依赖"));
}
console.log(chalk.green("> 开始构建项目..."));
const buildRes = await $`npm run build:production`;
if(buildRes.exitCode !== 0) {
    console.log(chalk.red.bold(
        figlet.textSync("BUILD      FAILED", {
            horizontalLayout: "fitted",
            verticalLayout: "fitted"
        })
    ));
}
console.log(chalk.green.bold(
    figlet.textSync("BUILD      SUCCESS", {
        horizontalLayout: "fitted",
        verticalLayout: "fitted"
    })
))

