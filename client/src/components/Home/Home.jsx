import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import "./Home.css";
import KiwiImg from "../../assets/imgs/kiwi1.jpg";
import axios from "axios";

// registration {email, username, password}
// .post("/api/v1/register", data) for register

const loginDefaultForm = {
  username: "",
  password: "",
};
const Home = () => {
  const [loginFormData, setloginFormData] = useState(loginDefaultForm);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const showBackButton = showLoginForm !== showRegisterForm;

  const handleLoginSubmit = async () => {
    await axios
      .post("/api/v1/login", loginFormData)
      .then((serverRes) => console.log(serverRes))
      .catch((error) => console.log(error));
  };

  const handleLogin = () => {
    if (!showLoginForm) {
      setShowLoginForm(true);
      return;
    }
    handleLoginSubmit();
  };

  const handleRegister = () => {
    if (!showRegisterForm) {
      setShowRegisterForm(true);
      return;
    }
    // handleRegisterSubmit();
  };

  const handleBackButton = () => {
    if (showLoginForm) {
      setShowLoginForm(false);
      return;
    }
    setShowRegisterForm(false);
  };

  let buttonAnimation = showLoginForm ? " button-login-animation" : "";

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
            setloginFormData={setloginFormData}
          />
        )}
        <div className={"home-button--wrapper" + buttonAnimation}>
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
