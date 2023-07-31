import Stripe from "stripe";
import { ErrorSettler } from "../Error/Error.js";
import dotenv from 'dotenv'
dotenv.config()
let StripeKey = new Stripe(process.env.Stripe_Key)
export let Payment = async (req,res,next) => {
    StripeKey.charges.create({
        source : req.body.tokenId,
        amount : req.body.amount,
        currency : "usd"
    },
    (stripeErr,stripeRes) => {
        if(stripeErr) return next(ErrorSettler(500, stripeErr))
        else{
            res.status(200).json({data : stripeRes})
        }
    })
}