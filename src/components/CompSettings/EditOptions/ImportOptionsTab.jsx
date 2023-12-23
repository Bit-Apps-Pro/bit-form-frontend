import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IS_PRO, deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import ImportOptions from '../ImportOptions'

export default function ImportOptionsTab({
  setOptions, lblKey, valKey, setEditOptionType, isPro, customType, setCustomType,
}) {
  const { fieldKey: fldKey } = useParams()
  const [importOpts, setImportOpts] = useState({})
  const copyCustomType = deepCopy(customType)
  const dataSrc = copyCustomType?.type || 'fileupload'
  let fieldObject = null
  let disabled = false
  if (copyCustomType?.type) {
    fieldObject = copyCustomType
    disabled = true
  }

  useEffect(() => setImportOpts({ dataSrc, fieldObject, disabled }), [fldKey])

  return (
    <div className="pos-rel">
      {isPro && !IS_PRO && (
        <div className="pro-blur flx" style={{ width: '100%', height: '100%', top: 0, left: 0 }}>
          <div className="pro">
            {__('Available On')}
            <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
              <span className="txt-pro">
                &nbsp;
                {__('Premium')}
              </span>
            </a>
          </div>
        </div>
      )}
      <ImportOptions setOptions={setOptions} importOpts={importOpts} setImportOpts={setImportOpts} lblKey={lblKey} valKey={valKey} setEditOptionType={setEditOptionType} customType={customType} setCustomType={setCustomType} />
    </div>
  )
}
