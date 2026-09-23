import mongoose,{ Schema } from "mongoose";
const otpSchema = new Schema({
    code:{
        type:String,
        length:6,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    expiresAt:{
        type:Date,
        index:{expires:0}
    }
},

    {
        timestamps:{
            createdAt:true,
            updatedAt:false
        }
    

})
export const OTP= mongoose.model('OTP',otpSchema)