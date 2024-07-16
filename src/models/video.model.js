import mongoose,{Schema} from "mongoose";


const videoSchema=new Schema({
videofile:{
type:String,
required:true

},

thumbnail:{
    type:String,
    reqired:true
    
    },

    owner:{
        type:Schema.Types.ObjectId,
        ref:"user"
        
        },

        title:{
            type:String,
            reqired:true
            
            },

            description:{
                type:String,
                reqired:true
                
                },
                duration:{
                    type:Number, //cloundinary
                    reqired:true
                    
                    },
                    views:{
                        type:Number, 
                        default:0,
                        
                        
                        },
                        isPublished:{
                            type:Boolean,
                            default:true
                            
                            },



    

},{timestamps:true})

export const Video=mongoose.model("Video",videoSchema)