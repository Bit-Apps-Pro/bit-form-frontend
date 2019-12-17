import React from 'react'
import TextField from './TextField'
import TextArea from './TextArea'

export default function index(props) {
  return (
    <div className="toolBar-wrp">
      <h4>ToolBar</h4>
      <div className="toolBar">
        <TextField setDrgElm={props.setDrgElm} />
        <TextArea setDrgElm={props.setDrgElm} />
      </div>
    </div>
  )
}
