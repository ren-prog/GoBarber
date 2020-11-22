import { json, Router } from "express";

import { parseISO } from "date-fns";

import AppointmentsRepository from "../Repositories/AppointmentRepository";

import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

// interface Appointment {
//   id: string;
//   provider: string;
//   date: Date;
// }

appointmentsRouter.get("/", (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.get("/", (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
