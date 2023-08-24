const token = localStorage.getItem('token');
const a= document.querySelector('.downloadbtn');
const b= document.querySelector('.downloadheading');
a.style.visibility="hidden";
b.style.visibility="hidden";

function  showError(e){
    console.log(e);
    document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>`
}

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
        showError(e);
    }

}

function PremiumUserMessage(){
    document.getElementById('razor').style.visibility="hidden";
    document.getElementById('message').innerHTML="You are a premium user";
    document.getElementById('message').style.color="blue";
}  

function PremiumDownloadButton(){
   a.style.visibility="visible";
   b.style.visibility="visible";
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

        let inputvalue=localStorage.getItem('inputvalue');
        // if(inputvalue==='undefine'||inputvalue.length<=0||inputvalue==='NAN'){
        //     inputvalue=2;
        // }

// const res = await axios.get('http://localhost:3000/' + querystring);
          let page=1;
        const res=await axios.get(`http://localhost:3000/expense/getexpense?page=${page}&limit=${inputvalue}`,{ headers:{"Authorization":token}});
      
        console.log("data",res.data);
        res.data.products.forEach((product)=>{
            // console.log("1213",product);
            screen(product);         
        })
        showPagination(res.data);  
        // maximumItemPerPage();  
    }
   
catch(e){
    showError(e);
}
})

const pagination=document.querySelector('.pagination');
function showPagination({
    currentPage,hasnextPage,nextPage,haspreviousPage,previousPage,lastPage}){
pagination.innerHTML=' ';
if(haspreviousPage){
    const btn2=document.createElement('button');
    btn2.innerHTML=previousPage;
    btn2.addEventListener('click',()=>getProducts(previousPage));
    pagination.appendChild(btn2);
}
const btn1=document.createElement('button');
btn1.innerHTML=`<h3>${currentPage}</h3>`;
btn1.addEventListener('click',()=>getProducts(currentPage));
pagination.appendChild(btn1);

if(hasnextPage){
    const btn3=document.createElement('button');
    btn3.innerHTML=nextPage;
    btn3.addEventListener('click',()=>getProducts(nextPage));
    pagination.appendChild(btn3);   
}

}


function maximumItemfun(){
    const inputvalue=document.querySelector('.inputmaximum').value;
    console.log("first",inputvalue);
    localStorage.setItem('inputvalue',inputvalue);

}
async function getProducts(page){
    try{
 const res=await axios.get(`http://localhost:3000/expense/getexpense?page=${page}`,{ headers:{"Authorization":token}});
        res.data.products.forEach((product)=>{
            screen(product);
            showPagination(res.data);//other thing
        })
    }
  catch(e){
    showError(e);
  }
}

  

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
        showError(e);
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
input.class="leaderboard";
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
// DOWNLOAD EXPENSE
const downloadExpense=async()=>{
 const response=await axios.get('http://localhost:3000/user/download',{headers:{"Authorization":token}})
 try{
    if(response.status === 200){
        var a = document.createElement("a");
        a.href = response.data.fileURL;
        a.download = 'myexpense.csv';
        a.click();
        response.data.getdownload.forEach(f=>{
         downloadedfile(f);
        })
   
       

    } else {
        throw new Error(response.data.message)
    }  
 }
catch(e) {
    console.log(e);
    showError(e);
};


}

function downloadedfile(data){
  const tbody=  document.querySelector('.tdownload');
  const tr= `<tr>  <td class=".tdd">${data.date}</td>  <td class="a"><a href="${data.fileURL}">${data.fileURL} </a> </td>   </tr>` ;
  tbody.innerHTML+=tr;

}
