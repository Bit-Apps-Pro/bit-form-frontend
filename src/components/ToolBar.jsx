import React from 'react'
import textField from '../resource/img/text.svg'
import textArea from '../resource/img/text2.svg'

export default function ToolBar(props) {
  const components = {
    textField: { elm: '<div class="text-wrp no-drg"><label htmlFor="">Label</label><input class="txt-fld" type="text"/></div>', pos: { h: 2, w: 2, i: 'block-5' } },
    textArea: { elm: '<div class="text-wrp no-drg"><label htmlFor="">Label:</label><textarea class="txt-a"></textarea></div>', pos: { h: 2, w: 3, i: 'block-5' } },
  }

  return (
    <div className="toolBar-wrp">
      <h4>ToolBar</h4>
      <div className="toolBar">
        <div
          className="tools"
          draggable
          unselectable="on"
          onDragStart={() => props.setDrgElm([components.textField.elm, components.textField.pos])}
        >
          <img src={process.env.NODE_ENV==='production'?bits.assetsURL+'/img/text.svg':textField} alt="text-field" className="tool-img" />
          Text Field
        </div>

        <div
          className="tools"
          draggable
          unselectable="on"
          onDragStart={() => props.setDrgElm([components.textArea.elm, components.textArea.pos])}
        >
          <img src={process.env.NODE_ENV==='production'?bits.assetsURL+'/img/text.svg':textArea} alt="text-field" className="tool-img" />
          Text Area
        </div>
      </div>
    </div>
  )
}
