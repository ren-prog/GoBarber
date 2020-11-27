import { json, Router } from "express";

import { getCustomRepository } from "typeorm";

import { parseISO } from "date-fns";

import AppointmentsRepository from "../Repositories/AppointmentRepository";

import CreateAppointmentService from "../services/CreateAppointmentService";

import Autheticated from "../middlewares/Autheticated";

const appointmentsRouter = Router();

appointmentsRouter.use(Autheticated);

appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
