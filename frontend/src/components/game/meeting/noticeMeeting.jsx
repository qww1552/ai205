import LoadingSpinner from 'components/loadingSpinner';
import React from 'react';
import TypingText from './TypingText';


const NoticeMeeting = () => {
  return (

    <div>
      <TypingText text="회의를 시작합니다" speed={60} fontSize="1.25rem" color="green" />
      <LoadingSpinner/>
    </div>
  );
};

export default NoticeMeeting;