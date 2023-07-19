'use strict';

const ps = require('prompt-sync');
const prompt = ps();
let name = prompt('whats your name');
console.log(`Hello ${name}`);