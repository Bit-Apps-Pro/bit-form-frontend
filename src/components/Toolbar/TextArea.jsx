/* eslint-disable no-undef */
import React from 'react'
import textArea from '../../resource/img/text2.svg'

export default function TextArea(props) {
  const comp = {
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
  }

  return (
    <div
      className="tools"
      draggable
      unselectable="on"
      onDragStart={() => props.setDrgElm([comp.elm, comp.textArea.pos])}
    >
      <img draggable="false" src={process.env.NODE_ENV === 'production' ? `${bits.assetsURL}/img/text2.svg` : textArea} alt="text-field" className="tool-img" />
      Text Area
    </div>
  )
}
