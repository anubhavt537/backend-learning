
import dotenv from 'dotenv'
// import mongoose from 'mongoose';
//   import {DB_NAME} from './constants'
//   import express from 'express'
  import connectDB from './db/index.js';

  dotenv.config({
    path:'./env'
  })
   
  connectDB()
  .then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port ${process.env.PORT}`)
    })
  })
  .catch((err)=>{
    console.error("MONgodb connection failed",err)
  })
  














  /*
  APPROACH 1
  const app=express()
( async()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.error("ERROR IN EXPRESS" ,error)
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR",error)
        throw error;
    }
})()
*/