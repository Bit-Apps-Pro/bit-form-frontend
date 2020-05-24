import React, { memo } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import TextFieldSettings from './TextFieldSettings'
import RadioCheckSettings from './RadioCheckSettings'
import SelectSettings from './SelectSettings'
import FileUpSettings from './FileUpSettings'
import SubmitBtnSettings from './SubmitBtnSettings'
import ReCaptchaSettigns from './ReCaptchaSettigns'

function CompSettings(props) {

  const renderSettings = (type) => {
    if ((props.fields !== null && props.fields[props.elm.id] !== undefined) || type === 'submit') {
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
          return <TextFieldSettings fields={props.fields} elm={props.elm} updateData={props.updateData} />
        case 'check':
        case 'radio':
          return <RadioCheckSettings fields={props.fields} elm={props.elm} updateData={props.updateData} />
        case 'select':
          return <SelectSettings fields={props.fields} elm={props.elm} updateData={props.updateData} />
        case 'file-up':
          return <FileUpSettings fields={props.fields} elm={props.elm} updateData={props.updateData} />
        case 'submit':
          return <SubmitBtnSettings fields={props.fields} elm={props.elm} setSubmitConfig={props.setSubmitConfig} />
        case 'recaptcha':
          return <ReCaptchaSettigns fields={props.fields} elm={props.elm} updateData={props.updateData} />
        default:
          return ''
      }
    }
    return ''
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
