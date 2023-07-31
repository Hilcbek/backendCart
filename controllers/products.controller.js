import { ErrorSettler } from '../Error/Error.js'
import Product from '../models/product.model.js'
export let Add = async (req,res,next) => {
    try {
        let {Pname, type, desc, price} = req.body
        if (!Pname || !type || !desc || !price) return next(ErrorSettler(500,'all information are required!'))
        let ProductName = await Product.findOne({Pname : Pname})
        if (ProductName) return next(ErrorSettler(500,'Product already exist'))
        let NewProduct = await Product.create(req.body)
        res.status(200).json(NewProduct)
    } catch (error) {
        next(error)
    }
}
export let AllProducts = async (req,res,next) => {
    try {
        let AllPro = await Product.find({}).sort({ createdAt : -1 })
        res.status(200).json({data  : AllPro})
    } catch (error) {
        next(error)
    }
}