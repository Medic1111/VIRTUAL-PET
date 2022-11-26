import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import "./Home.css";
import KiwiImg from "../../assets/imgs/kiwi1.jpg";
import axios from "axios";

const loginDefaultForm = {
  username: "",
  password: "",
};

const registerDefaultForm = {
  username: "",
  password: "",
  email: "",
};

const Home = ({ setIsLogin }) => {
  const [loginFormData, setLoginFormData] = useState(loginDefaultForm);
  const [registerFormData, setRegisterFormData] = useState(registerDefaultForm);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleSubmit = async (parameter, data) => {
    await axios
      .post("/api/v1/login", loginFormData)
      .then((serverRes) => console.log(serverRes))
      .catch((error) => console.log(error));
  };

  const handleRegisterSubmit = async () => {
    await axios
      .post("/api/v1/register", registerFormData)
      .then((serverRes) => console.log(serverRes))
      .catch((error) => console.log(error));
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
      setShowLoginForm(false);
      return;
    }
    setShowRegisterForm(false);
  };

  const showBackButton = showLoginForm !== showRegisterForm;

  let buttonLoginAnimation = showLoginForm ? " button-login-animation" : "";
  let buttonRegisterAnimation = showRegisterForm
    ? " button-register-animation"
    : "";

  return (
    <div className="home--container">
      <div className="home-hero-img--wrapper">
        <img src={KiwiImg} alt="cute brown bird" className="kiwiIMG" />
      </div>
      <div className="home-hero--wrapper">
        <h1>Virtual Kiwi!</h1>
        <p className="desc">Welcome to your personal kiwi!</p>
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
        <div
          className={
            "home-button--wrapper" +
            buttonLoginAnimation +
            buttonRegisterAnimation
          }
        >
          {!showRegisterForm && (
            <button className="button button-base" onClick={handleLogin}>
              Login
            </button>
          )}
          {showBackButton && (
            <button
              className="button button-inverted"
              onClick={handleBackButton}
            >
              Back
            </button>
          )}
          {!showLoginForm && (
            <button className="button button-inverted" onClick={handleRegister}>
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
