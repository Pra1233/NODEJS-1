
// const sequelize=require('../util/database');
// const Forgotpassword = require('../models/forgotpassword');
// const Sib=require('sib-api-v3-sdk');


// const uuid = require('uuid');
// const sgMail = require('@sendgrid/mail');
// const bcrypt = require('bcrypt');

// const client=Sib.ApiClient.instance;
// const apiKey=client.authentication('api-key');
// apiKey.apiKey=process.env.API_KEY;

// const transEmailAPi=new Sib.TransactionalEmailsApi()
// const sender={
//     email:'prabhatsingh5725@gmail.com',
//     name:'Prabhat'
// }
// const receivers=[
//     {
//         email:email,
//     },
// ]

// transEmailAPi.sendTransacEmail({
//     sender,
//     to:receivers,
//     subject:'Subject',
//     textContent:`Sending Email`
// }).then(console.log)
// .catch(console.log)

// function isstringValid(string){
//     if(string==undefined||string.length===0)return true;
//     else return false;
//     }

// exports.forgotpassword=async(req,res)=>{
//     try{
//         const {email}=req.body;
//         console.log(email)

//      if(isstringValid(email)){
//      document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>` 
//     return res.status(400).json({e:"Bad Parameter, Something is missing"});
//         }
//     }
//     catch(e){
//         console.log(e);
//         res.status(500).json({error:e,message:'Something went wrong'});       
//     }
// }


const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const User=require('../models/Signup');
// require('dotenv').config();

const Forgotpassword = require('../models/forgotpassword');

const forgotpassword = async (req, res) => {
    try {
        const { email } =  req.body;
        const user = await User.findOne({where : { email }});
        if(user){
            const id = uuid.v4();
            console.log(id);
            user.createForgotpassword({ id , active: true })
                .catch(err => {
                    throw new Error(err)
                })

                sgMail.setApiKey(process.env.SENGRID_API_KEY)

            const msg = {
                to: email, // Change to your recipient
                from: 'prabhatsingh5725@gmail.com', // Change to your verified sender
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
            }

            sgMail
            .send(msg)
            .then((response) => {

                // console.log(response[0].statusCode)
                // console.log(response[0].headers)
                return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})

            })
            .catch((error) => {
                throw new Error(error);
            })

            //send mail
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}

const resetpassword = (req, res) => {
    const id =  req.params.id;
    Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    })
}

const updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}


module.exports = {
    forgotpassword,
    updatepassword,
    resetpassword
}