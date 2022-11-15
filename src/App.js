import React, { useState } from 'react';
import Audio from './audio';
import Text from './text';

function App() {
  const [ delay, setDelay ] = useState(1);

  return (
    <div className="grid">
      <div>
        <Audio
          delay={delay}
          setDelay={setDelay}/>
      </div>
      <div>
        <Text />
      </div>
    </div>
  );
}


export default App;
