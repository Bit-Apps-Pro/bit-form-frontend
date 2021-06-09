/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
import { useEffect, useState } from 'react'
import { sortByField } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import LoaderSm from '../../Loaders/LoaderSm'
import CheckBox from '../../Utilities/CheckBox'
import Cooltip from '../../Utilities/Cooltip'

const getTrimmedString = str => (typeof str === 'string' ? str?.trim() : str?.toString())

export const generateTermsOptions = (importOpts, lblKey, valKey) => {
  const { data, lbl, vlu } = importOpts
  if (!data || !lbl || !vlu) return []
  const presets = data
  return presets.map(op => ({ [lblKey]: getTrimmedString(op[lbl]), [valKey]: getTrimmedString(op[vlu]) }))
}

export default function TaxonomyImportOption({ importOpts, setImportOpts }) {
  const isPro = typeof bits !== 'undefined' && bits.isPro
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isPro) return
    localStorage.removeItem('bf-options-taxanomy')
    // eslint-disable-next-line no-undef
    const uri = new URL(bits.ajaxURL)
    uri.searchParams.append('action', 'bitforms_get_wp_taxonomy')
    uri.searchParams.append('_ajax_nonce', typeof bits === 'undefined' ? '' : bits.nonce)

    setLoading(true)
    fetch(uri)
      .then(resp => resp.json())
      .then(res => {
        if (res.data) {
          const { allCategoreis, taxonomies } = res.data
          const tmpOpts = { ...importOpts }
          localStorage.setItem('bf-options-taxanomy', JSON.stringify(allCategoreis))
          tmpOpts.data = allCategoreis?.filter(item => item.taxonomy === 'category')
          tmpOpts.taxonomies = Object.values(taxonomies)
          tmpOpts.headers = Object.keys(tmpOpts.data[0])
          tmpOpts.lbl = tmpOpts.headers[1]
          tmpOpts.vlu = tmpOpts.headers[0]
          tmpOpts.fieldObject = {
            fieldType: 'taxanomy_field',
            filter: { orderBy: 'term_id', taxanomy: 'category', order: 'ASC' },
            lebel: tmpOpts.lbl,
            value: tmpOpts.vlu,
            oldOpt: [],
            isTaxonomy: false,
          }
          setImportOpts({ ...tmpOpts })
        }
        setLoading(false)
      })
  }, [])

  const handleTaxonomyField = e => {
    const tmpOpts = { ...importOpts }
    if (e.target.checked) {
      tmpOpts.fieldObject.isTaxonomy = true
      tmpOpts.lbl = tmpOpts.headers[1]

      if (tmpOpts?.fieldObject?.filter?.taxanomy === 'category') tmpOpts.vlu = tmpOpts.headers[0]
      else tmpOpts.vlu = tmpOpts.headers[1]
    } else {
      tmpOpts.fieldObject.isTaxonomy = false
    }
    setImportOpts({ ...tmpOpts })
  }

  const handleImportInput = e => {
    const { name, value } = e.target
    const tmpOpts = { ...importOpts }
    tmpOpts[name] = value
    const { fieldObject } = tmpOpts
    fieldObject.filter[name] = value
    const { orderBy, taxanomy, order } = fieldObject.filter
    let allCategories = localStorage.getItem('bf-options-taxanomy')
    allCategories = sortByField(JSON.parse(allCategories), orderBy, order)
    tmpOpts.data = allCategories?.filter(item => item.taxonomy === taxanomy)
    tmpOpts.fieldObject.lebel = tmpOpts?.lbl
    tmpOpts.fieldObject.value = tmpOpts?.vlu
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
          {!!importOpts?.data && (
            <div className="w-10 mr-2">
              <b>Filter by Taxonomy</b>
              <select name="taxanomy" onChange={handleImportInput} value={importOpts.taxanomy || ''} className="btcd-paper-inp mt-1">
                {importOpts?.taxonomies?.map((taxonomy, key) => (
                  <option key={key} value={taxonomy?.name}>{`${taxonomy?.singular_name}-${taxonomy?.name}`}</option>
                ))}
              </select>
            </div>
          )}
          {!!importOpts?.data?.length && (
            <div>
              <div className="w-5 flx">
                <CheckBox onChange={handleTaxonomyField} title={__('Use Post Taxonomy Fields', 'bitform')} checked={importOpts?.fieldObject?.isTaxonomy === true} value={false} />
                <Cooltip width={250} icnSize={17} className="ml-1">
                  <div className="txt-body">
                    if selected then its work also post taxanomy field.
                    <br />
                  </div>
                </Cooltip>
              </div>

              <div className="flx mt-3 w-10">
                <div className="w-5 mr-2">
                  <b>Order By</b>
                  <select name="orderBy" onChange={handleImportInput} value={importOpts.orderBy || ''} className="btcd-paper-inp mt-1">
                    {importOpts?.headers?.map(op => (<option key={op} value={op}>{op}</option>))}
                  </select>
                </div>
                <div className="w-5 mr-2">
                  <b>Order</b>
                  <select name="order" onChange={handleImportInput} value={importOpts.order || ''} className="btcd-paper-inp mt-1">
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                  </select>
                </div>
              </div>

              {importOpts.headers && (
                <div className="flx mt-3 w-10">
                  <div className="w-5 mr-2">
                    <b>Label</b>
                    <select name="lbl" id="" className="btcd-paper-inp mt-1" onChange={handleImportInput} value={importOpts.lbl || ''}>
                      <option disabled>Select Label</option>
                      {importOpts?.fieldObject?.isTaxonomy === false ? (
                        importOpts.headers.map(op => (<option key={op} value={op}>{op}</option>))
                      ) : (<option value={importOpts.vlu}>{importOpts.lbl}</option>)}
                    </select>
                  </div>
                  <div className="w-5">
                    <b>Value</b>
                    <select name="vlu" id="" className="btcd-paper-inp mt-1" onChange={handleImportInput} value={importOpts.vlu || ''}>
                      <option disabled>Select Value</option>
                      {importOpts?.fieldObject?.isTaxonomy === false ? (
                        importOpts.headers.map(op => (<option key={op} value={op}>{op}</option>))
                      ) : (<option value={importOpts.vlu}>{importOpts.vlu}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
