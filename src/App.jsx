import React, { useState } from 'react';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import RadarMap from './components/Radarmap';

const App = () => {
  const [city, setCity] = useState('Zlín');

  return (
    <div className='app'>
      <Weather setCity={setCity} />
      <Forecast city={city} />
      <RadarMap />
   
       
      
      
     
    </div>
  );
};

export default App;
