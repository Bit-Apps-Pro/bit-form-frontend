import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { deepCopy } from '../../../Utils/Helpers'
import ImportOptions from '../ImportOptions'

export default function ImportOptionsTab({ setOptions, lblKey, valKey, setEditOptionType }) {
  const { fieldKey: fldKey } = useParams()
  const fields = useRecoilValue($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [importOpts, setImportOpts] = useState({})
  const dataSrc = fieldData?.customType?.type || 'fileupload'
  let fieldObject = null
  let disabled = false
  if (fieldData?.customType?.type) {
    fieldObject = fieldData?.customType
    disabled = true
  }

  useEffect(() => setImportOpts({ dataSrc, fieldObject, disabled }), [fldKey])

  return (
    <ImportOptions setOptions={setOptions} importOpts={importOpts} setImportOpts={setImportOpts} lblKey={lblKey} valKey={valKey} setEditOptionType={setEditOptionType} />
  )
}
