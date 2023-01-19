import React from 'react';
import PDH from './PDH_pack/PDH'
import SYJ from './SYJ_pack/SYJ'

import './App.css';

function App() {
  return (
    <div className="App" style={{position: "relative"}} >
      <PDH></PDH>
      <SYJ />
      {/* <HSNR></HSNR> */}
    </div>
  );
}

export default App;
