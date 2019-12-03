import React,{useContext} from 'react';
import { DragSource } from 'react-dnd';
import data from './data.json';
import {FormFieldContext} from './store';


const components = Object.keys(data);
let updateTT;
const Source=()=> {
  const [fromField, setFormField] = useContext(FormFieldContext);
  updateTT = (e)=>{setFormField([...fromField,{'component':e}])};
    return (
      <div className="source">
        <ul>
          {
            components.map(component => {
              return <ListItem key={component} component={component} />
              // return <li>{component}</li>
            })
          }
        </ul>
      </div>
    )
  }

const spec = {
  beginDrag(props, monitor, component) {
    const item = { ...props };
    return item;
  },

};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


const test = (e) =>{
  // const [fromField, setFormField] = useContext(FormFieldContext);
 updateTT(e);
  console.log("test ::"+e);
}
const ListItem = DragSource("form-elements", spec, collect)(props => {
  const { connectDragSource, component, isDragging } = props;
  
  console.log("isDragging");
  console.log(connectDragSource(<li className={isDragging ? 'isDragging':''}>{component}</li>));
  return connectDragSource(<li className={isDragging ? 'isDragging':''} onClick={()=>test(component)}>{component}</li>)
});



export default Source