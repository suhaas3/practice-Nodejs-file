const fs=require('node:fs');
const https=require('https');


const s = 1;
const k = 3;

//sync way --> blocked the code some portion of time
fs.readFileSync('./file.txt','utf-8');
console.log('first printed data of the file')

//Aysnc way
fs.readFile('./file.txt','utf-8',(err,data) => {
  console.log('second File data:',data);
})

https.get("https://fakestoreapi.com/products/1",(res) => {
  console.log('Data fetched To the Api Call');
})

setTimeout(() => {
  console.log('This is print the after 5 seconds');
},5000)

function multiply(p1, p2) {
  return console.log('multiplication of two numbers:', p1 * p2)
}

multiply(s,k);