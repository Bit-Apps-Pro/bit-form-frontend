import React, { memo } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import TextFieldSettings from './TextFieldSettings'
import RadioCheckSettings from './RadioCheckSettings'
import SelectSettings from './SelectSettings'
import FileUpSettings from './FileUpSettings'
import SubmitBtnSettings from './SubmitBtnSettings'

function CompSettings(props) {
  console.log('%c $render Comp setting index', 'background:gray;padding:3px;border-radius:5px;color:white')

  const renderSettings = (type) => {
    switch (type) {
      case 'text':
      case 'number':
      case 'password':
      case 'email':
      case 'url':
      case 'textarea':
      case 'date':
      case 'datetime-local':
      case 'time':
      case 'month':
      case 'week':
      case 'color':
        return <TextFieldSettings elm={props.elm} updateData={props.updateData} />
      case 'check':
      case 'radio':
        return <RadioCheckSettings elm={props.elm} updateData={props.updateData} />
      case 'select':
        return <SelectSettings elm={props.elm} updateData={props.updateData} />
      case 'file-up':
        return <FileUpSettings elm={props.elm} updateData={props.updateData} />
      case 'submit':
        return <SubmitBtnSettings elm={props.elm} setSubmitConfig={props.setSubmitConfig} />
      default:
        return ''
    }
  }

  return (
    <div className="elm-settings">
      <h4>Element Settings</h4>
      <div>
        <Scrollbars>
          <div className="btcd-settings">
            {renderSettings(props.elm.data.typ)}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}
export default memo(CompSettings)
