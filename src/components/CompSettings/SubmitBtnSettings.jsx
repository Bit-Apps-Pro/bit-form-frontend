/* eslint-disable no-param-reassign */

import { __ } from '../../Utils/i18nwrap';
import SingleInput from '../Utilities/SingleInput';
import SingleToggle from '../Utilities/SingleToggle'
import SelectBox2 from '../Utilities/SelectBox2'
import Back2FldList from './Back2FldList'

export default function SubmitBtnSettings(props) {
  console.log('%c $render SubmitBtnSettings', 'background:gray;padding:3px;border-radius:5px;color:white')

  const isAlwReset = 'rstBtnTxt' in props.elm.data
  const rstBtnTxt = 'rstBtnTxt' in props.elm.data && props.elm.data.rstBtnTxt
  const { subBtnTxt, align, fulW, btnSiz } = props.elm.data

  const pos = [
    { name: __('Left', 'bitform'), value: 'left' },
    { name: __('Center', 'bitform'), value: 'center' },
    { name: __('Right', 'bitform'), value: 'right' },
  ]

  function setSubBtnTxt(e) {
    props.elm.data.subBtnTxt = e.target.value
    props.setSubmitConfig(props.elm.data)
  }

  function setRstBtnTxt(e) {
    props.elm.data.rstBtnTxt = e.target.value
    props.setSubmitConfig(props.elm.data)
  }

  function setResetAlw(e) {
    if (e.target.checked) {
      props.elm.data.rstBtnTxt = __('Reset', 'bitform')
    } else {
      delete props.elm.data.rstBtnTxt
    }
    props.setSubmitConfig(props.elm.data)
  }

  function setButtonAlign(e) {
    props.elm.data.align = e.target.value
    props.setSubmitConfig(props.elm.data)
  }

  function setFulW(e) {
    props.elm.data.fulW = e.target.checked
    props.setSubmitConfig(props.elm.data)
  }

  function setBtnSiz(e) {
    if (e.target.checked) {
      props.elm.data.btnSiz = 'sm'
    } else {
      props.elm.data.btnSiz = 'md'
    }
    props.setSubmitConfig(props.elm.data)
  }

  return (
    <div className="ml-2 mr-4">
      <Back2FldList setElementSetting={props.setElementSetting} />
      <div>
        <span className="font-w-m">{__('Field Type : ', 'bitform')}</span>
        {__('Submit', 'bitform')}
      </div>
      <SingleInput inpType="text" title={__('Submit Button Text:', 'bitform')} value={subBtnTxt} action={setSubBtnTxt} />
      <SingleToggle title={__('Show Reset Button:', 'bitform')} action={setResetAlw} isChecked={isAlwReset} className="mt-5" />
      {isAlwReset && <SingleInput inpType="text" title={__('Reset Button Text:', 'bitform')} value={rstBtnTxt} action={setRstBtnTxt} />}
      <SelectBox2 title={__('Button Align:', 'bitform')} options={pos} value={align} action={setButtonAlign} />
      <SingleToggle title={__('Full Width Button:', 'bitform')} action={setFulW} isChecked={fulW} className="mt-5" />
      <SingleToggle title={__('Small Button:', 'bitform')} action={setBtnSiz} isChecked={btnSiz === 'sm'} className="mt-5" />
    </div>
  )
}
