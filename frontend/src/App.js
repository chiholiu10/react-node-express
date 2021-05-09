import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export const App = () => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const headers = { "accepts": "application/json" };

    try {
      const getData = async () => {
        const result = await axios.get('http://localhost:5000/data', headers);
        console.log(JSON.parse(result));
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const postReview = async value => {
    const headers = { "Content-Type": "application/json" };
    let data = {
      name: value
    };
    try {
      const getData = async () => {
        const result = await axios.post('http://localhost:5000/songs', data, headers);
        console.log(result.data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const submitReview = () => {
    postReview(inputValue);
  };

  return (
    <div className="App">
      <input
        placeholder="Place review"
        onChange={e => setInputValue(e.target.value)}
      />
      <button onClick={() => submitReview()}>Send</button>
    </div>
  );
};

export default App;
