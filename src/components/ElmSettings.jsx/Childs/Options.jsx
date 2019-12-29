/* eslint-disable no-param-reassign */
/* eslint-disable object-property-newline */
import React from 'react'
import Boxes from './Boxes'

export default function Options(props) {
  let boxes = null
  props.elm.data.child.map(el => {
    if (props.type !== 'select') {
      if (el.tag === 'div') {
        boxes = el.child
      }
    }
    return null
  })

  const setCheck = (e, index) => {
    props.elm.data.child.map(el => {
      if (el.tag === 'div') {
        if (e.target.checked) {
          el.child[index].child[1].attr.checked = e.target.checked
        } else {
          delete el.child[index].child[1].attr.checked
        }
      }
      return null
    })
    props.updateData(props.elm)
  }

  const updateOption = (e, index) => {
    props.elm.data.child.map(el => {
      if (el.tag === 'div') {
        el.child[index].child[0].child = e.target.value
      }
      return null
    })
    props.updateData(props.elm)
  }

  const delOption = (index) => {
    props.elm.data.child.map(el => {
      if (el.tag === 'div') {
        if (el.child.length > 1) { el.child.splice(index, 1) }
      }
      return null
    })
    props.updateData(props.elm)
  }

  const addMore = () => {
    if (props.type === 'check') {
      props.elm.data.child.map(el => {
        if (el.tag === 'div') {
          el.child.push({
            tag: 'label', attr: { className: 'btcd-ck-wrp' }, child: [
              {
                tag: 'span', attr: null, child: `Option ${el.child.length + 1}`,
              },
              { tag: 'input', attr: { type: 'checkbox' }, child: null },
              { tag: 'span', attr: { className: 'btcd-mrk ck' }, child: null },
            ],
          })
        }
        return null
      })
    } else {
      props.elm.data.child.map(el => {
        if (el.tag === 'div') {
          el.child.push({
            tag: 'label', attr: { className: 'btcd-ck-wrp' }, child: [
              {
                tag: 'span', attr: null, child: `Option ${el.child.length + 1}`,
              },
              { tag: 'input', attr: { type: 'radio', name: props.layId }, child: null },
              { tag: 'span', attr: { className: 'btcd-mrk rdo' }, child: null },
            ],
          })
        }
        return null
      })
    }

    props.updateData(props.elm)
  }

  return (
    <div className="mt-2 opt">
      Options:
      {boxes.map((itm, idx) => <Boxes key={`bx- ${idx + 10}`} isChecked={itm.child[1].attr.checked} idx={idx} itm={itm} delOption={delOption} updateOption={updateOption} setCheck={setCheck} />)}
      <button className="btn" type="button" onClick={addMore}>Add More + </button>
    </div>
  )
}
