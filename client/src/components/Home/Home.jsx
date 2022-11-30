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

  let buttonLoginAnimation = showLoginForm ? " button_login_animation" : "";
  let buttonRegisterAnimation = showRegisterForm
    ? " button_register_animation"
    : "";

  return (
    <div className="home__container">
      <div className="home_img__wrapper">
        <img src={KiwiImg} alt="cute brown bird" className="kiwi_img" />
      </div>
      <div className="home_hero__container">
        <div className="hero_header">
          <h1>Virtual Kiwi!</h1>
          <p className="hero_desc">Welcome to your personal kiwi!</p>
        </div>
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
            "home_button__wrapper" +
            buttonLoginAnimation +
            buttonRegisterAnimation
          }
        >
          {errorMessage && <p className="error_message">{errorMessage}</p>}
          {!showRegisterForm && (
            <button className="button button_base" onClick={handleLogin}>
              Login
            </button>
          )}
          {showBackButton && (
            <button
              className="button button_inverted"
              onClick={handleBackButton}
            >
              Back
            </button>
          )}
          {!showLoginForm && (
            <button className="button button_inverted" onClick={handleRegister}>
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
