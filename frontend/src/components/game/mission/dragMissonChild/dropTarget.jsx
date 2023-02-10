import { useRef, useState } from 'react';
import {useDrop} from 'react-aria';

const style = {
    width: "100px",
    height: "80px",
    display: "inline-block",
    padding: "20px",
    border: "2px dotted gray"
}

const DropTarget = ({setComplete}) => {
  let [dropped, setDropped] = useState(null);
  let ref = useRef();
  let { dropProps, isDropTarget } = useDrop({
    ref,
    async onDrop(e) {
      let items = await Promise.all(
        e.items
          .filter((item) =>
            item.kind === 'text' &&
            (item.types.has('text/plain') ||
              item.types.has('my-app-custom-type'))
          )
          .map(async (item) => {
            if (item.types.has('my-app-custom-type')) {
              return JSON.parse(await item.getText('my-app-custom-type'));
            } else {
              return { message: await item.getText('text/plain') };
            }
          })
      );
      setDropped(items);
    }
  });

  let message = ['Drop here'];
  if (dropped) {
    setComplete(true)
    message = dropped.map((d) => {
      let message = d.message;
      if (d.style === 'bold') {
        message = <strong>{message}</strong>;
      } else if (d.style === 'italic') {
        message = <em>{message}</em>;
      }
      return <div>{message}</div>;
    });
  }

  return (
    <div style={style}
      {...dropProps}
      role="button"
      tabIndex={0}
      ref={ref}
      className={`droppable ${isDropTarget ? 'target' : ''}`}
      key={"idff"}
    >
      {message}
    </div>
  );
}

export default DropTarget;