export const addFieldMap = (type, fldProp, i, confTmp, setConf) => {
  const newConf = { ...confTmp }
  newConf[type][fldProp].splice(i, 0, {})
  console.log('new Config', newConf)
  setConf({ ...newConf })
}

export const delFieldMap = (type, fldProp, i, confTmp, setConf) => {
  const newConf = { ...confTmp }
  if (newConf[type][fldProp].length > 1) {
    newConf[type][fldProp].splice(i, 1)
  }

  setConf({ ...newConf })
}

export const handleFieldMapping = (type, fldProp, event, index, conftTmp, setConf) => {
  const newConf = { ...conftTmp }
  newConf[type][fldProp][index][event.target.name] = event.target.value

  setConf({ ...newConf })
}
