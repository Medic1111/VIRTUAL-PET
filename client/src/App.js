import axios from 'axios';
import { useEffect } from 'react';
import Home from './components/Home/Home';

function App() {
  const fetchAPITest = async () => {
    await axios
      .get('/api/v1/test')
      .then((serverRes) => console.log(serverRes.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchAPITest();
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
