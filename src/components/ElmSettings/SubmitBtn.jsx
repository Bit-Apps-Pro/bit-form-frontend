/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import SingleInput from './Childs/SingleInput'
import SingleToggle from './Childs/SingleToggle'
import SelectBox2 from './Childs/SelectBox2'

export default function SubmitBtn(props) {
  const subBtnTxt = props.elm.data[0].child[0].child
  const shwResetBtn = props.elm.data[0].child.length > 1
  const rstBtnTxt = shwResetBtn && props.elm.data[0].child[1].child
  const btnPos = props.elm.data[0].attr.className.match(/j-c-c|j-c-e/g)
  const isFulWidth = props.elm.data[0].child[0].attr.className.includes('ful-w')
  const isSmall = props.elm.data[0].child[0].attr.className.includes('btcd-btn-md') ? false : true

  const buttonPos = [
    { name: 'Left', value: '' },
    { name: 'Center', value: 'j-c-c' },
    { name: 'Right', value: 'j-c-e' },
  ]

  function setSubBtnTxt(e) {
    props.elm.data[0].child[0].child = e.target.value
    props.setSubmitData(props.elm.data)
  }

  function setRstBtnTxt(e) {
    props.elm.data[0].child[1].child = e.target.value
    props.setSubmitData(props.elm.data)
  }

  function setResetBtn(e) {
    if (e.target.checked) {
      props.elm.data[0].child[1] = { tag: 'button', attr: { className: `btcd-sub-btn btcd-rst btcd-btn-md ${isFulWidth && ' ful-w'}`, type: 'button' }, child: 'Reset' }
    } else {
      props.elm.data[0].child.splice(1, 1)
    }
    props.setSubmitData(props.elm.data)
  }

  function setBtnPos(e) {
    props.elm.data[0].attr.className = props.elm.data[0].attr.className.replace(/j-c-c|j-c-e/g, '')
    props.elm.data[0].attr.className += ` ${e.target.value}`
    props.setSubmitData(props.elm.data)
  }

  function setFulWidth(e) {
    if (e.target.checked) {
      props.elm.data[0].child[0].attr.className += ' ful-w'
      if (shwResetBtn) {
        props.elm.data[0].child[1].attr.className += ' ful-w'
      }
    } else {
      props.elm.data[0].child[0].attr.className = props.elm.data[0].child[0].attr.className.replace(/ful-w/g, '')
      if (shwResetBtn) {
        props.elm.data[0].child[1].attr.className = props.elm.data[0].child[1].attr.className.replace(/ful-w/g, '')
      }
    }
    props.setSubmitData(props.elm.data)
  }

  function setSmall(e) {
    if (e.target.checked) {
      props.elm.data[0].child[0].attr.className = props.elm.data[0].child[0].attr.className.replace(/btcd-btn-md/g, '')
      if (shwResetBtn) {
        props.elm.data[0].child[1].attr.className = props.elm.data[0].child[1].attr.className.replace(/btcd-btn-md/g, '')
      }
    } else {
      props.elm.data[0].child[0].attr.className += ' btcd-btn-md'
      if (shwResetBtn) {
        props.elm.data[0].child[1].attr.className += ' btcd-btn-md'
      }
    }
    props.setSubmitData(props.elm.data)
  }

  return (
    <div>
      <h4>Submit Button</h4>
      <SingleInput title="Submit Button Text:" inpType="text" value={subBtnTxt} action={setSubBtnTxt} placeholder="Submit Button Text" />
      <SingleToggle title="Show Reset Button: " isChecked={shwResetBtn} action={setResetBtn} className="mt-5" />
      {shwResetBtn && <SingleInput title="Reset Button Text:" inpType="text" value={rstBtnTxt} action={setRstBtnTxt} placeholder="Reset Button Text" />}
      <SelectBox2 title="Buttons Position:" options={buttonPos} setBtnPos={setBtnPos} action={setBtnPos} value={btnPos === null ? '' : btnPos.join('')} />
      <SingleToggle title="Full Width: " isChecked={isFulWidth} action={setFulWidth} className="mt-5" />
      <SingleToggle title="Small Button: " isChecked={isSmall} action={setSmall} className="mt-5" />
    </div>
  )
}
