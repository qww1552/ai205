import LoadingSpinner from 'components/loadingSpinner';
import React from 'react';
import TypingText from './TypingText';


const NoticeMeeting = () => {
  return (
    // Todo: 나중에 좀더 보기좋게 수정하기
    <div>
      <TypingText text="회의를 시작합니다" speed={60} fontSize="1.25rem" color="green" />
      <LoadingSpinner/>
    </div>
  );
};

export default NoticeMeeting;