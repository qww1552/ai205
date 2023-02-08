import React from 'react';
import {useSelector} from 'react-redux';
// import {selectResult} from '../../../app/result'

// import { selectVoteInfo } from '../../../app/voteInfo';

const ResultMeeting = () => {

  // const result = useSelector(selectVoteInfo);
  const result = {vote_result:[],elected : { id : "player3", role: "citizen"}}

  return (
    <div>
      {/* 대충 당선된사람 띄움 */}
      {result.elected.id}가 당선됨
      {result.elected.role}역할이었음
    </div>
  
  )
}

export default ResultMeeting;