import mongoose ,{Schema} from "mongoose";
import jwt from "json-web-token";
import bcrypt from "bcrypt";
const userSchema=new Schema({
userName:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
},
fullname:{
    type:String,
    required:true,
    lowercase:true,
    trim:true,
    index:true
},
avatar:{
    type:String, // cloudinary url ,aws type service
    required:true
},
coverImage:{
    type:String,
    
},
password:{
    type:String,
    required:true
    
},
watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:"video"
    }
],
refreshTokens:{
    type:String
}

},{timestamps:true})

//Encode
userSchema.pre("save", async function(next){
if( ! this.isModified("password")) return next();

this.password= await bcrypt.hash(this.password,10);
})

// Decode 
userSchema.methods.isPasswordCorrect=async function(){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    jwt.sign(
        {
            _id:this.id,
            email:this.email,
            userName:this.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}
userSchema.methods.generateRefershToken=function(){
    jwt.sign(
        {
            _id:this.id,
            email:this.email,
            userName:this.userName,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFERSH_TOKEN_EXPIRE
        }
    )
}

export  const User=mongoose.model("User",userSchema)