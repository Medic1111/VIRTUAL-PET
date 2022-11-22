import './Home.css';
import KiwiImg from '../../assets/imgs/kiwi1.jpg';

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
          <button className="button button-normal">Login</button>
          <button className="button button-inverted">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
