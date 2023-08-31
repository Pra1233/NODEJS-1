//  | symbol is union of type
// Typecasting if we know type
const n1=document.getElementById('n1') as HTMLInputElement ;
const n2=document.getElementById('n2') as HTMLInputElement;
const btna=document.querySelector('button')!;

// Error because typescript dont know where button is
btna.addEventListener('click',()=>{
  const num1=n1.value;
  const num2=n2.value;
  console.log(add(+num1,+num2))
  });

type addfun=number|string ;  
 
// function add(num1:number|string, num2:number|string) {
function add(num1:addfun, num2:addfun) {
  if(typeof num1==='number' && typeof num2 ==='number'){
    return num1 + num2;
  }
  if(typeof num1==='string' && typeof num2==='string'){
    return num1+num2;
  } 
  else  return +num1 +  +num2;
 
}
function obj(o:{val:number; timestamp:Date}){
console.log("object.val",o.val,o.timestamp);
}


const ans=add(1, 6);
const oans=obj({val:ans as number, timestamp:new Date()})

console.log(ans);
console.log(add('1', '3'));

// Array;
const numArray:number[]=[];
const stringArray:string[]=[];
numArray.push(ans as number);
stringArray.push('a');
console.log("numArray",numArray);
console.log(stringArray);


// console.log(add('1', '6'));
