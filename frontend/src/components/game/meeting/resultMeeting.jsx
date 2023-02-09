import React from 'react';
import {useSelector} from 'react-redux';
import { selectVoteInfo } from '../../../app/voteInfo';


const ResultMeeting = () => {
  const result = useSelector(selectVoteInfo).voteResult.elected;


  return (
    <div>
      {result === "skip"?
      <div>아무도 당선되지 않음</div>

      :<div>
      {/* 대충 당선된사람 띄움 */}
      {result.id}가 당선됨
      {result.role}역할이었음
      </div>}
    </div>
  
  )
}

export default ResultMeeting;