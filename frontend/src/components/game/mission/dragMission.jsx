import {useDrag} from 'react-aria';
import Draggable from './dragMissonChild/draggable';
import DropTarget from './dragMissonChild/dropTarget';

const DragMission = (props) => {

  return (
    <>
    <Draggable/>
    <DropTarget {...props}/>
    </>
  );
}


export default DragMission;