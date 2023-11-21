import { Request, Response } from "express";
import { validationResult } from "express-validator";
import randtoken from 'rand-token';
import { CreditCard } from '../schema/creditCard'
import { TokenCard } from '../schema/tokenCard'
import Repository from "../repository/repository";

require('dotenv').config();

class TokenizationController {
  health(req: Request, res: Response) {
    res.json({ status: "healthy" });
  }

  async getToken(req: Request, res: Response) {
    let creditCard: CreditCard = {};
    let tokenCard: TokenCard = {};
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ validation: errors.array().map(d => d.msg) });
      return;
    }
    creditCard = req.body as CreditCard;

    try {
      let creditCardResponse: CreditCard = await Repository.findCreditCard(creditCard);
      if (!creditCardResponse) {
        tokenCard.message = process.env.CREDITCAR_DOESNTEXISTS;
        res.statusCode = 403;
        res.json(tokenCard);
        return;
      }

      creditCardResponse.token = randtoken.generate(16);
      tokenCard.token = creditCardResponse.token;

      await Repository.insertCharges(creditCardResponse)
      res.json(tokenCard);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ validation: process.env.GENERAL_ERROR });
      return;
    }

  }


  async getCreditCard(req: Request, res: Response) {
    let creditCard: CreditCard = {};
    let tokenCard: TokenCard = {};
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ validation: errors.array().map(d => d.msg) });
      return;
    }


    tokenCard = req.body as TokenCard;

    try {
      creditCard = await Repository.getCharges(tokenCard);
      console.log(creditCard);
      if (!creditCard) {
        tokenCard.token = undefined;
        tokenCard.message = process.env.EXPIRED_TOKEN;
        res.json(tokenCard);
        return;
      }

      res.json(creditCard);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ validation: process.env.GENERAL_ERROR });
      return;
    }


  };



}
export default new TokenizationController();