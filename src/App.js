import React, { useState } from 'react';
import Audio from './audio';

function App() {
  const [ delay, setDelay ] = useState(1);

  return (
    <div className="grid">
      <Audio
        delay={delay}
        setDelay={setDelay}/>
      <div className='grid-fluid'>
        
      </div>
    </div>
  );
}


export default App;
