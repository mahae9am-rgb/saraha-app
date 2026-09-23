import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema({
    content:{
        type:String,
        minlength:1,
        maxlength:600,
        trim:true
    },
    reciever:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
  {  
        timestamps:{
            createdAt:true,
            updatedAt:true
        }
    

})
export const Message = mongoose.model('Message',messageSchema)