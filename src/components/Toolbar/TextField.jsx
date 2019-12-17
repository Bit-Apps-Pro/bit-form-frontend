import React from 'react'
import textField from '../../resource/img/text.svg'
/* eslint-disable no-undef */

export default function TextField(props) {
  const comp = {
    elm: [
      {
        tag: 'div',
        attr: { className: 'text-wrp no-drg', 'btcd-fld': 'text-fld' },
        child: [
          { tag: 'label', attr: {}, child: 'Label' },
          { tag: 'input', attr: { className: 'txt-fld', type: 'text' }, child: null },
        ],
      },
    ],
    pos: { h: 1, w: 2, i: 'n_blk', maxH: 1 },
  }
  return (
    <div
      className="tools"
      draggable
      unselectable="on"
      onDragStart={() => props.setDrgElm([comp.elm, comp.pos])}
    >

      <img draggable="false" src={process.env.NODE_ENV === 'production' ? `${bits.assetsURL}/img/text.svg` : textField} alt="text-field" className="tool-img" />
      Text Field
    </div>
  )
}
