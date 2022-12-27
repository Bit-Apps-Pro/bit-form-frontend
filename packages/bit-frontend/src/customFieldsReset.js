export default function customFieldsReset(props) {
  const customFields = [
    'select',
    'phone-number',
    'country',
    'currency',
    'file-up',
    'advanced-file-up',
  ]

  Object.entries(props?.fields || {}).map(([fieldKey, fieldData]) => {
    if (customFields.includes(fieldData.typ)) {
      props.inits[fieldKey].reset(fieldData.val)
    }
  })
}
