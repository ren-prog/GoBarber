import express, { response } from "express";
import routes from "./routes/index";

import "./database";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("Rodando na porta 3333");
});
