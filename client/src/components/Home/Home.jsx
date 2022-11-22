import "./Home.css";
import Button from "../Button/Button";
import KiwiImg from "../../assets/imgs/kiwi1.jpg";

const Home = () => {
  return (
    <div className="home--container">
      <div className="home-hero-img--wrapper">
        <img src={KiwiImg} alt="cute brown bird" class="kiwiIMG" />
      </div>
      <div className="home-hero--wrapper">
        <h1>Virtual Kiwi!</h1>
        <p class="desc">Welcome to your personal kiwi!</p>
        <div className="home-button--wrapper">
          <Button buttonType="base" text="Login" />
          <Button buttonType="inverted" text="Register" />
        </div>
      </div>
    </div>
  );
};

export default Home;
