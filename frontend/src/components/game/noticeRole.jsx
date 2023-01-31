import { selectMe } from 'app/me';
import React from 'react';
import { useSelector } from 'react-redux';

const NoticeRole = () => {
  const me = useSelector(selectMe).player
  return (
    <div>
      <div>당신{me.player.name}의 역할:{me.player.role}</div>
    </div>
  );
};

export default NoticeRole;