import express from 'express'
import { Login, Logout, Register, UpdateProfile } from '../controllers/user.controller.js';
export let userRouter = express.Router();
userRouter.post('/register',Register)
userRouter.put('/register/:id',UpdateProfile)
userRouter.post('/login',Login)
userRouter.post('/logout',Logout)