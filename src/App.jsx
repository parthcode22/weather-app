import React, { useState, useEffect } from 'react';
import Weather from './components/weather';

const App = () => {
  const [city, setCity] = useState('mumbai');

  useEffect(() => {
    
  }, [city]);

  return (
    <div className='app'>
      <Weather city={city} />
    </div>
  );
};

export default App;
