
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { __ } from '../../../Utils/i18nwrap'
import bitsFetch from '../../../Utils/bitsFetch'
import { addFieldMap, saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import CptFieldMap from './CptFieldMap'

function Cpt({ formFields, setIntegration, integrations, allIntegURL }) {
  const [posts, setPosts] = useState([])

  const history = useHistory()
  const [data, setData] = useState({
    name: 'Custom Post Type',
    type: 'CPT',
    field_map: [],
  })

  const handleInput = (typ, val, isNumber) => {
    const tmpData = { ...data }
    if (isNumber) {
      tmpData[typ] = Number(val)
    } else {
      tmpData[typ] = val
    }
    setData(tmpData)
  }

  useEffect(() => {
    bitsFetch({}, 'bitforms_get_post_type').then((res) => {
      if (res?.success) {
        setPosts(res.data)
      }
    })
  }, [])

  return (
    <div>
      <div className="mt-3"><b>{__('Integration Name ', 'bitform')}</b></div>

      <div className="mt-3"><b>{__('Post Type', 'bitform')}</b></div>
      <select name="post_type" onChange={(e) => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp w-9 mt-1">
        <option disabled selected>Select Type</option>
        {posts.map((post, key) => (
          <option key={key} value={post}>{post}</option>
        ))}
      </select>

      <div className="mt-3"><b>{__('Post Status', 'bitform')}</b></div>
      <select name="post_status" onChange={(e) => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp w-9 mt-1">
        <option disabled selected>{__('Select Status', 'bitform')}</option>
        <option value="publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="inherit">Inherit</option>
        <option value="auto-draft">Auto-Draft</option>
        <option value="private">Private</option>
        <option value="pending">Pending</option>
      </select>

      <div className="mt-3"><b>{__('Comment Status', 'bitform')}</b></div>
      <select name="comment_status" onChange={(e) => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp w-9 mt-1">
        <option disabled selected>{__('Select Status', 'bitform')}</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
      <div>
        <h2>field Mapping</h2>
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
        className="btn f-left btcd-btn-lg green sh-sm flx"
        type="button"
        onClick={() => saveIntegConfig(integrations, setIntegration, allIntegURL, data, history)}
      >
        {__('Save', 'bitform')}
        {' '}
      </button>
    </div>
  )
}

export default Cpt
