import { Router } from "express";

import Authenticated from "@modules/users/infra/http/middlewares/Authenticated";
import AppointmentsController from "../controllers/AppointmentsController";
const appointmentsRouter = Router();
const apointmentsController = new AppointmentsController();

appointmentsRouter.use(Authenticated);

// appointmentsRouter.get("/", async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post("/", apointmentsController.create);

export default appointmentsRouter;
