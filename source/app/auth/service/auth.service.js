import * as authRepository from '../repository/auth.repository.js'
import * as authOTP from '../repository/auth.otp.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendEmail } from '../../../common/email/nodemailer.js'
import userRepository from '../../user/repository/user.repository.js'
import { OTP } from '../model/otp.model.js'
import JWT from 'jsonwebtoken'
import otpjs, { generateOTPCode } from '../../../common/otp.js'
import { toMs, toSeconds } from '../../../common/utilis/time.js'


export async function register(userData) {
   const userExist = await authRepository.checkUserExistByEmail(userData.email)
   if(userExist){throw new Error('user already exist')}

userData.password =  await bcrypt.hash(userData.password,10)
const createUser = await authRepository.createUser(userData)
const otp =  await generateOTPCode()
console.log("toSeconds result:", toSeconds(1, 'hours'))

const savedOtp = await authOTP.createOTP({
    code: otp,
    email: userData.email,
    expiresAt: new Date(Date.now() + toSeconds(1, 'hours') * 1000)
})
console.log("SAVED OTP DOCUMENT:", savedOtp)
try{
await sendEmail({
   to: userData.email,
    subject:'verification code',
    html: `<h1>you verification code is ${otp}</h1>`
})
}catch(error){
    console.log('email failed,otp is :',otp);
    
}
return createUser
}




export async function verifiyAccount(email,code) {
    const userExist = await authRepository.checkUserExistByEmail(email)
    if(!userExist){throw new Error ('user not found')}
    if(userExist.isVerified===true){throw new Error ('user already verified')}
    const otp = await authOTP.getOtpByEmail(email)
    if(!otp){throw new Error('otp expires , please resend otp')}
    if(otp.code!==code){throw new Error ('invalid otp')}
    const updateUser = await userRepository.updateUserByEmail(email,{isVerified:true})
    await authOTP.deleteOTP(email)
    return updateUser
}

export async function login(email,password) {
    const user = await authRepository.checkUserExistByEmail(email)
if(!user){throw new Error('user not found')}
if(user.isVerified===false){throw new Error('isVerified not found')} 

const match = await bcrypt.compare(password,user.password) 

if(!match){throw new Error('password not exist into db')} 
const token = JWT.sign({id:user.id,name:user.name,email:user.email},
    process.env.JWT_SECRET,
    {expiresIn:toSeconds(1,'hours')}
)
return token
}


export async function sendOtp(email) {
    const user = await authRepository.checkUserExistByEmail(email)
    if(!user){throw new Error('user not found')}
     await authOTP.deleteOTP(email) 
       const code =  await generateOTPCode()

       await sendEmail({
       to: email,
        subject:'new otp',
        html:`<p>your new otp is ${code}</p>`})

       await authOTP.createOTP({
        code:code,
        email:email,
        expiresAt:new Date(Date.now()+toSeconds(5,'min')*1000)
       })
}
export default {register,verifiyAccount,login,sendOtp}