/* eslint-disable no-unused-expressions */

export const addFieldMap = (i, confTmp, setConf) => {
  const newConf = { ...confTmp }
  console.log({ newConf })
  newConf.field_map.splice(i, 0, {})
  setConf({ ...newConf })
  console.log('new', { newConf })
}

export const delFieldMap = (i, confTmp, setConf) => {
  const newConf = { ...confTmp }
  if (newConf.field_map.length > 1) {
    newConf.field_map.splice(i, 1)
  }

  setConf({ ...newConf })
}
