const token = localStorage.getItem('token');
const a= document.querySelector('.downloadbtn');
a.style.visibility="hidden";

function Expense(event){
    event.preventDefault();
    const amount=document.querySelector(".amount").value;
    const description=document.querySelector(".des").value;
    const category=document.querySelector("#category").value;
const obj={
    amount,description,category,
}
console.log(obj);
PostExpense(obj);
}
//we want when we add new item that id should also add
//1. tokenpass at header,2). post-pass userId:req.user.id 3).attach to middleware.
const PostExpense=async(obj)=>{
    const token=localStorage.getItem('token');
    try{
    const res=await axios.post("http://localhost:3000/user/postexpense",obj,{
        headers:{"Authorization":token}//object 
    });
   screen(res.data.expense);
    }
    catch(e){
        console.log(e);
        document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>`
    }

}

function PremiumUserMessage(){
    document.getElementById('razor').style.visibility="hidden";
    document.getElementById('message').innerHTML="You are a premium user";
    document.getElementById('message').style.color="blue";
}  

function PremiumDownloadButton(){
   const a= document.querySelector('.downloadbtn');
   a.style.visibility="visible";
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.addEventListener('DOMContentLoaded',async()=>{
    try{
        const token=localStorage.getItem('token');
        const decodeToken=parseJwt(token);
        const ispremiumuser=decodeToken.ispremiumuser;
        console.log(decodeToken);
        if(ispremiumuser){
          PremiumUserMessage();
          ShowLeaderBoard();//function
          PremiumDownloadButton();
        }

        const res=await axios.get("http://localhost:3000/expense/getexpense",{ headers:{"Authorization":token}});
        // console.log(res.data.getExpense);
        res.data.getExpense.forEach(e=>{
            screen(e);
        })
    }
catch(e){
    console.log(e);
    document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>`
}

})
function screen(obj){
    let today = new Date().toLocaleDateString();
    const div2=document.querySelector('.tbody');
 const li = ` <tr id=${obj.id} > <td>${today} </td> <td>${obj.amount} </td>  <td>${obj.description} </td>  <td>${obj.category} </td>
 <td class="btntd"><button class="btn" onClick=DELETE('${obj.id}')>DELETE</button></td>
</tr>  `;

div2.innerHTML+=li;

}

const DELETE=async(id)=>{
    const token=localStorage.getItem('token');
    try{    
        const res= await axios .delete(`http://localhost:3000/expense/deleteexpense/${id}`,{  headers:{"Authorization":token} });
      delScreen(id);
    }
    catch(e){
        console.log(e);
        document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>`
    }
}

function delScreen(id){
    const div2=document.querySelector('.tbody');
    const li=document.getElementById(id);
    div2.removeChild(li);
}

document.getElementById('razor').onclick =async function(e){
    const token=localStorage.getItem('token');
    const response=await axios.get('http://localhost:3000/purchase/premiummembership',{headers:{"Authorization":token}})
     console.log(response);
     var options=
     {
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function (response){
        await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{headers:{"Authorization":token}})

            alert('You are a Premium User Now');
            PremiumUserMessage();
            ShowLeaderBoard(); 
            PremiumDownloadButton();
           localStorage.setItem('token',res.data.token);
         //function
        },
     };
    //  console.log(options);
     const rzpl=new Razorpay(options);
     rzpl.open();
     e.preventDefault();

     rzpl.on('payment.failed',function (response) {
        console.log(response);
        alert('Something went wrong');
     });

}

function ShowLeaderBoard(){
const input=document.createElement('input');
input.type="button";
input.value="Show LeaderBoard";
input.onclick=async()=>{
const token=localStorage.getItem('token');
const leaderboardArray=await axios.get('http://localhost:3000/premium/showleaderboard',{headers:{"Authorization":token}})
console.log(leaderboardArray);

var leaderboard=document.getElementById('leaderboardshow')
leaderboard.innerHTML+='<h2>Leaderboard</h2>'
leaderboardArray.data.forEach(user=>{
    console.log(user);
    leaderboard.innerHTML+=`<li>Name :${user.name}  Total Expense :${user.totalExpense}</li>`
})
}
document.getElementById('message').appendChild(input);    

}

const downloadExpense=async()=>{
 const response=axios.get('http://localhost:3000/user/download',{headers:{"Authorization":token}})
 try{
    if(response.status === 201){
        //the bcakend is essentially sending a download link
        //  which if we open in browser, the file would download
        var a = document.createElement("a");
        a.href = response.data.fileUrl;
        a.download = 'myexpense.csv';
        a.click();
    } else {
        throw new Error(response.data.message)
    }  
 }
catch(err) {
showError(err)
};


}