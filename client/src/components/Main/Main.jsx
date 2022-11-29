import { useState, useEffect } from "react";
import "./Main.css";
import KiwiImg from "../../assets/imgs/kiwi1.png";
import Egg from "../../assets/imgs/egg-gif.gif";
import BabyKiwi from "../../assets/imgs/baby-kiwi.png";
import YoungKiwi from "../../assets/imgs/young-kiwi.png";
import AdultKiwi from "../../assets/imgs/young-kiwi.png";
import OldKiwi from "../../assets/imgs/young-kiwi.png";
import DeadKiwi from "../../assets/imgs/kiwi-dead.png";
import SpeechBubble from "../../assets/imgs/speech-bubble.svg";
import axios from "axios";
import { clearLocalStorage } from "../../utils/utils";

const Main = ({ currentUser, setCurrentUser, setIsAuth }) => {
  const { pet, username } = currentUser;
  const { full_level, happy_level, health_level, smart_level, level } = pet;

  const [feed, setFeed] = useState(full_level);
  const [play, setPlay] = useState(happy_level);
  const [study, setStudy] = useState(smart_level);
  const [health, setHealth] = useState(health_level);

  const [actionClicked, setActionClicked] = useState(false);

  const [kiwiImage, setKiwiImage] = useState("");
  const [kiwiMessage, setKiwiMessage] = useState("");
  const [kiwiIsDead, setKiwiIsDead] = useState(false);

  useEffect(() => {
    const { last_cared } = pet;
    const getDiff = (older) => {
      let reqBody = { stat: "" };
      const msDiff = Math.abs(
        new Date(older) - new Date(new Date().toISOString())
      );
      const hrsNotCared = msDiff / (60 * 60 * 1000);

      setKiwiImage(() => {
        if (hrsNotCared >= 24 || health_level <= 0) {
          setKiwiIsDead(true);
          return DeadKiwi;
        } else if (level === 0) {
          return Egg;
        } else if (level === 1) {
          return BabyKiwi;
        } else if (level === 2) {
          return YoungKiwi;
        } else if (level === 3) {
          return AdultKiwi;
        } else if (level > 3) {
          return OldKiwi;
        }
      });

      if (hrsNotCared >= 24) return;
      else if (hrsNotCared < 12 && hrsNotCared >= 6) {
        // console.log("dropping stat by a lot");
        return (reqBody.stat = 5);
      } else if (hrsNotCared < 6 && hrsNotCared >= 3) {
        // console.log("dropping stat by medium");
        return (reqBody.stat = 3);
      } else if (hrsNotCared < 3 && hrsNotCared >= 1) {
        // console.log("dropping stat by almost nothing");
        return (reqBody.stat = 1);
      } else {
        // console.log("Taking good care within the hour");
      }
      return (reqBody.stat = "");
    };

    const stat = getDiff(last_cared);
    const setDiff = async (stat) => {
      if (stat === 5 || stat === 3 || stat === 1) {
        await axios
          .patch("/api/v1/pet/drop", {
            username,
            stat,
          })
          .then((serverRes) => {
            setCurrentUser({ ...currentUser, pet: serverRes.data });
          })
          .catch((err) => console.log(err));
      }
      return;
    };
    setDiff(stat);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAction = async (parameter, state, action) => {
    if (kiwiIsDead) return;
    await axios
      .patch(`/api/v1/pet/${parameter}`, { username })
      .then((serverRes) => {
        setKiwiMessage(serverRes.data.message);
      })
      .catch((err) => console.log(err));
    action((state) => {
      if (state + 10 > 100) {
        return (state = 100);
      }
      return state + 10;
    });
    setActionClicked(true);
    setTimeout(() => setActionClicked(false), 4000);
  };

  const handleFeed = () => handleAction("feed", feed, setFeed);

  const handlePlay = () => handleAction("play", play, setPlay);

  const handleStudy = () => handleAction("study", study, setStudy);

  const handleHealth = () => handleAction("vet", health, setHealth);

  const handleLogout = () => {
    clearLocalStorage();
    setIsAuth(false);
  };

  return (
    <div className="home--container">
      <div className="home-hero-img--wrapper">
        <img src={KiwiImg} alt="cute brown bird" className="kiwiIMG" />
      </div>
      {actionClicked && (
        <div className="speech-bubble">
          <img src={SpeechBubble} alt="text-bubble" className="kiwiIMG" />
          <p className="kiwiMessage">{kiwiMessage}</p>
        </div>
      )}
      <div className="home-hero--wrapper">
        <div className="header-kiwi-box">
          <h1 className="header-kiwi">Virtual Kiwi!</h1>
          <p className="desc header-kiwi">Welcome to your personal kiwi!</p>
        </div>
        <div className="pet-box">
          <img src={kiwiImage} alt="its an egg" className="egg" />
        </div>
        <div className="stats--container">
          <div className="stats--wrapper">
            <p>Health: {health}%</p>
          </div>
          <div className="stats--wrapper">
            <p>Food: {feed}%</p>
          </div>
          <div className="stats--wrapper">
            <p>Happy: {play}%</p>
          </div>
          <div className="stats--wrapper">
            <p>Smart: {study}%</p>
          </div>
        </div>
        {!kiwiIsDead && (
          <div className="pet-actions-box">
            <button
              onClick={handleFeed}
              className="button button-base button-action btn-kiwi"
            >
              Feed
            </button>
            <button
              onClick={handleHealth}
              className="button button-base button-action btn-kiwi"
            >
              Vet
            </button>
            <button
              onClick={handlePlay}
              className="button button-base button-action btn-kiwi"
            >
              Play
            </button>
            <button
              onClick={handleStudy}
              className="button button-base button-action btn-kiwi"
            >
              Study
            </button>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="button button-base button-logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Main;
