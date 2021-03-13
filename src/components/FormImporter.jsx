import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n';
import { Link } from 'react-router-dom'
// import bitsFetch from '../Utils/bitsFetch'

export default function FormTemplates() {
  const [importProp, setImportProp] = useState({ prop: [] })
  const [error, setError] = useState({ formDetail: '', prop: '' })
  const handleChange = (ev) => {
    if (error[ev.target.name]) {
      setError({ ...error, [ev.target.name]: '' })
    }
    console.log('ev.target.type', ev.target.type)
    if (ev.target.type === 'checkbox') {

    } else {
      console.log('ev.target.files[0]', ev.target.files[0])
      const file = ev.target.files[0]
      if (file.type !== 'application/json') {
        setError({ ...error, file: 'Please select an exported Bit Form json file' })
        delete ev.target.files[0]
      }
    }
  }
  return (
    <div className="flx flx-around mt-4">
      <div className="fld-wrp">
        <input
          type="file"
          accept=".json"
          name="formDetail"
          onChange={handleChange}
        />
      </div>
      <div className="fld-wrp">
        <div className="no-drg fld btcd-ck-con btcd-round">
          <label className="btcd-ck-wrp">
            <span>All</span>
            <input
              value="all"
              type="checkbox"
              defaultChecked
              // checked={importProp.prop.indexOf('all') >= 0}
              name="prop"
              onChange={handleChange}
            />
            <span className="btcd-mrk ck" />
          </label>
        </div>
      </div>
    </div>
  )
}
