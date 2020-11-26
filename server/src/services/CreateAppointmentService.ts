import { startOfHour } from "date-fns";

import { getCustomRepository } from "typeorm";
import Appointment from "../models/Appointment";
import AppointmentRepository from "../Repositories/AppointmentRepository";
import appointmentsRouter from "../routes/appointments.routes";

/** Correção
 * [x] Recebimento das informações
 * [x] Trativa de erros
 * [x] Acesso ao repositorio
 */

interface RequestDTO {
  provider: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new Error("This appointment is already booked");
    }

    const appointment = appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
