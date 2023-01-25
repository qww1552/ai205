import React from 'react';
import {useSelector} from 'react-redux';
import {selectResult} from '../../../app/result'

const ResultConference = () => {

  const result = useSelector(selectResult);
  return (
    <div>
      {result.data}
    </div>
  
  )
}

export default ResultConference;