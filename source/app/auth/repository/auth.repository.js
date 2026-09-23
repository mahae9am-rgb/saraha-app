import { User } from "../../user/model/user.model.js";
import { OTP } from "../model/otp.model.js";
export async function checkUserExistByEmail(email) {
    return await User.findOne({email:email})
    
}
export async function createUser(userData) {
    return await User.create(userData)
    
}
export async function getUserByEmail(email) {
    return await User.findOne({email:email})
    
}