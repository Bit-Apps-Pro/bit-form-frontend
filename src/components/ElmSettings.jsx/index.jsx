/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import TextFieldSettings from './TextFieldSettings'
import TextAreaSettings from './TextAreaSettings'
import DateSettings from './DateSettings'

export default class index extends React.Component {
  renderSettings = (type) => {
    switch (type) {
      case 'text-fld':
        return <TextFieldSettings elm={this.props.elm} updateData={this.props.updateData} />
      case 'textarea':
        return <TextAreaSettings elm={this.props.elm} updateData={this.props.updateData} />
      case 'date':
        return <DateSettings elm={this.props.elm} updateData={this.props.updateData} />
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="elm-settings">
        <h4>Element Settings</h4>
        {this.renderSettings(this.props.elm.type)}
      </div>
    )
  }
}
