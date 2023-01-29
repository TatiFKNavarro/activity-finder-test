import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Credits from '../components/Credits';

type Activity = {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  link: string;
  key: string;
}

function Results() {
  const location = useLocation();
  const [state, setState] = useState<Activity>();

  useEffect(() => {
    const state = location.state;
    setState(state);

  }, [location])
  

  return (
    <div className="App">
      <h1>Activity found!</h1>
      <div style={{ marginBottom: 10 }}>You should... {state?.activity}</div>
      <div style={{ marginBottom: 10 }}>Activity type: {state?.type}</div>
      <div style={{ marginBottom: 10 }}>Amount of participants: {state?.participants}</div>
      <a href='/'>Search again</a>
      <Credits />
    </div>
  )
}

export default Results