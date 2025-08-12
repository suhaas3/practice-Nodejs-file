const s = 10;
const k = 23;


setTimeout(() => {
  console.log('prints after 3 seconds');
},3000)

//this code is executed after clearing the GEC of the call stact
setTimeout(() => {
  console.log('prints as soon as possible');
},0)//trust issue with the setTimeout

function sumOfTwo(v1, v2) {
  return console.log('sum of two variables:', v1 + v2);
}

sumOfTwo(s, k)