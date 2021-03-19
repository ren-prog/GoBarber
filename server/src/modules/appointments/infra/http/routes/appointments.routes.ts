import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

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

appointmentsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  apointmentsController.create
);
appointmentsRouter.get("/me", providerAppointmentsController.index);

export default appointmentsRouter;
