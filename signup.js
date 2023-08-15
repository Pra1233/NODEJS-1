const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})

function onSignup(e){
    e.preventDefault();
    const name=document.querySelector('.name').value;
    const email=document.querySelector('.email').value;
    const password=document.querySelector('.password').value;
    const obj={
    name,email,password,
    }
    onPost(obj); //function
    }

    const onPost=async(obj)=>{
    try{
    const res=await axios.post('http://localhost:3000/user/adduser',obj);
   if(res.status===201){
    // window.location.href="../login/login.html"
    alert('hi');
   }
   else{
    throw new Error('Failed to Login');
   }
    }
    catch(e){
    document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>`
    console.log(e);
    }
    }

    //Login
