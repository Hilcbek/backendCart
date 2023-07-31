import express from 'express'
import { Add, AllProducts } from '../controllers/products.controller.js';
import { verifyIsUserLoggedIn } from '../jwt/token.js';
export let routerPorduct = express.Router();
routerPorduct.post('/add',/**verifyIsUserLoggedIn */ Add)
routerPorduct.get('/',/**verifyIsUserLoggedIn */ AllProducts)