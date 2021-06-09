/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
import { useEffect, useState } from 'react'
import LoaderSm from '../../Loaders/LoaderSm'
import { sortByField } from '../../../Utils/Helpers'

const getTrimmedString = str => (typeof str === 'string' ? str?.trim() : str?.toString())
export const generateUserOptions = (importOpts, lblKey, valKey) => {
  const { data, lbl, vlu } = importOpts
  if (!data || !lbl || !vlu) return []
  const presets = data
  return presets.map(op => ({ [lblKey]: getTrimmedString(op[lbl]), [valKey]: getTrimmedString(op[vlu]) }))
}

export default function UserImportOption({ importOpts, setImportOpts }) {
  const isPro = typeof bits !== 'undefined' && bits.isPro
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isPro) return

    const uri = new URL(bits.ajaxURL)
    uri.searchParams.append('action', 'bitforms_get_wp_users')
    uri.searchParams.append('_ajax_nonce', typeof bits === 'undefined' ? '' : bits.nonce)

    setLoading(true)
    fetch(uri)
      .then(resp => resp.json())
      .then(res => {
        if (res.data) {
          const { users } = res.data
          const tmpOpts = { ...importOpts }
          tmpOpts.data = users
          localStorage.setItem('bf-options-users', JSON.stringify(users))
          tmpOpts.headers = Object.keys(tmpOpts.data[0])
          tmpOpts.lbl = tmpOpts.headers[0]
          tmpOpts.vlu = tmpOpts.headers[0]
          tmpOpts.fieldObject = {
            fieldType: 'user_field',
            filter: { orderBy: 'ID', role: 'all', order: 'ASC' },
            lebel: tmpOpts.lbl,
            value: tmpOpts.vlu,
            oldOpt: [],
          }
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
    const { fieldObject } = tmpOpts
    fieldObject.filter[name] = value
    const { orderBy, order, role } = fieldObject.filter
    let users = localStorage.getItem('bf-options-users')
    users = sortByField(JSON.parse(users), orderBy, order)
    if (role !== 'all') tmpOpts.data = users?.filter(item => item.role[0] === role)
    else tmpOpts.data = users
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
              <b>Filter by Role</b>
              <select name="role" onChange={handleImportInput} value={importOpts.role || ''} className="btcd-paper-inp mt-1">
                <option selected disabled>select role</option>
                <option value="all">all</option>
                <option value="administrator">Administrator</option>
                <option value="author">Author</option>
                <option value="contributor">Contributor</option>
                <option value="editor">Editor</option>
                <option value="subscriber">Subscriber</option>
              </select>
            </div>
          )}

          {!!importOpts?.data?.length && (
            <div>
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
                      <option value="">Select Label</option>
                      {importOpts.headers.map(op => (<option key={op} value={op}>{op}</option>))}
                    </select>
                  </div>
                  <div className="w-5">
                    <b>Value</b>
                    <select name="vlu" id="" className="btcd-paper-inp mt-1" onChange={handleImportInput} value={importOpts.vlu || ''}>
                      <option value="">Select Value</option>
                      {importOpts.headers.map(op => (<option key={op} value={op}>{op}</option>))}
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
