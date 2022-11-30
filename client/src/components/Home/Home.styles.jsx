import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-bottom: 10rem;
  transform: translateX(-5%);

  @media (max-width: 800px) {
    width: 40vw;
    margin: 0 auto;
    transform: translate(0%, 0%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ImageWrapper = styled.div`
  align-self: center;
  transform: translateX(10%);
  img {
    width: 60rem;
    height: 40rem;
  }

  @media (max-width: 800px) {
    transform: translateX(0%);
    img {
      width: 50rem;
      height: calc(100rem / 3);
      scale: 0.7;
    }
  }

  @media (max-width: 700px) {
    img {
      width: 40rem;
      height: calc(80rem / 3);
    }
  }
`;

export const Header = styled.div`
  width: 32rem;
  h1 {
    font-size: 7.2rem;
  }
  p {
    font-size: 2rem;
    text-align: center;
    transform: translateY(-1.5rem);
  }
`;

export const HomeHeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateX(-18%);
  gap: 1rem;

  @media (max-width: 800px) {
    transform: translate(0%, -30%);
  }
`;

const ButtonLoginAnimation = css`
  transform: translateY(17rem);
`;

const ButtonRegisterAnimation = css`
  transform: translateY(20rem);
`;

export const ButtonWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  width: 27.5rem;
  gap: 1.5rem;
  position: absolute;
  transform: translateY(10rem);
  transition: all 0.2s;
  ${({ showLoginForm }) => showLoginForm && ButtonLoginAnimation}
  ${({ showRegisterForm }) => showRegisterForm && ButtonRegisterAnimation}

  p {
    position: absolute;
    color: red;
    font-size: 1.4rem;
    top: -50%;
    right: 50%;
    transform: translate(50%, 15%);
  }
`;

export const ButtonBase = styled.button`
  width: 50%;
  padding: 0.4rem;
  font-size: 3rem;
  border-radius: 6px;
  font-weight: 700;
  transition: all 0.2s;
  font-family: "Indie Flower", cursive, sans-serif;
  &:hover,
  &:active {
    cursor: pointer;
  }
  background-color: #604623;
  border: 1px solid #604623;
  color: #fff;
  &:hover,
  &:active {
    background-color: #fff;
    color: #604623;
  }
`;

export const ButtonInverted = styled(ButtonBase)`
  background-color: #fff;
  border: 1px solid #604623;
  color: #604623;
  &:hover,
  &:active {
    background-color: #604623;
    color: #fff;
  }
`;
