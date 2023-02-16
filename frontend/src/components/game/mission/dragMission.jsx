import {useDrag} from 'react-aria';
import Draggable from './dragMissonChild/draggable';
import DropTarget from './dragMissonChild/dropTarget';
import { action } from "app/store"
import { Button } from "antd"
const DragMission = (props) => {

  return (
    <>

      

      <h1> {props.content} </h1>
      <Draggable/>
      <DropTarget {...props}/>
     
    </>
  );
}


export default DragMission;