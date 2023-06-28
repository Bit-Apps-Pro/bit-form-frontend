export default function customFieldsReset(props) {
  Object.entries(props.inits || {}).map(([fieldKey, initData]) => {
    if (initData.reset) {
      const fldKey = fieldKey.replace(/\[\w+\]/g, '')
      const fieldData = props.fields[fldKey]
      initData.reset(fieldData.val)
    }
  })
}
