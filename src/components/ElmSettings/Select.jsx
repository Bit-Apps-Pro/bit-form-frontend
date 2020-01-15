/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Label from './Childs/Label'
import SelectBox from './Childs/SelectBox'
import Required from './Childs/Required'
import Placeholder from './Childs/Placeholder'
import SelectType from './Childs/SelectType'
import SingleInput from './Childs/SingleInput'

export default function Select(props) {
  let label = ''
  let placeholder = ''
  let multipleSelct = false
  let limit = ''
  let maxShow = ''

  props.elm.data.child.map(el => {
    if (el.tag === 'label') {
      label = el.child
    } else if (el.tag === 'select') {
      placeholder = el.attr.placeholder
      multipleSelct = el.attr.multiple
      limit = el.attr.limit === undefined ? '' : el.attr.limit
      maxShow = el.attr['data-max-show'] === undefined ? '' : el.attr['data-max-show']
    }
    return null
  })

  const updateOption = (e, idx) => {
    props.elm.data.child[1].child[idx].child = e.target.value
    props.elm.data.child[1].child[idx].attr.value = e.target.value
    props.updateData(props.elm)
  }

  const addMoreOption = () => {
    const count = props.elm.data.child[1].child.length + 1
    props.elm.data.child[1].child.push(
      { tag: 'option', attr: { value: `option ${count}` }, child: `option ${count}` },
    )
    props.updateData(props.elm)
  }

  const removeOpt = (idx) => {
    if (props.elm.data.child[1].child.length > 1) { props.elm.data.child[1].child.splice(idx, 1) }
    props.updateData(props.elm)
  }

  const setSelected = (e, idx) => {
    props.elm.data.child[1].child.map(itm => {
      delete itm.attr.selected
      return null
    })
    props.elm.data.child[1].child[idx].attr.selected = e.target.checked
    props.updateData(props.elm)
  }

  const updateType = (type) => {
    props.elm.data.child[1].attr.multiple = !!Number(type.target.value)
    props.elm.data.child[1].attr.placeholder = 'Select Options'
    props.updateData(props.elm)
  }

  const setLimit = (e) => {
    if (e.target.value.trim() === '') {
      delete props.elm.data.child[1].attr.limit
    } else {
      props.elm.data.child[1].attr.limit = e.target.value
    }
    props.updateData(props.elm)
  }

  const setMaxShow = (e) => {
    if (e.target.value < 2) {
      props.elm.data.child[1].attr['data-max-show'] = 2
    } else {
      props.elm.data.child[1].attr['data-max-show'] = e.target.value
    }
    if (e.target.value.trim() === '') {
      delete props.elm.data.child[1].attr['data-max-show']
    }
    props.updateData(props.elm)
  }

  return (
    <div>
      <h4>Select Options</h4>
      <Required tag="select" isChecked={props.elm.data.child[1].attr.required} elm={props.elm} updateData={props.updateData} />
      <Label label={label} elm={props.elm} updateData={props.updateData} />
      <SelectType limit={limit} multipleSelct={multipleSelct} updateType={updateType} setLimit={setLimit} />
      {multipleSelct && (<Placeholder placeholder={placeholder} elm={props.elm} updateData={props.updateData} />)}
      <div className="mt-2 opt">
        Options:
        {props.elm.data.child[1].child.map((itm, idx) => <SelectBox key={`sel-${idx + 11}`} idx={idx} itm={itm} updateOption={updateOption} removeOpt={removeOpt} setSelected={setSelected} />)}
        <button className="btn" type="button" onClick={addMoreOption}>Add More + </button>
      </div>
      <SingleInput inpType={props.inpType} title="Max Option Show:" value={maxShow} action={setMaxShow} placeholder="6" />
    </div>
  )
}
