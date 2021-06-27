/* eslint-disable prefer-destructuring */
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { $bits } from '../../../GlobalStates'
import LoaderSm from '../../Loaders/LoaderSm'

export const generateAcfOptions = (importOpts, lblKey, valKey) => {
  const { options, lbl, vlu } = importOpts
  if (!options || !lbl || !vlu) return []
  const presets = options
  return presets.map(op => ({ [lblKey]: (op[lbl]), [valKey]: (op[vlu]) }))
}

export default function AcfFieldOptions({ importOpts, setImportOpts }) {
  const bits = useRecoilValue($bits)
  const isPro = typeof bits !== 'undefined' && bits.isPro
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isPro) return

    const uri = new URL(bits.ajaxURL)
    uri.searchParams.append('action', 'bitforms_get_acf_group_fields')
    uri.searchParams.append('_ajax_nonce', bits.nonce)

    setLoading(true)
    fetch(uri)
      .then(resp => resp.json())
      .then(res => {
        if (res.data) {
          const data = res.data
          const tmpOpts = { ...importOpts }
          localStorage.setItem('bf-options-acf_field_op', JSON.stringify(data))
          tmpOpts.groups = res.data
          tmpOpts.lbl = 1
          tmpOpts.vlu = 0
          setImportOpts({ ...tmpOpts })
        }
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleImportInput = e => {
    const { name, value } = e.target
    const tmpOpts = { ...importOpts }
    tmpOpts[name] = value
    const options = localStorage.getItem('bf-options-acf_field_op')
    const filder = JSON.parse(options)?.find(item => item?.key === tmpOpts.fieldkey)
    tmpOpts.options = Object.entries(filder?.choices)
    tmpOpts.keys = Object.keys(tmpOpts.options)
    tmpOpts.vlu = tmpOpts?.keys[tmpOpts?.vlu]
    tmpOpts.lbl = tmpOpts?.keys[tmpOpts?.lbl]
    setImportOpts({ ...tmpOpts })
  }

  return (
    <div className="mt-2">
      <div>
        {loading && (
          <div className="flx mb-2">
            <LoaderSm size="20" clr="#022217" className="mr-1" />
            <p className="m-0">Loading..</p>
          </div>
        )}

        <div>
          {!!importOpts?.groups && (
            <div className="flx mt-3 w-10">
              <div className="w-10 mr-2">
                <b>ACF Options Field</b>
                <select name="fieldkey" onChange={handleImportInput} value={importOpts.fieldkey || ''} className="btcd-paper-inp mt-1">
                  {importOpts?.groups?.map((group, key) => (
                    <option key={`imp-${key * 2}`} value={group.key}>
                      {`${group.group_title}-${group.name}`}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          )}
        </div>

        {!!importOpts?.options?.length && (
          <div>
            {importOpts.keys && (
              <div className="flx mt-3 w-10">
                <div className="w-5 mr-2">
                  <b>Label</b>
                  <select name="lbl" id="" className="btcd-paper-inp mt-1" onChange={handleImportInput} value={importOpts.lbl || ''}>
                    <option value="">Select Label</option>
                    <option value="1">Label</option>
                    <option value="0">Value</option>
                  </select>
                </div>
                <div className="w-5">
                  <b>Value</b>
                  <select name="vlu" id="" className="btcd-paper-inp mt-1" onChange={handleImportInput} value={importOpts.vlu || ''}>
                    <option value="">Select Value</option>
                    <option value="1">Label</option>
                    <option value="0">Value</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
