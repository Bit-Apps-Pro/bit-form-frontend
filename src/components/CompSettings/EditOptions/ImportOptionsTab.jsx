import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import { $fields, $selectedFieldId } from '../../../GlobalStates'
import { deepCopy } from '../../../Utils/Helpers'
import ImportOptions from '../ImportOptions'

export default function ImportOptionsTab({ lblKey, valKey, setEditOptionType }) {
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
    <ImportOptions importOpts={importOpts} setImportOpts={setImportOpts} lblKey={lblKey} valKey={valKey} setEditOptionType={setEditOptionType} />
  )
}
