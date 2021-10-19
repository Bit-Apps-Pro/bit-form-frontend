/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import CopyText from '../Utilities/CopyText'
import DropDown from '../Utilities/DropDown'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import Back2FldBtn from './Back2FldBtn'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'

export default function FileUpSettings() {
  console.log('%c $render FileUpSettings', 'background:gray;padding:3px;border-radius:5px;color:white')
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const isRequired = fieldData.valid.req !== undefined
  const isMultiple = fieldData.mul !== undefined
  const adminLabel = fieldData.adminLbl === undefined ? '' : fieldData.adminLbl
  const { upBtnTxt } = fieldData
  const mxUp = fieldData.mxUp === undefined ? '' : fieldData.mxUp
  const exts = fieldData.exts === undefined ? [] : fieldData.exts.split(',._RF_,')
  const options = [
    { label: 'Images', value: '.xbm,.tif,.pjp,.pjpeg,.svgz,.jpg,.jpeg,.ico,.tiff,.gif,.svg,.bmp,.png,.jfif,.webp,.tif' },
    { label: 'Audios', value: '.opus,.flac,.webm,.weba,.wav,.ogg,.m4a,.mp3,.oga,.mid,.amr,.aiff,.wma,.au,.acc,.wpl' },
    { label: 'Videos', value: '.ogm,.wmv,.mpg,.webm,.ogv,.mov,.asx,.mpeg,.mp4,.m4v,.avi,.3g2,.3gp,.flv,.mkv,.swf' },
    { label: 'Documents', value: '.doc,.docx,.odt,.pdf,.rtf,.tex,.txt,.wks,.wps,.wpd' },
    { label: 'Zip', value: '.7z,.arj,.deb,.pkg,.rar,.rpm,.gz,.z,.zip' },
    { label: 'Presentation', value: '.key,.odp,.pps,.ppt,.pptx' },
    { label: 'Spreadsheet', value: '.ods,.xlr,.xls,.xlsx' },
    { label: 'Databases', value: '.csv,.dat,.db,.dbf,.log,.mdb,.sav,.sql,.tar,.sql,.sqlite,.xml' },
  ]

  function setRequired(e) {
    if (e.target.checked) {
      const tmp = { ...fieldData.valid }
      tmp.req = true
      fieldData.valid = tmp
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.req) fieldData.err.req = {}
      fieldData.err.req.dflt = '<p>This field is required</p>'
      fieldData.err.req.show = true
    } else {
      delete fieldData.valid.req
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  function setMultiple(e) {
    if (e.target.checked) {
      fieldData.mul = true
    } else {
      delete fieldData.mul
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete fieldData.adminLbl
    } else {
      fieldData.adminLbl = e.target.value
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  function setUpBtnTxt(e) {
    fieldData.upBtnTxt = e.target.value
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  function setMxUp(e) {
    if (e.target.value === '') {
      delete fieldData.mxUp
      delete fieldData.unit
    } else {
      fieldData.mxUp = e.target.value
      fieldData.unit = 'MB'
    }
    console.log('max', e.target.value, fieldData)
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  function setFileFilter(value) {
    const val = value.map(itm => itm.value)
    if (val.join(',') === '') {
      delete fieldData.exts
    } else {
      fieldData.exts = val.join(',._RF_,')
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  // const setMaxUpTyp = e => {
  //   if (e.target.value) fieldData.mxUpTyp = e.target.value
  //   else delete fieldData.mxUpTyp

  //          // eslint-disable-next-line no-param-reassign
  setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  // }

  // const setUnit = e => {
  //   fieldData.unit = e.target.value
  //          // eslint-disable-next-line no-param-reassign
  setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  // }

  return (
    <div className="ml-2 mr-4">
      <Back2FldBtn />
      <div className="mb-2">
        <span className="font-w-m">Field Type : </span>
        File Upload
      </div>
      <div className="flx">
        <span className="font-w-m w-4">{__('Field Key : ', 'bitform')}</span>
        <CopyText value={fldKey} className="field-key-cpy m-0" />
      </div>
      <FieldLabelSettings />
      <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={adminLabel} action={setAdminLabel} />
      <SingleInput inpType="text" title={__('Upload Button Text:', 'bitform')} value={upBtnTxt} action={setUpBtnTxt} />
      <SingleToggle title={__('Required:', 'bitform')} action={setRequired} isChecked={isRequired} className="mt-2" />
      {isRequired && (
        <ErrorMessageSettings
          type="req"
          title="Error Message"
          tipTitle="By enabling this feature, user will see the error message if any file is not uploaded"
        />
      )}
      <SingleToggle title={__('Allow Multiple:', 'bitform')} action={setMultiple} isChecked={isMultiple} className="mt-3" />
      <div className="mt-3">
        <b>{__('Max Upload Size:', 'bitform')}</b>
        <br />
        {/* {isMultiple && (
          <>
            <CheckBox radio title={__('Combined', 'bitform')} onChange={setMaxUpTyp} checked={!isIndividual} />
            <CheckBox radio title={__('Individual', 'bitform')} value="individual" onChange={setMaxUpTyp} checked={isIndividual} />
          </>
        )} */}
        <div className={`flx ${!isMultiple && 'mt-1'}`}>
          <input type="number" className="btcd-paper-inp" value={mxUp} onChange={setMxUp} placeholder="Any Size" />
          {/* <select id="" className="btcd-paper-inp w-3 ml-2" onChange={setUnit} value={fieldData.unit}>
            <option value="">Unit</option>
            <option value="KB">KB</option>
            <option value="MB">MB</option>
            <option value="GB">GB</option>
          </select> */}
        </div>
      </div>

      {/* {mxUp && (
        <ErrorMessageSettings
          type="maxUp"
          title="Error Message"
        />
      )} */}
      <DropDown className="mt-2 w-10" titleClassName="mt-3 setting-inp" title={__('Allowed File Type:', 'bitform')} isMultiple addable options={options} placeholder={__('Select File Type', 'bitform')} jsonValue action={setFileFilter} value={exts} />
      {/* {exts.length !== 0 && (
        <ErrorMessageSettings
          fldKey={fldKey}
          fieldData={fieldData}
          type="exts"
          title="Error Message"
          updateAction={() =>        // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))}
        />
      )} */}
    </div>
  )
}
