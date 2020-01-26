/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import TextFieldSettings from './TextFieldSettings'
import TextAreaSettings from './TextAreaSettings'
import DateSettings from './DateSettings'
import CheckBox from './CheckBox'
import RadioBtn from './RadioBtn'
import Select from './Select'
import FileUploadSettings from './FileUploadSettings'
import SubmitBtn from './SubmitBtn'

export default function index(props) {
  const renderSettings = (type) => {
    switch (type) {
      case 'text-fld':
        return <TextFieldSettings elm={props.elm} updateData={props.updateData} />
      case 'textarea':
        return <TextAreaSettings elm={props.elm} updateData={props.updateData} />
      case 'date':
        return <DateSettings elm={props.elm} updateData={props.updateData} />
      case 'ck':
        return <CheckBox elm={props.elm} updateData={props.updateData} />
      case 'rdo':
        return <RadioBtn elm={props.elm} updateData={props.updateData} />
      case 'select':
        return <Select elm={props.elm} updateData={props.updateData} />
      case 'file-up':
        return <FileUploadSettings elm={props.elm} updateData={props.updateData} />
      case 'submit':
        return <SubmitBtn elm={props.elm} setSubmitData={props.setSubmitData} />
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
            {renderSettings(props.elm.type)}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}
