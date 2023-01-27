import React from 'react';
import {useSelector} from 'react-redux';
import {selectResult} from '../../../app/result'

const ResultMeeting = () => {

  const result = useSelector(selectResult);
  return (
    <div>
      {result.data}
    </div>
  
  )
}

export default ResultMeeting;