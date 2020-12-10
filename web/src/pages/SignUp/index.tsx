import React from "react";
import { FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";

import { Container, Content, Background } from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";

const SignUp: React.FC = () => (
  <Container>
    <Background></Background>
    <Content>
      <img src={logoImg} alt="GoBarber" />
      <form action="">
        <h1>Faça seu cadastro</h1>
        <Input name="name" icon={FiUser} type="email" placeholder="Nome" />
        <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="senha"
        />
        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="login">
        <FiArrowLeft />
        Voltar
      </a>
    </Content>
  </Container>
);

export default SignUp;
