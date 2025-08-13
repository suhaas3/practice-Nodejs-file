const { promises } = require('node:dns');
const fs = require('node:fs');

const a = 3;

Promise.resolve("promise").then(console.log);

setTimeout(() => {
  console.log('Timer expired');
}, 0)

fs.readFile("./file.txt",'utf-8', (err,data) => {
  console.log('File data:',data);
})

setImmediate(() => console.log('setImmediate'));

function printA() {
  console.log("a=", a);
}

process.nextTick(() => console.log("nextTick"));

printA();
console.log("last line of code.")

//a=3
//last line of the code
//nextTick
//promise
//Timer expired
//setImmediate
//File data: this is file content of the local data
