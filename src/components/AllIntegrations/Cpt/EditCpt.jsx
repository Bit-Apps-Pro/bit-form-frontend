/* eslint-disable no-param-reassign */
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { __ } from '../../../Utils/i18nwrap'
import SnackMsg from '../../Utilities/SnackMsg'
import bitsFetch from '../../../Utils/bitsFetch'
import CptFieldMap from './CptFieldMap'
import { addFieldMap, saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'

function EditCpt({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id } = useParams()
  const [posts, setPosts] = useState([])
  const [data, setData] = useState({ ...integrations[id] })
  const [snack, setSnackbar] = useState({ show: false })

  useEffect(() => {
    bitsFetch({}, 'bitforms_get_post_type').then((res) => {
      if (res?.success) {
        setPosts(res.data)
      }
    })
  }, [])

  const handleInput = (typ, val, isNumber) => {
    const tmpData = { ...data }
    if (isNumber) {
      tmpData[typ] = Number(val)
    } else {
      tmpData[typ] = val
    }
    setData(tmpData)
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="mt-3"><b>{__('Integration Name ', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={(e) => handleInput(e.target.name, e.target.value)} name="name" value={data.name} type="text" placeholder={__('Integration Name...', 'bitform')} />

      <div className="mt-3"><b>{__('Post Type', 'bitform')}</b></div>
      <select name="post_type" onChange={(e) => handleInput(e.target.name, e.target.value)} value={data.post_type} className="btcd-paper-inp w-9 mt-1">
        {posts.map((post, key) => (
          <option key={key} value={post}>{post}</option>
        ))}
      </select>

      <div className="mt-3"><b>{__('Post Status', 'bitform')}</b></div>
      <select name="post_status" onChange={(e) => handleInput(e.target.name, e.target.value)} value={data.post_status} className="btcd-paper-inp w-9 mt-1">
        <option value="publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="inherit">Inherit</option>
        <option value="auto-draft">Auto-Draft</option>
        <option value="private">Private</option>
        <option value="pending">Pending</option>
      </select>

      <div className="mt-3"><b>{__('Comment Status', 'bitform')}</b></div>
      <select name="comment_status" onChange={(e) => handleInput(e.target.name, e.target.value)} value={data.comment_status} className="btcd-paper-inp w-9 mt-1">
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
      <div>
        <div className="mt-3 mb-1"><b>Field Mapping</b></div>
        <div className="btcd-hr" />
        <div className="flx flx-around mt-2 mb-1">
          <div className="txt-dp"><b>{__('Form Fields', 'bitform')}</b></div>
          <div className="txt-dp"><b>{__('Post Fields', 'bitform')}</b></div>
        </div>
      </div>

      {data.field_map.map((itm, i) => (
        <CptFieldMap
          key={`analytics-m-${i + 9}`}
          i={i}
          field={itm}
          formFields={formFields}
          dataConf={data}
          setDataConf={setData}
        />
      ))}
      <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(data.field_map.length, data, setData)} className="icn-btn sh-sm" type="button">+</button></div>

      <button
        // disabled={biginConf.module === '' || biginConf.field_map.length < 1}
        className="btn f-left btcd-btn-lg green sh-sm flx"
        type="button"
        onClick={() => saveIntegConfig(integrations, setIntegration, allIntegURL, data, history, id, 'edit')}
      >
        {__('Save', 'bitform')}
        {' '}
      </button>
    </div>
  )
}

export default EditCpt
