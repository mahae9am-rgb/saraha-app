import { OTP } from "../model/otp.model.js";


export async function createOTP(otpData) {
    return await OTP.findOneAndUpdate({email:otpData.email},
        otpData,
        {upsert:true,new:true})
    
}
export async function getOtpByEmail(email) {
    return await OTP.findOne({email})
    
}
export async function deleteOTP(email) {
    return await OTP.deleteMany({email})   
}

export default {createOTP,getOtpByEmail,deleteOTP}