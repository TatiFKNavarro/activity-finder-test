import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Credits from './components/Credits';

function App() {
  const navigate = useNavigate();

  const getInfo = () => {
    axios.get(`http://www.boredapi.com/api/activity`)
      .then((res) => {
        if (res.data.error)
          navigate('/something-went-wrong')
        navigate('/result', {
          state: res.data
        })
    })
    .catch(() => {
      navigate('/something-went-wrong')
    })
  }

  return (
    <div className="App">
      <h1>Activity finder</h1>
      <button onClick={getInfo}>Search!</button>
      <p>Or... <a href='/advanced'>Advanced Search</a></p>
      <Credits />
    </div>
  );
}

export default App;
