import React,{useContext} from "react";
import { DropTarget } from "react-dnd";
import data from "./data.json";
import {FormFieldContext} from "./store"

const Target = props => {
  console.log(props);
  const { connectDropTarget,components} = props;
//   const {components, setcomponents} = useContext(FormFieldContext);
  console.log(components);
  return connectDropTarget(
    <div className="target">
      <div className="card">
        {components.map((d, key) => {
          let item = data[d.component];
          return (
            <>
              <div className="content">
                <div className="title mb-2">{d.component}</div>
                <div
                  className="item"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

const spec = {
  drop(props, monitor) {
    console.log(monitor);
    const item = monitor.getItem();
    props.onDrop(item);
    return item;
  }
};
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

export default DropTarget("form-elements", spec, collect)(Target);
