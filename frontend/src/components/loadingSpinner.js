import React from 'react'
import {RotatingSquare} from "react-loader-spinner"


function LoadingSpinner () {
   
    return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <RotatingSquare
        ariaLabel="rotating-square"
        height="400"
        width="400"
        visible={true}
        color="green"
        strokeWidth="5"
      />
    </div>
    )

};

export default LoadingSpinner;