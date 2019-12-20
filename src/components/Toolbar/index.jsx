/* eslint-disable no-undef */

import React from 'react'
import Tools from './Tools'
import multilineText from '../../resource/img/multilineText.svg'
import textField from '../../resource/img/textField.svg'

export default function index(props) {
  const tools = [
    {
      name: 'Text Field',
      icn: textField,
      pos: { h: 2, w: 5, i: 'n_blk', maxH: 2, minH: 2 },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp no-drg', 'btcd-fld': 'text-fld' },
          child: [
            { tag: 'label', attr: {}, child: 'Label' },
            { tag: 'input', attr: { className: 'txt-fld', type: 'text', placeholder: 'Placeholder text' }, child: null },
          ],
        },
      ],
    },
    {
      name: 'Multiline Text',
      icn: multilineText,
      pos: { h: 3, w: 5, i: 'block-5' },
      elm: [
        {
          tag: 'div',
          attr: { className: 'text-wrp no-drg', 'btcd-fld': 'textarea' },
          child: [
            { tag: 'label', attr: {}, child: 'Label' },
            { tag: 'textarea', attr: { className: 'txt-a', placeholder: 'Placeholder text' }, child: null },
          ],
        },
      ],
    },
  ]
  return (
    <div className="toolBar-wrp">
      <h4>ToolBar</h4>
      <div className="toolBar">
        {tools.map(tool => (
          <Tools key={tool.name} setDrgElm={props.setDrgElm} value={[tool.elm, tool.pos]}>
            <img draggable="false" src={process.env.NODE_ENV === 'production' ? `${bits.assetsURL}/img/${tool.icn}.svg` : `${tool.icn}`} alt={`${tool.name}-field`} className="tool-img" />
            {tool.name}
          </Tools>
        ))}
      </div>
    </div>
  )
}
