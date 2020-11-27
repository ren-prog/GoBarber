import { response } from "express";
import { getRepository } from "typeorm";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import User from "../models/User";

interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    const usersRepository = getRepository(User);

    console.log("*** Email & Password", email, password);
    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    console.log("** user password", user.password);
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Invalid credentials");
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
