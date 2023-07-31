import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import helemt from 'helmet'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { userRouter } from './Routers/user.router.js'
import { routerPorduct } from './Routers/product.router.js'
import { routerCart } from './Routers/cart.router.js'
import { routerPayment } from './Stripe/StripeRouter.js'
import crypto from 'crypto'
let app = express()
dotenv.config()
app.use(morgan('combined'))
app.use(express.json())
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline';"
  );
  next();
});
app.use(cors({origin : 'https://cart-app-ethiopia.netlify.app', credentials : true}))
app.use(helemt())
helemt.crossOriginResourcePolicy({policy : 'same-site'})
app.use(cookieParser())
mongoose.connect(process.env.MONGODB).then((res) => app.listen(process.env.PORT,() => console.log('app is running'))).catch((err) => console.error(err))
mongoose.connection.on('connected',() => console.log('mongodb connected once again!'))
mongoose.connection.on('disconnected',() => console.log('mongodb dis-connected!'))
app.use('/api/auth',userRouter)
app.use('/api/product',routerPorduct)
app.use('/api/cart',routerCart)
app.use('/api/stripe',routerPayment)
app.use((err,req,res,next) => {
    let errorMessage = err.message || 'Something went wrong!';
    let errorStatus = err.status || 500;
    res.status(errorStatus).json({error : errorMessage})
})