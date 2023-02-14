import { useState } from 'react';
import { useMove } from 'react-aria';

const MoveMission = ({content, setComplete}) => {
  const CONTAINER_SIZE = 200;
  const BALL_SIZE = 30;

  let [events, setEvents] = useState([]);
  let [color, setColor] = useState('black');
  let [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  let clamp = (pos) => Math.min(Math.max(pos, 0), CONTAINER_SIZE - BALL_SIZE);
  let { moveProps } = useMove({

    onMove(e) {
      setPosition(({ x, y }) => {
        if (e.pointerType === 'keyboard') {
          x = clamp(x);
          y = clamp(y);
        }

        x += e.deltaX;
        y += e.deltaY;
        return { x, y };
      });

      setEvents(
        (events) => [
          `move with pointerType = ${e.pointerType}, deltaX = ${e.deltaX}, deltaY = ${e.deltaY}`,
          ...events
        ]
      );

      if(events.length >= 110) {
        setComplete(true)
      }
    }
  });

  return (
    <>
      <h1> {content} </h1>
      <div
        style={{
          width: CONTAINER_SIZE,
          height: CONTAINER_SIZE,
          background: 'white',
          border: '1px solid black',
          position: 'relative',
          touchAction: 'none'
        }}
      >
        <div
          {...moveProps}
          tabIndex={0}
          style={{
            width: BALL_SIZE,
            height: BALL_SIZE,
            borderRadius: '100%',
            position: 'absolute',
            left: clamp(position.x),
            top: clamp(position.y),
            background: color
          }}
        />
      </div>
      <ul
        style={{
          maxHeight: '200px',
          overflow: 'auto'
        }}
      >
        동그라미를 잡고 움직이세요
        {/* {events.map((e, i) => <li key={i}>{e}</li>)} */}
      </ul>
    </>
  );
}

export default MoveMission;