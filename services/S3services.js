const AWS=require('aws-sdk');

function uploadToS3(data,filename){
    try{
      const BUCKET_NAME='expensebucket321';
      const IAM_USER_KEY='AKIA6LNYX7OY46YKWOFS';
      const IAM_USER_SECRET='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';
      
      let s3bucket=new AWS.S3({  
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
      })
        var params={
          Bucket:BUCKET_NAME,
          Key:filename,  //where data save
          Body:data,
          ACL:'public-read' //Access control level
        }
        return new Promise((resolve,reject)=>{
          s3bucket.upload(params,(err,s3response)=>{
            if(err){
              console.log("Something went wrong");
              console.log(err);
              reject(err);
            }
            else{
              console.log("Success",s3response);
             resolve(s3response.Location);
            }
          })
        })
    }
  catch(e){
    console.log(e);
    res.status(500).json({message:e});
  }
  
  
  }

  module.exports={
    uploadToS3,
  }