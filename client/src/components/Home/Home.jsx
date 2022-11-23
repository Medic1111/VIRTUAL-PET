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
  const handleLoginSubmit = async () => {
    await axios
      .post("/api/v1/login", loginFormData)
      .then((serverRes) => console.log(serverRes))
      .catch((error) => console.log(error));
  };

  const handleLogin = () => {
    if (!showLoginForm) {
      setShowLoginForm(true);
    }
    handleLoginSubmit();
  };

  let buttonAnimation = showLoginForm ? " button-login-animation" : "";

  return (
    <div className="home--container">
      <div className="home-hero-img--wrapper">
        <img src={KiwiImg} alt="cute brown bird" class="kiwiIMG" />
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
          <button className="button button-base" onClick={handleLogin}>
            Login
          </button>
          {showLoginForm && (
            <button
              className="button button-inverted"
              onClick={() => setShowLoginForm(false)}
            >
              Back
            </button>
          )}
          {!showLoginForm && (
            <button className="button button-inverted">Register</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
