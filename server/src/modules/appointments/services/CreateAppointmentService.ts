import { inject, injectable } from "tsyringe";
import { startOfHour, isBefore, getHours, format } from "date-fns";

import Appointment from "../infra/typeorm/entities/Appointment";

import AppError from "@shared/errors/AppError";

import IAppointmentRepository from "../repositories/IAppointmentsRepository";

import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";

import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

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
    private appointmentRepository: IAppointmentRepository,

    @inject("NotificationsRepository")
    private notificationsRepository: INotificationsRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
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

    const dateFormatted = format(appointment.date, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        "yyyy-M-d"
      )}`
    );

    return appointment;
  }
}

export default CreateAppointmentService;
