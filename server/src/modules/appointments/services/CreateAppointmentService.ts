import { inject, injectable } from "tsyringe";
import { startOfHour, isBefore, getHours } from "date-fns";

import Appointment from "../infra/typeorm/entities/Appointment";

import AppError from "@shared/errors/AppError";

import IAppointmentRepository from "../repositories/IAppointmentsRepository";

/** Correção
 * [x] Recebimento das informações
 * [x] Trativa de erros
 * [x] Acesso ao repositorio
 */

interface IRequest {
  provider_id: string;
  date: Date;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentRepository: IAppointmentRepository
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You can only create appontments between 8am and 5pm."
      );
    }

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
