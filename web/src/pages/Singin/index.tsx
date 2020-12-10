import React from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";

import { Container, Content, Background } from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";

const SingIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />
      <form action="">
        <h1>Faça seu login</h1>
        <Input name="email" icon={FiMail} type="email" placeholder="email" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="senha"
        />
        <Button type="submit">Entrar</Button>
        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="login">
        <FiLogIn />
        Criar conta
      </a>
    </Content>

    <Background></Background>
  </Container>
);

export default SingIn;
