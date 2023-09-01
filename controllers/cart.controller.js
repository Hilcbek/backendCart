import Cart from '../models/cart.model.js'
import Product from '../models/product.model.js'
import asyncHandler from 'express-async-handler'
export let AddToCart = asyncHandler(async (req,res,next) => {
    try {
        let { id } = req.params
        let { amount } = req.body;
        let ItemProduct = await Product.findById(id);
        let IsUserHasCart = await Cart.findOne({user_id : req.user.id}).populate('cartProduct');
        if(IsUserHasCart){
            if(ItemProduct){
                let prodIndex = IsUserHasCart.cartProduct.findIndex((item) => String(item._id) === id)
                    if(prodIndex !== -1){
                        IsUserHasCart.cartProduct[prodIndex].itemAmount += amount;
                        IsUserHasCart.save()
                         IsUserHasCart = await Cart.find({user_id : req.user.id}).populate('cartProduct')
                    }else{
                        await Cart.findOneAndUpdate({user_id : req.user.id},{
                                $push : {
                                    cartProduct : ItemProduct
                                }
                            })
                     IsUserHasCart = await Cart.find({user_id : req.user.id}).populate('cartProduct')
                    }
                }
        }else{
             if(ItemProduct){
                await Cart.create({
                    cartProduct : ItemProduct,
                    user_id : req.user.id
                });
                IsUserHasCart = await Cart.find({user_id : req.user.id}).populate('cartProduct')
            }
        }
        let Arrays = IsUserHasCart[0].cartProduct.map((item) => { return item.price })
        let Total = Arrays.reduce((acc,cur) => {return acc + cur })
        IsUserHasCart =  await Cart.findOneAndUpdate({user_id : req.user.id},{$set : { Total : Total}});
        res.status(200).json({data : IsUserHasCart})
    } catch (error) {
        next(error)
    }
})
export let cartToUser = asyncHandler(async (req,res,next) => {
    try {
        let UserCart = (await Cart.find({user_id : req.user.id}).populate('cartProduct'))
        res.status(200).json(UserCart)
    } catch (error) {
        next(error)
    }
})
export let RemoveItemFromCart = asyncHandler(async (req,res,next) => {
    try {
        let { id } = req.params
        let IsUserHasCart = await Cart.findOne({user_id : req.user.id}).populate('cartProduct');
        let Itemprice = IsUserHasCart.cartProduct[id].price
        let Total = await Cart.findOne({user_id : req.user.id});
        Total = Total.Total - Itemprice
        await Cart.findOneAndUpdate({user_id : req.user.id}, {Total : Total})
        let CurrentCart = await Cart.findOne({user_id : req.user.id});
        CurrentCart.cartProduct.splice(id, 1);
        CurrentCart.save()
        res.status(200).json({data : 'Item Removed Successfully!'})
    } catch (error) {
        next(error)
    }
})
export let RemoveAllCartFromUser = asyncHandler(async (req,res,next) => {
    try {
        await Cart.findOneAndDelete({user_id : req.user.id});
        res.status(200).json({ data : 'User Cart user Cleaned!'})
    } catch (error) {
        
    }
})
export let AllCart = asyncHandler(async (req,res,next) => {
    try {
        let AllCartData = await Cart.find({}).sort({createdAt : -1 }).populate('cartProduct')
        res.status(200).json({data : AllCartData})
    } catch (error) {
        next(error)
    }
})