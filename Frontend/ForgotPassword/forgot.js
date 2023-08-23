// function forgotpassword(e){
//     e.preventDefault();
//     const email=document.querySelector('.email').value;
//     console.log(email)
//     const obj={email};
//     alert(email);
//  PostEmail(obj);   
// }

// const PostEmail=async(obj)=>{
// try{
//     const response= await axios.post('http://localhost:3000/password/forgotpassword',obj);
//     if(response.status===202){
//         document.body.innerHTML+=`<h3 style="color:red;">Mail Successfully Sent</h3>`
//     }
//     else{
//         throw new Error('Something Went wrong');
//     }
// }
// catch(e){
//     document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>`
// console.log(e);
// }
// }

// function forgotpassword(e){
//         e.preventDefault();
//         const email=document.querySelector('.email').value;
//         console.log(email)
//         const obj={email};
//         alert(email);
//      PostEmail(obj);   
//     }
    
//     const PostEmail=async(obj)=>{
//     try{
//         const response= await axios.post('http://localhost:3000/password/forgotpassword',obj);
//         if(response.status===202){
//             document.body.innerHTML+=`<h3 style="color:red;">Mail Successfully Sent</h3>`
//         }
//         else{
//             throw new Error('Something Went wrong');
//         }
//     }
//     catch(e){
//         document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>`
//     console.log(e);
//     }
//     }

