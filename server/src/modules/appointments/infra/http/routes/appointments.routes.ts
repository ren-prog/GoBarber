import { Router } from "express";

import Authenticated from "@modules/users/infra/http/middlewares/Authenticated";
import AppointmentsController from "../controllers/AppointmentsController";
import ProviderAppointmentsController from "../controllers/ProviderAppointmentsController";

const appointmentsRouter = Router();
const apointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(Authenticated);

// appointmentsRouter.get("/", async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post("/", apointmentsController.create);
appointmentsRouter.get("/me", providerAppointmentsController.index);

export default appointmentsRouter;
