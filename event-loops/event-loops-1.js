const fs = require('node:fs');

const a = 3;

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

printA();
console.log("last line of code.")

//a=3
//last line of the code
//Timer expired
//setImmediate
//File data:this is file content of the local data