const Expense=require('../models/Expense');
const User=require('../models/Signup');
const Download=require('../models/download');
const sequelize=require('../util/database');
const Userservices=require('../services/userservices');
const S3services=require('../services/S3services');



exports.downloadbtn=async(req,res)=>{
  try{
    // const expense=await req.user.getExpenses();
    const expense=await Userservices.getExpenses(req);
    const strigifyExpenses=JSON.stringify(expense);
    const userid=req.user.id;
    let date= new Date();
    const filename=`expense${userid}/${new Date()}.txt`;
    const fileURL=await S3services.uploadToS3(strigifyExpenses,filename);//async function so used promise
       await Download.create({date:date,fileURL:fileURL,UserId:userid});
        const getdownload= await Download.findAll({ where:{userId:req.user.id},attributes:['date','fileURL'] }); 
  
    console.log("fileUrl",getdownload);
    res.status(200).json({fileURL,getdownload:getdownload,success:true})
  }
  catch(e){
    console.log("ERROR In DownloadBtn",e);
      res.status(500).json({fileURL:'',success:false,error:e});

  }
  }


  function isstringValid(string){
    if(string==undefined||string.length===0)return true;
    else return false;
    }
exports.postExpense=async(req,res)=>{
  const t=await sequelize.transaction();
  try{
const {amount,description,category}=req.body;
if(isstringValid(amount)||isstringValid(description)||isstringValid(category)){
  document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>` 
  return res.status(400).json({e:"Bad Parameter, Something is missing"});
      }

//  const response=await Expense.create({amount,description,category,userId:req.user.id},{transaction:t});//user.id attach in middleware
const response=await req.user.createExpense({amount,description,category},{transaction:t});
const totalExpense=Number(req.user.totalExpense) + Number(amount);
await User.update({
  totalExpense:totalExpense
},{
  where:{id:req.user.id},
  transaction:t,
})

await t.commit();
res.status(200).json({expense:response})
  }
  catch(e){
      await t.rollback();
      res.status(500).json({success:false,error:e})
  }
}

exports.deleteExpense=async(req,res)=>{
  // const t=sequelize.transaction();
  const id=req.params.id; 
  try{
    if(!req.params.id ||id.length===0){
      res.status(400).json({err:'Not define ID'});
      console.log("Id Is Missing");
      }  
      // await User.update({
      //   totalExpense:totalExpense
      // },{
      //   where:{id:req.user.id},
      //   transaction:t,
      // })  

   const noofrows= await Expense.destroy({where:{id:id, userId:req.user.id}});//authenticate user only allowed to delete
   if(noofrows===0){
    return res.status(404).json({success:false,message:'Expense Doesnt belong to user'})
   }  
   res.status(200).json({success:true, msg:"Deleted Successful"})
  }
  catch(e){
    res.status(500).json({error:e});
    console.log('Delete user is fail',e);
}

}


exports.getExpenses=(req,res)=>{
  var ITEMS_PER_PAGE;
if(  isNaN(+req.query.limit)){
  console.log("32423232344324324243");
  ITEMS_PER_PAGE=2;
}
else{
  ITEMS_PER_PAGE=+req.query.limit;
}
  const page=+req.query.page ||1;
  console.log('page',page);
  console.log('ITEMS_PER_PAGE',ITEMS_PER_PAGE);
  let totalItems;

  Expense.count().then(total=>{
   totalItems=total;
   console.log('totalItems',totalItems);
 return  Expense.findAll(
    // {where:{userId:req.user.id}},
    {  where:{userId:req.user.id},
      offset:(page-1)*ITEMS_PER_PAGE,
      limit:ITEMS_PER_PAGE,
    })
  })
.then((expenses)=>{
  res.status(200).json({success:true,
    products:expenses,
    currentPage:page,
    hasnextPage:ITEMS_PER_PAGE*page<totalItems,
    nextPage:page+1,
    haspreviousPage:page>1,
    previousPage:page-1,
    lastPage:Math.ceil(totalItems/ITEMS_PER_PAGE),
  });
}).catch((err)=>{
  console.log('Get Expense is fail',err);
  res.status(500).json({err});

})
//  const expenses= await req.user.getExpenses();
// const expenses=await Expense.findAll({where:{userId:req.user.id}});
  // res.status(200).json({success:true,getExpense:expenses});


  
}

