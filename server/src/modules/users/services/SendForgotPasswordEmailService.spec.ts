// import { AppError } from '@shared/errors/AppError';

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import SendForgotEmailService from "./SendForgotPasswordEmailService";

describe("SendForgotPassaword", () => {
  it("should be able to recover the password using the eamil", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    const sendForgotPasswordEmail = new SendForgotEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    await fakeUsersRepository.create({
      name: "John",
      email: "john@example.com",
      password: "123456",
    });

    await sendForgotPasswordEmail.execute({
      email: "john@example.com",
    });

    // expect(user).toHaveProperty('id')

    expect(sendMail).toHaveBeenCalled();
  });
});
