const { promises } = require('node:dns');
const fs = require('node:fs');

const a = 3;

Promise.resolve("promise").then(console.log);

setTimeout(() => {
  console.log('Timer expired');
}, 0)

fs.readFile("./file.txt",'utf-8', (err,data) => {

  setTimeout(() => {
    console.log('2nd Timer expired')
  },0)

  setImmediate(() => console.log('2nd setImmediate'))

  process.nextTick(() => console.log('3rd nextTick'))

  console.log('File data:',data);
})

setImmediate(() => console.log('setImmediate'));

function printA() {
  console.log("a=", a);
}

process.nextTick(() => {
  console.log('nextTick');
  process.nextTick(() => console.log('inner nextTick'));
});


Promise.resolve("2nd promise").then(console.log);

process.nextTick(() => {
  console.log('2nd nextTick');
  process.nextTick(() => console.log('2nd inner nextTick'));
});

printA();
console.log("last line of code.")

//a=3
//last line of the code
//nextTick
//2nd nextTick
//inner nextTick
//2nd inner nextTick
//promise
//2nd promise
//Timer expired
//setImmediate
//File data:this is file content of the local data
//3rd nextTick
//2nd setImmediate
//2nd Timer expired

