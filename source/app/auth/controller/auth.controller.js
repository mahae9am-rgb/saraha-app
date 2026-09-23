import { toSeconds } from '../../../common/utilis/time.js'
import authService, { register } from  '../service/auth.service.js'
export async function createUser(req,res,next) {
    try{
const {name,email,password}= req.body
    const registration = await authService.register({name,email,password})
    res.status(201).json({
        message:"user create successfully",
        data:registration,
        success:true
    })
    }catch(error){
        next(error)
    }
}

export async function updateUser(req,res,next) {
    try{
const { email, code}= req.body
const updated = await authService.verifiyAccount(email,code)
res.status(200).json({
    message:'user updated successfully',
    data:updated,
    success:true
})


    }catch(error){
        next(error)
    }
    
}
export async function login(req,res,next) {
   try{
     const {email,password}= req.body
    const userData= await authService.login(email,password)
    res.cookie('access-token',userData,
        {httpOnly:true,maxAge:toSeconds(1,'hours')*1000})
    res.status(200).json({message:'login successfullty',success:true,data:userData})
   }catch(error){

    next(error)
   }
}


export async function sendotp(req,res,next) {
    try{
const {email}= req.body
    await authService.sendOtp(email)
    res.status(200).json({message:"otp is send, check your email",success:true})
    
    }catch(error){
        next(error)
    }
}
export default {createUser,updateUser,login,sendotp}
