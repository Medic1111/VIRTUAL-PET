import styled from "styled-components";
import { ButtonBase } from "../Home/Home.styles";

export const MainContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  transform: translateX(-6.4rem);
  gap: 1rem;
  @media (max-width: 800px) {
    transform: translate(0%, -10%);
  }
  @media (max-width: 700px) {
    transform: translate(-10%, -10%);
  }
`;

export const SpeechBubbleContainer = styled.div`
  position: absolute;
  z-index: 999;
  font-weight: 800;
  color: black;
  transform: translate(20%, 10%);
  img {
    width: 60rem;
    height: 40rem;
  }
  p {
    position: absolute;
    font-size: 2rem;
    text-align: center;
    width: 25rem;
    top: 7.5rem;
    transform: translateX(25%);
  }
  @media (max-width: 800px) {
    rotate: 180deg;
    transform: translate(15%, 20%);
    img {
      transform: translate(20%, 80%);
      width: 50rem;
      height: calc(100rem / 3);
      scale: 0.7;
    }
    p {
      width: 10rem;
      right: 50%;
      rotate: 180deg;
      z-index: 99;
      transform: translate(-60%, -325%);
    }
  }
  @media (max-width: 700px) {
    img {
      transform: translate(20%, 100%);
      width: 40rem;
      height: calc(80rem / 3);
    }

    p {
      transform: translate(-60%, -285%);
    }
  }
`;

export const PetContainer = styled.div`
  min-width: 40vh;
  min-height: 40vh;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border-color: #604623;
  img {
    width: 25rem;
    height: 30rem;
  }
  @media (max-width: 700px) {
    min-width: 30vh;
    min-height: 30vh;
  }
`;

export const PetActionsContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export const PetActionButton = styled(ButtonBase)`
  background-color: #604623;
  min-width: 8vw;
  min-height: 3vh;
  font-size: 1.7rem;
`;

export const StatsContainer = styled.div`
  position: absolute;
  right: 0;
  transform: translateX(125%);
  div p {
    margin-bottom: 1rem;
    font-size: 1.6rem;
    font-weight: 800;
  }
  @media (max-width: 600px) {
    transform: translateX(80%);
  }
`;
