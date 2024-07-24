import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const regsiterUser=asyncHandler(async(req,res)=>{


// getting req from user email etc 
const {fullName,email,password,username}=req.body
// console.log("email:" ,email)

// if (fullName==="") {
//     throw new ApiError(400,"full name is reqired")
// }
  

// if user is filling all the detail or not 
if ([fullName,email,password,username].some((field)=>
    field?.trim()===""
)) {
    throw new ApiError(400,"all fields are reqired")
}


// user already exited with username or email

const userExisted= await User.findOne({
    $or:[{email},{username}]
})
if (userExisted) {
    throw new ApiError(409,"user already existed")
}


// checking  avatar 
const avatarLocalPath=req.files?.avatar[0]?.path
// const coverImgLocalPath=req.files?.coverImage[0]?.path
let coverImgLocalPath
if(req.files && Array.isArray(req.files.coverimg)&& req.files.coverimg.lenght>0 ){
    coverImgLocalPath=req.files.coverimg[0].path
}

if(!avatarLocalPath){
    throw new ApiError(400,"please select avatar image")
}

// uploading cover image on cloudinary
const avatar =await uploadOnCloudinary(avatarLocalPath);
if(!coverImgLocalPath){throw new ApiError(400,"avatar no uploaded")}

const coverimg= uploadOnCloudinary(coverImgLocalPath) ;
  


// sending to database or creating db
const user=awaitUser.create({
    fullName,
    avatar:avatar.url,
    coverimg:coverimg?.url || "",
   email,
   password,
   username:username.toLowerCase()
})
// removing password from the password for ssecurity reasons 
const createdUser= await user.findById(user._id).select(
    " -password -refresh_token"
)
if(!createdUser){
    throw new ApiError(500,"something went wrong while registring user")
}

// sending response 
return res.status(201).json(
    new ApiResponse(200,createdUser,"created user succesfully")
)

})







export {regsiterUser}