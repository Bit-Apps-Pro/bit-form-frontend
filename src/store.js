import React,{useState,createContext} from 'react';



const FormFieldContext = createContext();

const FormFieldProvider = ({ children }) => {
  const [fromField, setFormFiled] = useState([]);
console.log(children);
  return (
    <FormFieldContext.Provider value={[fromField, setFormFiled]}>
      {children}
    </FormFieldContext.Provider>
  );
};

export { FormFieldProvider, FormFieldContext };