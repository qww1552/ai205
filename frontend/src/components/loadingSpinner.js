import React from 'react';
import {RotatingSquare} from "react-loader-spinner"; //수많은 스피너 중 저는 Oval 스피너 import하겠습니다


function LoadingSpinner () {
   
    return ( //import 한 스피너는 컴포넌트 형태로 사용가능
    <RotatingSquare
      ariaLabel="rotating-square"
      height="400"
      width="400"
      visible={true}
      color="grey"
      strokeWidth="5"
    />
    //   <ColorRing
    //   visible={true}
    //   height="80"
    //   width="80"
    //   ariaLabel="blocks-loading"
    //   wrapperStyle={{}}
    //   wrapperClass="blocks-wrapper"
    //   colors={['#6f6f6f', '#6c0000', '#a8a8a8', '#6c0000', '#c9c9c9']}
    // />

    )

};

export default LoadingSpinner;