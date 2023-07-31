import express from 'express'
import { Payment } from './StripeController.js';
export let routerPayment = express.Router();
routerPayment.post('/payment',Payment)