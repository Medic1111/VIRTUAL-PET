import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import "./Home.css";
import KiwiImg from "../../assets/imgs/kiwi1.jpg";
import axios from "axios";
import { storeToken } from "../../utils/utils";

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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Home;
