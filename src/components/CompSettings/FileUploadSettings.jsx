/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $updateBtn } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import CheckBoxMini from '../Utilities/CheckBoxMini'
import DropDown from '../Utilities/DropDown'
import SingleToggle from '../Utilities/SingleToggle'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from './StyleCustomize/ChildComp/SizeControl'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function FileUploadSettings() {
  console.log('%c $render FileUpSettings', 'background:gray;padding:3px;border-radius:5px;color:white')
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const { css } = useFela()

  const fieldData = deepCopy(fields[fldKey])
  const { multiple, maxSize, sizeUnit, isItTotalMax, fileSelectStatus, allowedFileType, showFileList, showFileSize, duplicateAllow, minFile, maxFile } = fieldData.config
  const isRequired = fieldData.valid.req !== undefined
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

  function maxSizeHandler(unit, value) {
    console.log('Unit=', unit)
    console.log('Value=', value)
  }
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

  const hideAdminLabel = (e) => {
    if (e.target.checked) {
      fieldData.adminLbl = fieldData.lbl || fldKey
      fieldData.adminLblHide = true
    } else {
      fieldData.adminLblHide = false
      delete fieldData.adminLbl
    }
    const req = e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Admin label ${req}:  ${fieldData.lbl || adminLabel || fldKey}`, type: `adminlabel_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setMultiple(e) {
    if (e.target.checked) {
      fieldData.config.multiple = true
    } else {
      fieldData.config.multiple = false
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
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Admin label updated: ${adminLabel || fieldData.lbl || fldKey}`, type: 'change_adminlabel', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setUpBtnTxt(e) {
    fieldData.upBtnTxt = e.target.value
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

  function setIsItTotalMax(value) {
    console.log('total max value=', value)
  }

  return (
    <>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />

      <FieldLabelSettings />

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Admin Label', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={hideAdminLabel}
        toggleChecked={fieldData?.adminLblHide}
        open={fieldData?.adminLblHide}
        disable={!fieldData?.adminLblHide}
      >
        <div className={css(FieldStyle.placeholder)}>
          <AutoResizeInput
            ariaLabel="Admin label for this Field"
            placeholder="Type Admin label here..."
            value={adminLabel}
            changeAction={setAdminLabel}
          />
        </div>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />
      <SimpleAccordion
        title={__('Upload Button Text:', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <input
          className={css(FieldStyle.input)}
          type="text"
          value={upBtnTxt}
          onChange={setUpBtnTxt}
        />
      </SimpleAccordion>
      {/* <div className={css(FieldStyle.fieldSection)}>

      </div> */}

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Required', 'bitform')}
        // eslint-disable-next-line react/jsx-no-bind
        toggleAction={setRequired}
        toggleChecked={isRequired}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip="By enabling this feature, user will see the error message when input is empty"
        tipProps={{ width: 200, icnSize: 17 }}
        open={isRequired}
        disable={!isRequired}
      >
        <ErrorMessageSettings
          type="req"
          title="Error Message"
          tipTitle="By enabling this feature, user will see the error message when input is empty"
        />
      </SimpleAccordion>
      {/* <SingleToggle title={__('Required', 'bitform')} action={setRequired} isChecked={isRequired} className={css(FieldStyle.fieldSection)} /> */}
      <hr className={css(FieldStyle.divider)} />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Allow Multiple:', 'bitform')}
        action={setMultiple}
        isChecked={multiple}
      />

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Max Upload Size', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <SizeControl
            className={css(ut.w10, ut.mt1, ut.mb1)}
            inputHandler={({ unit, value }) => maxSizeHandler(unit, value)}
            sizeHandler={({ unitKey, unitValue }) => maxSizeHandler(unitKey, unitValue)}
            value={12}
            unit="MB"
            width="128px"
            options={['Bytes', 'KB', 'MB', 'GB']}
            step={1}
            max={1024}
          />
          <CheckBoxMini className={`${css(ut.mr2)} ${css(ut.fw500)} `} checked={isItTotalMax} title={__('Total Maximum Size', 'bitform')} onChange={setIsItTotalMax} />
          {/* <input
            aria-label="File upload setting"
            placeholder="Any Size"
            type="number"
            className={css(FieldStyle.input)}
            value={mxUp}
            onChange={setMxUp}
          /> */}
        </div>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <div className={css(FieldStyle.fieldSection)}>
        <DropDown className="w-10" titleClassName="title" title={__('Allowed File Type:', 'bitform')} isMultiple addable options={options} placeholder={__('Select File Type', 'bitform')} jsonValue action={setFileFilter} value={exts} />
      </div>

      <hr className={css(FieldStyle.divider)} />

      {/* <div className="">
          <b>{__('Max Upload Size:', 'bitform')}</b>
          <br />
          <div className={css(ut.flxb)}>
            <input type="number" className="btcd-paper-inp" value={mxUp} onChange={setMxUp} placeholder="Any Size" aria-label="File upload setting" />
          </div>
        </div> */}

      {/* <DropDown className="w-10" titleClassName="mt-3 setting-inp" title={__('Allowed File Type:', 'bitform')} isMultiple addable options={options} placeholder={__('Select File Type', 'bitform')} jsonValue action={setFileFilter} value={exts} />
      </div> */}
    </>
  )
}
