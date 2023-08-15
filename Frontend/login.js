
    function onLogin(e){
        e.preventDefault();
        const email=document.querySelector('.email').value;
        const password=document.querySelector('.password').value;
        const obj={
        email,password,
        }
        console.log(obj);
        onPostLogin(obj); 
        }
    
    const onPostLogin=async(obj)=>{
     try{
        const res=await axios.post('http://localhost:3000/user/login',obj);
        // alert(res.data.message);
     }
        catch(e){
        document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>`
        console.log(e);
        }
    
        }
  