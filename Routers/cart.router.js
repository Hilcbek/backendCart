import express from 'express'
import { AddToCart, AllCart, RemoveAllCartFromUser, RemoveItemFromCart, cartToUser } from '../controllers/cart.controller.js';
import { verifyIsUserLoggedIn } from '../jwt/token.js';
export let routerCart = express.Router();
routerCart.post('/addtocart/:id',verifyIsUserLoggedIn ,AddToCart)
routerCart.get('/loggedusercart', verifyIsUserLoggedIn, cartToUser)
routerCart.delete('/removecart/:id',verifyIsUserLoggedIn ,RemoveItemFromCart)
routerCart.get('/',verifyIsUserLoggedIn, AllCart)
routerCart.delete('/', verifyIsUserLoggedIn, RemoveAllCartFromUser);
