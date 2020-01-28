import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import TextFieldSettings from './TextFieldSettings'


export default function index(props) {
  const renderSettings = (type) => {
    switch (type) {
      case 'text':
        return <TextFieldSettings elm={props.elm} updateData={props.updateData} />
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
