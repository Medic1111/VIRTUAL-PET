import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import "./Home.css";
import KiwiImg from "../../assets/imgs/kiwi1.jpg";

const Home = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  let buttonAnimation = showLoginForm ? " button-login-animation" : "";
  const handleLogin = () => {
    if (!showLoginForm) {
      setShowLoginForm(true);
    }
  };

  return (
    <div className="home--container">
      <div className="home-hero-img--wrapper">
        <img src={KiwiImg} alt="cute brown bird" class="kiwiIMG" />
      </div>
      <div className="home-hero--wrapper">
        <h1>Virtual Kiwi!</h1>
        <p class="desc">Welcome to your personal kiwi!</p>
        {showLoginForm && <LoginForm />}
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
