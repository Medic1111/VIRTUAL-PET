import axios from "axios";
import { useEffect, useState } from "react";
import Home from "./components/Home/Home";

const defaultCurrentUser = {
  user: {},
  token: "",
};

function App() {
  const [currentUser, setCurrentUser] = useState(defaultCurrentUser);
  const [isAuth, setIsAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const isTokenExp = async () => {
      const storedData = localStorage.getItem("userValidation");

      if (typeof storedData === "string") {
        const parse = JSON.parse(storedData);

        if (parse && new Date(parse.expiration) > new Date()) {
          await axios
            .get(`/api/v1/${parse.username}/validate`, {
              headers: { authorization: parse.token },
            })
            .then((serverRes) => {
              setCurrentUser({
                user: serverRes.data.pet,
                token: parse.token,
              });
              return setIsAuth(true);
            })
            .catch((err) => console.log(err));
        }
        return;
      }
      return setIsAuth(false);
    };
    isTokenExp();
  }, [, isLogin]);

  return (
    <div className="App">
      <Home setIsLogin={setIsLogin} />
      {isAuth && <h1>Kiwi</h1>}
    </div>
  );
}

export default App;
