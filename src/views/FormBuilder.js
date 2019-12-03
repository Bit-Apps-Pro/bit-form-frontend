import React, { useContext } from "react";
import Source from "../Source";
import Target from "../Target";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import _ from "lodash";
import "../bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { FormFieldProvider } from "../store";
import { FormFieldContext } from "../store";

const FormBuilder = () => {

  const [fromField, setFormFiled] = useContext(FormFieldContext);
  const onDrop = component => {
    const newComponentsList = _.concat([], fromField, component);
    setFormFiled(newComponentsList);
  };


  return (
    
      <div className="App">
        <Source />
        <Target onDrop={onDrop} components={fromField}/>
      </div>
   
  );
};

const WrapperApp = DragDropContext(HTML5Backend)(FormBuilder);
export default WrapperApp;
