const router = require('express').Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//REGISTER
router.post("/register",async(req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
    try { 
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

// router.get("/register",async(req,res)=>{
//     const newUser = new User({
//         username:"BaoKhang",
//         email:"Khang@gmail.com",
//         password:CryptoJS.AES.encrypt("123456", process.env.SECRET_KEY).toString(),
//     });
//     try { 
//         const user = await newUser.save();
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })


//LOGIN
router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        !user && res.status(401).json("Wrong username or password");

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json("Wrong username or password");
        const accessToken = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.SECRET_KEY,{expiresIn:"5d"})
        const {password,...info} = user._doc;
        res.status(200).json({...info,accessToken});
    } catch (err) {
        console.log(err);
    }
})

router.get("/login",async(req,res)=>{
    try {
        const user = await User.findById("66862c3f6f29b9f3c1197079")
        !user && res.status(401).json("Wrong username or password");

        const bytes  = CryptoJS.AES.decrypt("U2FsdGVkX18PGmmczXJHtNM7R/vZj0R2vaUe7w8QJFI=", process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== "123456" && res.status(401).json("Wrong username or password");
        const accessToken = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.SECRET_KEY,{expiresIn:"5d"})
        const {password,...info} = user._doc;
        res.status(200).json({...info,accessToken});
    } catch (err) {
        console.log(err);
    }
})
module.exports = router; 