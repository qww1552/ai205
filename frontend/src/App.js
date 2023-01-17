import React from 'react';
import PDH from './PDH_pack/PDH'
import HSNR from './HSNR_pack/HSNR'
import SYJ from './SYJ_pack/SYJ'
import './App.css';

function App() {
  return (
    <div className="App">
      <PDH></PDH>
      <SYJ></SYJ>
      <HSNR></HSNR>
    </div>
  );
}

export default App;
