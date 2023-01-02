const express=require('express');
const jwt=require('jsonwebtoken');

const app=express();
const secretkey="secretkey";

app.get('/api',(req,res)=>{
    res.json({
        message:"Welcome to the API"
    });
});


app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,secretkey,(err,authData)=>{
        if(err){
            res.send({result:"no login"});
        }else
        {
            res.json({ 
                message:'Post Created',
                authData
            });
        }
    });
});

app.post('/login',(req,res)=>{
    const user={
         id:1,
         username:"karthik",
         email:"karthik@gmail.com"
    }
    jwt.sign({user},secretkey,{expiresIn:'500s'},(err,token)=>{
        res.json({token});
    });
});


function verifyToken(req,res,next){
   
         const bearerHeader=req.headers['authorization'];
         if(typeof bearerHeader !=='undefined'){
            const bearer=bearerHeader.split(' ');
            const token=bearer[1];
            req.token=token;
            next();
         }else{
            res.send({result:"No login"});
         }
    }
    app.listen(5000);