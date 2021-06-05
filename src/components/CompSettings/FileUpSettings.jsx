/* eslint-disable no-param-reassign */
import { useRecoilValue } from 'recoil'
import { __ } from '../../Utils/i18nwrap'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import DropDown from '../Utilities/DropDown'
import CopyText from '../Utilities/CopyText'
import Back2FldList from './Back2FldList'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import { deepCopy } from '../../Utils/Helpers'
import { $fields } from '../../GlobalStates'

export default function FileUpSettings({ elm, updateData, setElementSetting }) {
  console.log('%c $render FileUpSettings', 'background:gray;padding:3px;border-radius:5px;color:white')
  const elmId = props.elm.id
  const fields = useRecoilValue($fields)
  const elmData = deepCopy(fields[elmId])
  const isRequired = elmData.valid.req !== undefined
  const isMultiple = elmData.mul !== undefined
  const label = elmData.lbl === undefined ? '' : elmData.lbl
  const adminLabel = elmData.adminLbl === undefined ? '' : elmData.adminLbl
  const { upBtnTxt } = elmData
  const mxUp = elmData.mxUp === undefined ? '' : elmData.mxUp
  const exts = elmData.exts === undefined ? [] : elmData.exts.split(',._RF_,')
  const fldKey = elmId
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
  const isIndividual = elmData.mxUpTyp === 'individual'

  function setRequired(e) {
    if (e.target.checked) {
      elmData.valid.req = true
      if (!elmData.err) elmData.err = {}
      if (!elmData.err.req) elmData.err.req = {}
      elmData.err.req.dflt = '<p>This field is required</p>'
      elmData.err.req.show = true
    } else {
      delete elmData.valid.req
    }
    updateData(elm)
  }

  function setMultiple(e) {
    if (e.target.checked) {
      elmData.mul = true
    } else {
      delete elmData.mul
    }
    updateData(elm)
  }

  function setLabel(e) {
    if (e.target.value === '') {
      delete elmData.lbl
    } else {
      elmData.lbl = e.target.value
    }
    updateData(elm)
  }

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete elmData.adminLbl
    } else {
      elmData.adminLbl = e.target.value
    }
    updateData(elm)
  }

  function setUpBtnTxt(e) {
    elmData.upBtnTxt = e.target.value
    updateData(elm)
  }

  function setMxUp(e) {
    if (e.target.value === '') {
      delete elmData.mxUp
      delete elmData.unit
    } else {
      elmData.mxUp = e.target.value
      elmData.unit = 'MB'
    }
    updateData(elm)
  }

  function setFileFilter(value) {
    const val = value.map(itm => itm.value)
    if (val.join(',') === '') {
      delete elmData.exts
    } else {
      elmData.exts = val.join(',._RF_,')
    }
    updateData(elm)
  }

  const setMaxUpTyp = e => {
    if (e.target.value) elmData.mxUpTyp = e.target.value
    else delete elmData.mxUpTyp

    updateData(elm)
  }

  const setUnit = e => {
    elmData.unit = e.target.value
    updateData(elm)
  }

  return (
    <div className="ml-2 mr-4">
      <Back2FldList setElementSetting={setElementSetting} />
      <div className="mb-2">
        <span className="font-w-m">Field Type : </span>
        File Upload
      </div>
      <div className="flx">
        <span className="font-w-m w-4">{__('Field Key : ', 'bitform')}</span>
        <CopyText value={fldKey} setSnackbar={() => { }} className="field-key-cpy m-0" />
      </div>
      <SingleInput inpType="text" title={__('Label:', 'bitform')} value={label} action={setLabel} />
      <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={adminLabel} action={setAdminLabel} />
      <SingleInput inpType="text" title={__('Upload Button Text:', 'bitform')} value={upBtnTxt} action={setUpBtnTxt} />
      <SingleToggle title={__('Required:', 'bitform')} action={setRequired} isChecked={isRequired} className="mt-2" />
      {isRequired && (
        <ErrorMessageSettings
          elmId={elmId}
          elmData={elmData}
          type="req"
          title="Error Message"
          updateAction={() => updateData(elm)}
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
          <input type="number" className="btcd-paper-inp" value={mxUp} action={setMxUp} placeholder="Any Size" />
          {/* <select id="" className="btcd-paper-inp w-3 ml-2" onChange={setUnit} value={elmData.unit}>
            <option value="">Unit</option>
            <option value="KB">KB</option>
            <option value="MB">MB</option>
            <option value="GB">GB</option>
          </select> */}
        </div>
      </div>

      {mxUp && (
        <ErrorMessageSettings
          elmId={elmId}
          elmData={elmData}
          type="maxUp"
          title="Error Message"
          updateAction={() => updateData(elm)}
        />
      )}
      <DropDown className="mt-2 w-10" titleClassName="mt-3 setting-inp" title={__('Allowed File Type:', 'bitform')} isMultiple addable options={options} placeholder={__('Select File Type', 'bitform')} jsonValue action={setFileFilter} value={exts} />
      {exts.length !== 0 && (
        <ErrorMessageSettings
          elmId={elmId}
          elmData={elmData}
          type="exts"
          title="Error Message"
          updateAction={() => updateData(elm)}
        />
      )}
    </div>
  )
}
