// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useNavigate, useParams } from 'react-router-dom'
import app from '../../../styles/app.style'
import bitsFetch from '../../../Utils/bitsFetch'
import { postFields } from '../../../Utils/StaticData/postField'
import SnackMsg from '../../Utilities/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import SaveIntergrationBrn from '../SaveIntergrationBrn'
import PodsFieldMap from './FieldMap'
import { addFieldMap, checkMappedPodFields, checkMappedPostFields } from './PodHelperFunction'

function EditPod({ formFields, setIntegration, integrations, allIntegURL }) {
  const [types, setTypes] = useState([])
  const [users, setUsers] = useState([])
  const { id } = useParams()
  const history = useNavigate()
  const { css } = useFela()
  const [data, setData] = useState({ ...integrations[id] })
  const [pods, setPods] = useState([])
  const [snack, setSnackbar] = useState({ show: false })

  useEffect(() => {
    bitsFetch({}, 'bitforms_get_pod_type').then((res) => {
      if (res?.success && res !== undefined) {
        setTypes(Object.values(res.data?.post_types))
        setUsers(res.data?.users)
      }
    })

    bitsFetch({ pod_type: data?.post_type }, 'bitforms_get_pod_field').then((res) => {
      if (res?.success && res !== undefined) {
        setPods(Object.values(res?.data))
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getPodsField = (typ, val) => {
    const tmpData = { ...data }
    tmpData[typ] = val
    bitsFetch({ pod_type: val }, 'bitforms_get_pod_field').then((res) => {
      if (res?.success && res !== undefined) {
        setPods(Object.values(res?.data))
        if (res?.data) {
          tmpData.pod_map = Object.values(res.data).filter(fld => fld.required).map(fl => ({ formField: '', podFormField: fl.key, required: fl.required }))
          if (tmpData?.pod_map?.length < 1) {
            tmpData.pod_map = [{}]
          }
        }
        setData(tmpData)
      }
    })
  }

  const saveConfig = () => {
    if (!checkMappedPostFields(data)) {
      setSnackbar({ show: true, msg: __('Please map mandatory fields') })
      return
    }
    if (!checkMappedPodFields(data)) {
      setSnackbar({ show: true, msg: __('Please map mandatory fields') })
      return
    }
    saveIntegConfig(integrations, setIntegration, allIntegURL, data, history, id, 'edit')
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="mt-3"><b>{__('Integration Name ')}</b></div>
      <input
        className="btcd-paper-inp w-5 mt-1"
        onChange={(e) => handleInput(e.target.name, e.target.value)}
        name="name"
        value={data.name}
        type="text"
        placeholder={__('Integration Name...')}
      />

      <div className="mt-3"><b>{__('Post Type')}</b></div>
      <select
        name="post_type"
        onChange={(e) => getPodsField(e.target.name, e.target.value)}
        value={data?.post_type}
        className="btcd-paper-inp w-5 mt-1"
      >
        <option disabled selected>Select Type</option>
        {types.map((type, key) => (
          <option key={`pod-${key * 2}`} value={type.name}>{type.label}</option>
        ))}
      </select>

      <div className="mt-3"><b>{__('Post Status')}</b></div>
      <select
        name="post_status"
        onChange={(e) => handleInput(e.target.name, e.target.value)}
        value={data?.post_status}
        className="btcd-paper-inp w-5 mt-1"
      >
        <option disabled selected>{__('Select Status')}</option>
        <option value="publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="inherit">Inherit</option>
        <option value="auto-draft">Auto-Draft</option>
        <option value="private ">Private</option>
        <option value="pending">Pending</option>
      </select>

      <div className="mt-3"><b>{__('Comment Status')}</b></div>
      <select
        name="comment_status"
        onChange={(e) => handleInput(e.target.name, e.target.value)}
        value={data?.comment_status}
        className="btcd-paper-inp w-5 mt-1"
      >
        <option disabled selected>{__('Select Status')}</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>

      <div className="mt-3"><b>{__('Author')}</b></div>
      <select
        name="post_author"
        onChange={(e) => handleInput(e.target.name, e.target.value)}
        value={data?.post_author}
        className="btcd-paper-inp w-5 mt-1"
      >
        <option disabled selected>Logged In User</option>
        {users.map((user, key) => (
          <option key={`pod-${key * 2}`} value={user.ID}>{user.display_name}</option>
        ))}
        {/* <div style={{ color: 'red' }}>{error.clientSecret}</div> */}
      </select>
      <div>
        <p className="p-1 f-m">
          <strong>Note</strong>
          {' '}
          : All your taxonomies will be mapped automatically from your form fields.
        </p>
      </div>

      <div>
        <div className="mt-3 mb-1"><b>Pod Fields Mapping</b></div>
        <div className="btcd-hr" />
        <div className="flx flx-around mt-2 mb-1">
          <div className="txt-dp"><b>{__('Form Fields')}</b></div>
          <div className="txt-dp"><b>{__('Pod Fields')}</b></div>
        </div>
      </div>
      {
        data.pod_map.map((itm, i) => (
          <PodsFieldMap
            key={`analytics-m-${i + 9}`}
            i={i}
            type="pod"
            field={itm}
            formFields={formFields}
            dataConf={data}
            setDataConf={setData}
            podFields={pods}
          />
        ))
      }
      <div className="txt-center  mt-2" style={{ marginRight: 85 }}>
        <button
          onClick={() => addFieldMap('pod_map', data.pod_map.length, data, setData)}
          className="icn-btn sh-sm"
          type="button"
        >
          +
        </button>
      </div>

      <div>
        <div className="mt-3 mb-1"><b>Post Fields Mapping</b></div>
        <div className="btcd-hr" />
        <div className="flx flx-around mt-2 mb-1">
          <div className="txt-dp"><b>{__('Form Fields')}</b></div>
          <div className="txt-dp"><b>{__('Post Fields')}</b></div>
        </div>
      </div>

      {
        data.post_map.map((itm, i) => (
          <PodsFieldMap
            key={`analytics-m-${i + 9}`}
            i={i}
            type="post"
            field={itm}
            formFields={formFields}
            dataConf={data}
            setDataConf={setData}
            podFields={postFields}
          />
        ))
      }

      <div className="txt-center  mt-2" style={{ marginRight: 85 }}>
        <button
          onClick={() => addFieldMap('post_map', data.post_map.length, data, setData)}
          className="icn-btn sh-sm"
          type="button"
        >
          +
        </button>
      </div>
      {/* <button
        className={`${css(app.btn)} f-left btcd-btn-lg green sh-sm flx`}
        type="button"
        onClick={() => saveConfig()}
      >
        {__('Save')}
        {' '}
      </button> */}
      <SaveIntergrationBrn onClick={() => saveConfig()} />
    </div>
  )
}

export default EditPod
