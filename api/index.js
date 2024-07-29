const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists")
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/netflix',{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log('Connect to DB success')
})
.catch(err=>console.log(err))

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movies",movieRoute);
app.use("/api/lists",listRoute)

app.listen(8800,()=>{
    console.log("Backend server is running!");
})