import axios from 'axios';
import { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import Main from './components/Main/Main';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const isTokenExp = async () => {
      const storedData = localStorage.getItem('userValidation');

      if (typeof storedData === 'string') {
        const parse = JSON.parse(storedData);

        if (parse && new Date(parse.expiration) > new Date()) {
          await axios
            .get(`/api/v1/${parse.username}/validate`, {
              headers: { authorization: parse.token },
            })
            .then((serverRes) => {
              setCurrentUser(serverRes.data);
              return setIsAuth(true);
            })
            .catch((err) => {
              console.log(err);
              return setIsAuth(false);
            });
        }
      }
    };
    isTokenExp();
  }, [, isLogin]);

  return (
    <div className="App">
      {isAuth ? (
        <Main currentUser={currentUser} />
      ) : (
        <Home
          setIsLogin={setIsLogin}
          setIsAuth={setIsAuth}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
}

export default App;
