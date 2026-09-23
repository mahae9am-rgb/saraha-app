import mongoose,{ Schema } from "mongoose";
const userSchema =new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required: function(){
            return this.provider ==='local'
        }
    },
    provider:{
        type:String,
        enum: ['local','pintrist','tiktok'],
        default:'local'
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    
    }
})
export const User = mongoose.model('User',userSchema)