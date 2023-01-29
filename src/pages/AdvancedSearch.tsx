import axios from 'axios';
import React from 'react'
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Credits from '../components/Credits';

type FormData = {
  participants: number;
  accessibility: number;
}

function AdvancedSearch() {
  const { handleSubmit, register } = useForm<FormData>();
  const navigate = useNavigate();

  const getInfo = (data: FormData) => {
    axios.get(`http://www.boredapi.com/api/activity?accessibility=${data.accessibility}&participants=${data.participants}`)
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
      <form onSubmit={handleSubmit(getInfo)}>
        <p>Amount of participants</p>
        <input type="text" data-testid="participants" {...register('participants')} />
        <p>Acessibility</p>
        <input type="range" id="vol" min="0.0" max="1.0" step="0.05" defaultValue="0" {...register('accessibility')}></input>
        <div style={{ marginTop: '10px' }}>
          <button type="submit">Search!</button>
        </div>
      </form>
      <p>Or... <a href='/'>Basic Search</a></p>
      <Credits />
    </div>
  )
}

export default AdvancedSearch