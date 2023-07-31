import { ErrorSettler } from "../Error/Error.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export let Register = async (req,res,next) => {
    try {
        let genSalt = await bcrypt.genSalt(10)
        let {username ,email, password} = req.body;
        if(!username || !email || !password) return next(ErrorSettler(500,'all credentials are required!'))
        let Username = await User.findOne({username : username});
        if(Username) return next(ErrorSettler(500,`this ${username} already is taken!`))
        let Email = await User.findOne({email : email});
        if (Email) return next(ErrorSettler(500,`Account with this ${email} already exist!`))
        let NewUser = await User.create({
            ...req.body,
            password : await bcrypt.hash(password,genSalt)
        });
        res.status(200).json({data : NewUser})
    } catch (error) {
        next(error)
    }
}
export let UpdateProfile = async (req,res,next) => {
    try {
        let { id } = req.params;
        let UpdatedUserProfile = await User.findByIdAndUpdate(id,{
            $set : {
                profile : req.body.profile
            }
        })
        res.status(200).json({ data : UpdatedUserProfile })
    } catch (error) {
        next(error)
    }
}
export let Login = async (req,res,next) => {
    try {
        let {useEmail,password} = req.body;
        if(!useEmail || !password) return next(ErrorSettler(500,'all credintails are required!'))
        let Username = await User.find({ $or : [ {username : useEmail}, {email : useEmail} ]})
        if(!Username[0]) {
            return next(ErrorSettler(500,'wrong email address or username!'))
        }
        let Password = await bcrypt.compare(password,Username[0].password);
        if (!Password) return next(ErrorSettler(500,'wrong username or password'));
        let token = jwt.sign({id : Username[0]._id},process.env.JWT,{expiresIn : '2d'});
        res.cookie('token',token,{ HttpOnly : true}).status(200).json({data : Username})
    } catch (error) {
        next(error)
    }
}