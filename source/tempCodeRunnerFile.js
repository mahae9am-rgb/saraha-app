import express from 'express'
import mongoose from 'mongoose'
import authRoute from './app/auth/auth.route.js'
//import messageRoute from './app/message/message.route.js'
//import userRoute from './app/user/user.route.js'
import { config } from 'dotenv'
import './common/mongoose.js'
config()

const app = express()
app.use(express.json())

app.use('/auth',authRoute)