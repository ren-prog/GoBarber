import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import authConfig from "@config/auth";
import User from "../infra/typeorm/entities/User";

import AppError from "@shared/errors/AppError";

import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/hashProvider/models/IHashProvider";

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    console.log("*** Email & Password", email, password);
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    console.log("** user password", user.password);
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
