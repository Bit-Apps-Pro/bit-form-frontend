import React from 'react'
import textField from '../resource/img/text.svg'
import textArea from '../resource/img/text2.svg'

export default function ToolBar(props) {
  const components = {
    textField: {
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp no-drg' },
          child: [
            { tag: 'label', attr: {}, child: 'Label' },
            { tag: 'input', attr: { className: 'txt-fld', type: 'text' }, child: null },
          ],
        },
      ],
      pos: { h: 2, w: 2, i: 'block-5' },
    },
    textArea: {
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp no-drg' },
          child: [
            { tag: 'label', attr: {}, child: 'Label' },
            { tag: 'textarea', attr: { className: 'txt-a', type: 'text' }, child: null },
          ],
        },
      ],
      pos: { h: 2, w: 3, i: 'block-5' },
    },
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
          <img src={textField} alt="text-field" className="tool-img" />
          Text Field
        </div>

        <div
          className="tools"
          draggable
          unselectable="on"
          onDragStart={() => props.setDrgElm([components.textArea.elm, components.textArea.pos])}
        >
          <img src={textArea} alt="text-field" className="tool-img" />
          Text Area
        </div>

      </div>
    </div>
  )
}
