import { body } from "express-validator";

require('dotenv').config();

const regexEmailValidator = /^[\w-\.]+@(gmail.com|hotmail.com|yahoo.es)$/

export const CreditCardValidation = [

  body("card_number", process.env.INVALID_CREDITCARD).not().isEmpty().bail().isInt().isLuhnNumber(),

  body("cvv", process.env.INVALID_CVV).not().isEmpty().bail().isInt({ min: 100, max: 9999 }),

  body("expiration_month", process.env.INVALID_MONTH).not().isEmpty().bail().isInt({ min: 1, max: 12 }),

  body("expiration_year", process.env.INVALID_YEAR).not().isEmpty().bail().isInt({ min: 1970, max: new Date().getFullYear() + 4 }),

  body("email", process.env.INVALID_EMAIL).not().isEmpty().bail().isLength({ min: 5, max: 100 }).matches(regexEmailValidator),

];


export const TokenValidation = [
  body("token", process.env.INVALID_TOKEN).not().isEmpty().bail().isLength({ max: 16 })
];