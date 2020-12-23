import { startOfHour } from "date-fns";

import Appointment from "../infra/typeorm/entities/Appointment";

import AppError from "@shared/errors/AppError";

import IAppointmentRepository from "../repositories/IAppointmentRepository";
/** Correção
 * [x] Recebimento das informações
 * [x] Trativa de erros
 * [x] Acesso ao repositorio
 */

interface IRequestDTO {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  constructor(private appointmentRepository: IAppointmentRepository) {}
  public async execute({
    date,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = await this.appointmentRepository.create({
      date: appointmentDate,
      provider_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
