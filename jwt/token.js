import jwt from 'jsonwebtoken'
import {ErrorSettler} from '../Error/Error.js'
export let verifyIsUserLoggedIn = (req,res,next) => {
    try {
        let authHeaders = req.headers.token;
        if(!authHeaders) return next(ErrorSettler(500, 'please login first'))
        let token = authHeaders.split(" ")[1]
        jwt.verify(token,process.env.JWT,(err,payload) => {
            if(err) return next(ErrorSettler(500, 'token expired!'))
            req.user = payload;
            next()
        })
    } catch (error) {
        next(error)
    }
}
export let verifyisUserAdmin = async (req,res,next) => {
    try {
        verifyIsUserLoggedIn(req,res,() => {
            if(!req.user.isAdmin) return next(ErrorSettler(500, 'Admin privilage only!'))
            next()
        })
    } catch (error) {
        next(error)
    }
}