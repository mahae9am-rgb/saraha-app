import { Router } from "express"
import authController from './controller/auth.controller.js'
const authRouter = Router()

authRouter.post('/register',authController.createUser)
authRouter.patch('/verifiy-account',authController.updateUser)
authRouter.post('/login',authController.login)
authRouter.post('/send-otp',authController.sendotp)
export default authRouter
