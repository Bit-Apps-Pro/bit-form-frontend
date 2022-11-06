const decisionFldHandle = (props, fromData) => {
  Object.entries(props.fields).forEach(([, fieldData]) => {
    if (fieldData.typ === 'decision-box' && bfSelect(`input[name="${fieldData.fieldName}"]`).checked) {
      fromData.set(fieldData.fieldName, fieldData.msg.checked)
    } else if (fieldData.typ === 'decision-box') {
      fromData.set(fieldData.fieldName, fieldData.msg.unchecked)
    }
  })
  return fromData
}
export default decisionFldHandle
