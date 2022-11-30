import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import KiwiImg from "../../assets/imgs/kiwi1.jpg";
import axios from "axios";
import { storeToken } from "../../utils/utils";
import {
  Container,
  Header,
  ImageWrapper,
  HomeHeroContainer,
  ButtonWrapper,
  ButtonBase,
  ButtonInverted,
} from "./Home.styles";

const loginDefaultForm = {
  username: "",
  password: "",
};

const registerDefaultForm = {
  username: "",
  password: "",
  email: "",
};

const Home = ({ setIsAuth, setCurrentUser }) => {
  const [loginFormData, setLoginFormData] = useState(loginDefaultForm);
  const [registerFormData, setRegisterFormData] = useState(registerDefaultForm);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (parameter, data) => {
    await axios
      .post(`/api/v1/${parameter}`, data)
      .then((serverRes) => {
        setCurrentUser(serverRes.data);
        storeToken(serverRes);
        setIsAuth(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });
  };

  const handleLogin = () => {
    if (!showLoginForm) {
      setShowLoginForm(true);
      return;
    }
    handleSubmit("login", loginFormData);
  };

  const handleRegister = () => {
    if (!showRegisterForm) {
      setShowRegisterForm(true);
      return;
    }
    handleSubmit("register", registerFormData);
  };

  const handleBackButton = () => {
    if (showLoginForm) {
      setErrorMessage("");
      setShowLoginForm(false);
      return;
    }
    setErrorMessage("");
    setShowRegisterForm(false);
  };

  const showBackButton = showLoginForm !== showRegisterForm;

  return (
    <Container>
      <ImageWrapper>
        <img src={KiwiImg} alt="cute brown bird" />
      </ImageWrapper>
      <HomeHeroContainer>
        <Header>
          <h1>Virtual Kiwi!</h1>
          <p>Welcome to your personal kiwi!</p>
        </Header>
        {showLoginForm && (
          <LoginForm
            loginFormData={loginFormData}
            setLoginFormData={setLoginFormData}
          />
        )}
        {showRegisterForm && (
          <RegisterForm
            registerFormData={registerFormData}
            setRegisterFormData={setRegisterFormData}
          />
        )}
        <ButtonWrapper
          showLoginForm={showLoginForm}
          showRegisterForm={showRegisterForm}
        >
          {errorMessage && <p>{errorMessage}</p>}
          {!showRegisterForm && (
            <ButtonBase onClick={handleLogin}>Login</ButtonBase>
          )}
          {showBackButton && (
            <ButtonInverted onClick={handleBackButton}>Back</ButtonInverted>
          )}
          {!showLoginForm && (
            <ButtonInverted onClick={handleRegister}>Register</ButtonInverted>
          )}
        </ButtonWrapper>
      </HomeHeroContainer>
    </Container>
  );
};

export default Home;
