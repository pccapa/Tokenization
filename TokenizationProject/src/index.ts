import express from "express";
import * as dotenv from "dotenv";
import Routes from "./routes/route";
import HeaderValidation from "./utils/middleware";

dotenv.config();
let app = express();
const port = process.env.PORT_API;
const url = process.env.URL_API;

app.use(express.json());
app.use(HeaderValidation);
app = Routes(app);

app.listen(port, () => {
  console.log(`Running at ${url}:${port}`);
});

module.exports = app;
