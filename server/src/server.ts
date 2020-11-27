import "reflect-metadata";
import express, { response } from "express";
import routes from "./routes/index";
import uploadConfig from "./config/upload";
import "./database";

const app = express();

app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log("Rodando na porta 3333");
});
