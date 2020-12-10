import React from "react";
import { FiLogIn } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";

import { Container, Content, Background } from "./styles";

const SingIn: React.FC = () => (
  <Container>
    <Content>
      <form action="">
        <img src={logoImg} alt="GoBarber" />
        <h1>Faça seu login</h1>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="senha" />
        <button type="submit">Entrar</button>
        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="">
        <FiLogIn />
        Criar conta
      </a>
    </Content>

    <Background></Background>
  </Container>
);

export default SingIn;
