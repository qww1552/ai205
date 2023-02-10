import {useDrag} from 'react-aria';

const style = {
    display: "inline-block",
    border: "1px solid gray",
    padding: "10px"
}

const Draggable = () => {
    let { dragProps, isDragging } = useDrag({
      getItems() {
        return [{
          'text/plain': 'hello world'
        }];
      }
    });
  
    return (
      <div style={style}
        {...dragProps}
        role="button"
        tabIndex={0}
        className={`draggable ${isDragging ? 'dragging' : ''}`}
      >
        Drag me
      </div>
    );
  }

  export default Draggable;