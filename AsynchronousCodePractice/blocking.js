const crypto=require('node:crypto')

const s=7;
const k=3;

//pbkdf2 --> password base key derivative function
crypto.pbkdf2Sync("password","salt",5000000,50,'sha512')
console.log('sync password is generated');

//Async Function
//pbkdf2 --> password based key derivative function
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512",(err,key) => {
  console.log("password is generated");
})

function multiply(s,k) {
  return console.log('multiplication of two numbers:',s*k)
}


multiply(s,k);