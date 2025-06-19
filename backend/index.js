const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./model/userschema.js');
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const passwordrouter = require('./controllers/passwordcontroller.js')
const cors = require('cors');
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;


const app = express();
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/password-manager').then(()=>{
    console.log('mongodb connected')
}).catch((error)=>{
    console.log(error)
})
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true  // This allows cookies to be sent cross-domain
  }));


app.post('/register',async (req,res)=>{
    const {username , email , password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"all feilds are required"
        })
    }

    const hashedPassword = md5(password);

    try {
        const existinguser = await User.findOne({email});
    if(existinguser){
        return res.status(400).json({
            message:"user already exist"
        })
    }

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })

    await newUser.save();

    res.status(201).json({
        message:"User registered successfully",
        user:newUser
    })
    } catch (error) {
        res.status(500).json({
            message:"Server error",
            error:error
        })
    }

})

app.post('/login',async (req,res)=>{
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    try {
        const user = await User.findOne({email});
        if(!user || user.password !== md5(password)){
            return res.status(401).json({
                message:"Invalid Credentials"
            })
        }

        const token = jwt.sign(
            {userId: user._id},
            SECRET_KEY,
            {expiresIn:"1hr"}
            
        )

        res.status(200).json({
            message:"User logged in successfully",
            user:user,
            token:token
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Server error",error
        })
    }
})

app.get('/dashboard',verifyToken,(req,res)=>{
    res.json({
        message:"Welcome to the Dashboard"
    })
})

function verifyToken(req,res,next){
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({
            message: "No token provided",
        });
    }

    // Extract token after "Bearer "
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({
            message: "Invalid token format",
        });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        req.userId = decoded.userId;
        next();
    });

}


app.use('/api',passwordrouter);



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})




