const express =require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const User=require('./models/User');
const bcrypt=require('bcrypt');
const Post=require('./models/Post');
const jwt = require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const multer=require('multer');
const uploadMiddleware=multer({dest:'uploads/'})
const fs=require('fs');


const salt=bcrypt.genSaltSync(10);
const secret='aniiiiiiiiiiiirudhhhhhhh';
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
// app.use((req, res, next) => {
//     const token = req.headers.authorization?.split(' ')?.[1];
//     if (token) {
//       req.token = token;
//       next();
//     } else {
//       res.status(401).json({ error: 'Unauthorized: No token provided' });
//     }
//   });
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/aniii')


app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    try{
        const userDoc=await User.create({username,
            password:bcrypt.hashSync(password,salt),
        });        
        res.json(userDoc);
    }catch(e){
       res.status(400).json(e);
    }
});

app.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    const userDoc= await User.findOne({username});
    // res.json(userDoc);
    const passOk=bcrypt.compareSync(password, userDoc.password);

    if(passOk && userDoc){ 
     jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
     if(err)throw err;
     res.cookie('token',token).json({
        id:userDoc._id,
        username,
     });
     })
    }else{
    res.status(400).json('wrong-credientials')
    }    

});
app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
      if(err)throw err;
      res.json(info);
    });
  
    
 });
// app.get('/profile', (req, res) => {
//     const token = req.cookies.token;
  
//     if (!token) {
//       return res.status(401).json({ error: 'Unauthorized: No token provided' });
//     }
  
//     jwt.verify(token, secret, {}, (err, info) => {
//       if (err) {
//         return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//       }
  
//       res.json(info);
//     });
//   });
// app.get('/profile', (req, res) => {
//     const { token } = req.cookies;

//     // Debug: Log the extracted token
//     console.log('Extracted Token:', token);

//     // Verify the JWT token
//     jwt.verify(token, secret, {}, (err, info) => {
//         if (err) {
//             // Debug: Log the error
//             console.error('JWT Verification Error:', err);

//             // Handle JWT errors
//             if (err.name === 'TokenExpiredError') {
//                 return res.status(401).json({ error: 'Token expired' });
//             } else if (err.name === 'JsonWebTokenError') {
//                 return res.status(401).json({ error: 'Invalid token' });
//             } else {
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }
//         }
        
//         // If verification succeeds, send the decoded info
//         res.json(info);
//     });
// });

 app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
 })
 app.post('/post',uploadMiddleware.single('file'),async(req,res)=>{
    const {originalname,path}=req.file;
   // res.json(originalname);
    const parts= originalname.split('.');
   
// //     const par=parts.split('.');
    const ext=parts[parts.length-1];
    const newPath=path+'.'+ext;
    fs.renameSync(path,newPath);
    const {token}=req.cookies;
    jwt.verify(token,secret,{},async(err,info)=>{
        if(err)throw err;
        
    const{title,summary,content}=req.body;
    const postDoc=await Post.create({
       title,
       summary,
       content,
       cover:newPath,
       author:info.id,
   });

  res.json(postDoc);
      });






 })
 app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {id,title,summary,content} = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
  
      res.json(postDoc);
    });
  
  });
 app.get('/post',async(req,res)=>{
    res.json(
    await Post.find()
    .populate('author',["username"])
    .sort({createdAt:-1})
    .limit(20)
    );
 });
 app.get('/post/:id',async(req,res)=>{
    const {id}=req.params;
     const postDoc= await Post.findById(id).populate('author',['username']);
     res.json(postDoc);
 })



 const PORT=5001
app.listen(PORT,(req,res)=>{
    console.log(`server started ${PORT} `);

});
//