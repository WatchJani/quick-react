// import logo from './logo.svg';
// import './App.css';

import { useEffect, useState } from "react";
import { Something } from "./component";
import axios from "axios";
{/* <Router>
      <nav>
        <a href="/">Home</a> | <a href="/about">About</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router> */}

export const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1") // API URL
      .then(response => {
        setData(response.data);  // Postavljamo podatke u state
        setLoading(false);        // Gasimo indikator učitavanja
      })
      .catch(err => {
        setError(err.message);    // Ako dođe do greške, postavljamo je
        setLoading(false);
      });
  }, []);

  const [script, setScript] = useState([{ name: "happy" }]); // Ispravljen naziv state-a i setter funkcije

  const doSomething = () => {
    setScript(prevState => ([
      ...prevState,
      { name: "ad" }
    ]));
  };

  return (
    <div>
      {script.map(data => (
        <>
          <div>{data.name}</div>
          <Something data={data}></Something>
        </>
      ))}
      <p>f{script[0].name}</p>
      <button onClick={doSomething}>Click me</button>
    </div>
  );
}

// export default App;
