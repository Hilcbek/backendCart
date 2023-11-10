import express from 'express'
import { AddToCart, AllCart, RemoveAllCartFromUser, RemoveItemFromCart, cartToUser } from '../controllers/cart.controller.js';
import { verifyIsUserLoggedIn, verifyisUserAdmin } from '../jwt/token.js';
export let routerCart = express.Router();
routerCart.post('/addtocart/:id' ,AddToCart)
routerCart.get('/loggedusercart', cartToUser)
routerCart.delete('/removecart/:id' ,RemoveItemFromCart)
routerCart.get('/', AllCart)
routerCart.delete('/', RemoveAllCartFromUser);
