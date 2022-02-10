#!/usr/bin/env zx

import { $ } from "zx";
const gitRes = $`git pull`;
console.log("git pull", gitRes);

const md5_old = $`cat package.md5`;
const md5_new = $`md5sum package.json | awk '{print $1}'`;
console.log("md5_old", md5_old);
console.log("md5_new", md5_new);
