import express from "express";
import TokenizationController from "../controller/tokenization";
import { CreditCardValidation, TokenValidation } from "../utils/validation";

const Routes = (app: express.Express): express.Express => {
  app.get("/health", TokenizationController.health);
  app.post("/v1/tokens", CreditCardValidation, TokenizationController.getToken);
  app.post("/v1/charges", TokenValidation, TokenizationController.getCreditCard);

  return app;
};

export default Routes;
