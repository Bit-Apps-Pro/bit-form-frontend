import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import bitsFetch from '../../../Utils/bitsFetch'
import { __ } from '../../../Utils/i18nwrap'
import { postFields } from '../../../Utils/StaticData/postField'
import Cooltip from '../../Utilities/Cooltip'
import SnackMsg from '../../Utilities/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import { addFieldMap, checkMappedAcfFields, checkMappedPostFields } from './AcfHelperFunction'
import FieldMap from './FieldMap'

function Acf({ formFields, setIntegration, integrations, allIntegURL }) {
  const [postTypes, setPostTypes] = useState([])
  const [users, setUsers] = useState([])
  const [snack, setSnackbar] = useState({ show: false })
  const history = useHistory()
  const [acfFields, setAcfFields] = useState([])
  const [metaFields, setMetaFields] = useState([])

  const [data, setData] = useState({
    name: 'CPT/Post Creation',
    type: 'ACF',
    post_map: [{}],
    acf_map: [{}],
    meta_map: [{}],
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

  const getCustomFields = (typ, val) => {
    const tmpData = { ...data }
    tmpData[typ] = val
    bitsFetch({ post_type: val }, 'bitforms_get_custom_field').then((res) => {
      if (res?.success && res !== undefined) {
        setAcfFields(res?.data?.acfFields)
        if (res?.data?.acfFields) {
          tmpData.acf_map = res?.data?.acfFields.filter(fld => fld.required).map(fl => ({ formField: '', acfField: fl.key, required: fl.required }))
          if (tmpData?.acf_map?.length < 1) {
            tmpData.acf_map = [{}]
          }
        }
        setData(tmpData)
      }
    })
  }

  useEffect(() => {
    bitsFetch({}, 'bitforms_get_post_type').then((res) => {
      if (res?.success) {
        setPostTypes(Object.values(res?.data?.post_types))
        setUsers(res?.data?.users)
      }
    })

    const newConf = { ...data }
    newConf.post_map = postFields.filter(fld => fld.required).map(fl => ({ formField: '', postField: fl.key, required: fl.required }))
    setData(newConf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveConfig = () => {
    if (!data.post_type) {
      setSnackbar({ show: true, msg: __('Post Type cann\'t be empty', 'bitform') })
      return
    }
    if (!data.post_status) {
      setSnackbar({ show: true, msg: __('Post Status cann\'t be empty', 'bitform') })
      return
    }
    if (!checkMappedPostFields(data)) {
      setSnackbar({ show: true, msg: __('Please map mandatory fields', 'bitform') })
      return
    }
    if (!checkMappedAcfFields(data)) {
      setSnackbar({ show: true, msg: __('Please map mandatory fields', 'bitform') })
      return
    }
    saveIntegConfig(integrations, setIntegration, allIntegURL, data, history)
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="mt-3"><b>{__('Integration Name ', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-5 mt-1" onChange={(e) => handleInput(e.target.name, e.target.value)} name="name" value={data.name} type="text" placeholder={__('Integration Name...', 'bitform')} />

      <div className="mt-3 flx">
        <b>{__('Post Type', 'bitform')}</b>
        <Cooltip width={250} icnSize={17} className="ml-2">
          <div className="txt-body">
            Select one of the defined WordPress post types Or custom post types for the post.
            <br />
          </div>
        </Cooltip>
      </div>
      <div>
        <select name="post_type" onChange={(e) => getCustomFields(e.target.name, e.target.value)} className="btcd-paper-inp w-5 mt-1">
          <option disabled selected>Select Post Type</option>
          {postTypes.map((postType, key) => (
            <option key={`acf-${key * 2}`} value={postType?.name}>{postType?.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <b>{__('Post Status', 'bitform')}</b>
        <Cooltip width={250} icnSize={17} className="ml-2">
          <div className="txt-body">
            Select the status for the post. If published status is selected and the post date is in the future, it will automatically be changed to scheduled
            <br />
          </div>
        </Cooltip>
      </div>
      <select name="post_status" onChange={(e) => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp w-5 mt-2">
        <option disabled selected>{__('Select Status', 'bitform')}</option>
        <option value="publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="auto-draft">Auto-Draft</option>
        <option value="private">Private</option>
        <option value="pending">Pending</option>
      </select>

      <div className="mt-3 flx">
        <b>{__('Author', 'bitform')}</b>
        <Cooltip width={250} icnSize={17} className="ml-2">
          <div className="txt-body">
            Select the user to be assigned to the post.
            <br />
          </div>
        </Cooltip>
      </div>
      <div>
        <select name="post_author" onChange={(e) => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp w-5 mt-2">
          <option disabled selected>{__('Select Author', 'bitform')}</option>
          {users.map((user, key) => (
            <option key={`acf-${key * 2}`} value={user.ID}>{user.display_name}</option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <b>{__('Comment Status', 'bitform')}</b>

      </div>
      <select name="comment_status" onChange={(e) => handleInput(e.target.name, e.target.value)} className="btcd-paper-inp w-5 mt-2">
        <option disabled selected>{__('Select Status', 'bitform')}</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>

      <div>
        <div className="mt-3 mb-1"><b>{__('Field Mapping', 'bitform')}</b></div>
        <div className="btcd-hr" />
        <div className="flx flx-around mt-2 mb-1">
          <div className="txt-dp"><b>{__('Form Fields', 'bitform')}</b></div>
          <div className="txt-dp"><b>{__('Post Fields', 'bitform')}</b></div>
        </div>
      </div>
      {data.post_map.map((itm, i) => (
        <FieldMap
          key={`analytics-m-${i + 9}`}
          i={i}
          type="post"
          field={itm}
          formFields={formFields}
          dataConf={data}
          setDataConf={setData}
          customFields={postFields}
        />
      ))}
      <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap('post_map', data.post_map.length, data, setData)} className="icn-btn sh-sm" type="button">+</button></div>
      <div>
        <p className="p-1 f-m">
          <strong>Note</strong>
          {' '}
          : All your taxonomies will be mapped automatically from your form fields.
        </p>
      </div>
      <div>
        <div>
          <div className="mt-3 mb-1"><b>{__('Meta Fields Mapping', 'bitform')}</b></div>
          <div className="btcd-hr" />
          <div className="flx flx-around mt-2 mb-1">
            <div className="txt-dp"><b>{__('Form Fields', 'bitform')}</b></div>
            <div className="txt-dp"><b>{__('Meta Key', 'bitform')}</b></div>
          </div>
        </div>
        {
          data?.meta_map?.map((itm, i) => (
            <FieldMap
              key={`analytics-m-${i + 9}`}
              i={i}
              type="meta"
              field={itm}
              formFields={formFields}
              dataConf={data}
              setDataConf={setData}
              customFields={metaFields}
            />
          ))
        }

        <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap('meta_map', data.meta_map.length, data, setData)} className="icn-btn sh-sm" type="button">+</button></div>
      </div>

      <div>
        <div>
          <div className="mt-3 mb-1"><b>{__('Advanced Custom Fields (ACF) Mapping', 'bitform')}</b></div>
          <div className="btcd-hr" />
          <div className="flx flx-around mt-2 mb-1">
            <div className="txt-dp"><b>{__('Form Fields', 'bitform')}</b></div>
            <div className="txt-dp">
              <b>{__('ACF Fields', 'bitform')}</b>
              <button className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': `'${__('Refresh ACF Field List', 'bitform')}'` }} type="button">&#x21BB;</button>
            </div>
          </div>
        </div>
        {
          data.acf_map.map((itm, i) => (
            <FieldMap
              key={`analytics-m-${i + 9}`}
              i={i}
              type="acf"
              field={itm}
              formFields={formFields}
              dataConf={data}
              setDataConf={setData}
              customFields={acfFields}
            />
          ))
        }

        <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap('acf_map', data.acf_map.length, data, setData)} className="icn-btn sh-sm" type="button">+</button></div>
      </div>
      <button
        className="btn f-left btcd-btn-lg green sh-sm flx"
        type="button"
        onClick={() => saveConfig()}
      >
        {__('Save', 'bitform')}
        {' '}
      </button>

    </div>
  )
}

export default Acf
