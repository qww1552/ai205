import React from 'react';
import {useSelector} from 'react-redux';
import { selectVoteInfo } from '../../../app/voteInfo';


const ResultMeeting = () => {

  const result = useSelector(selectVoteInfo).elected;


  return (
    <div>
      {/* 대충 당선된사람 띄움 */}
      {result.id}가 당선됨
      {result.role}역할이었음
    </div>
  
  )
}

export default ResultMeeting;