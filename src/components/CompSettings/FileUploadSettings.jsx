/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { isDev } from '../../Utils/config'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { addDefaultStyleClasses, iconElementLabel, isStyleExist, setIconFilterValue, styleClasses } from '../style-new/styleHelpers'
import CheckBoxMini from '../Utilities/CheckBoxMini'
import DropDown from '../Utilities/DropDown'
import Modal from '../Utilities/Modal'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldDisabledSettings from './CompSettingsUtils/FieldDisabledSettings'
import FieldHideSettings from './CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldNameSettings from './CompSettingsUtils/FieldNameSettings'
import FieldReadOnlySettings from './CompSettingsUtils/FieldReadOnlySettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from './CompSettingsUtils/HelperTxtSettings'
import RequiredSettings from './CompSettingsUtils/RequiredSettings'
import SubTitleSettings from './CompSettingsUtils/SubTitleSettings'
import Icons from './Icons'
import FieldIconSettings from './StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from './StyleCustomize/ChildComp/SizeControl'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function FileUploadSettings() {
  console.log('%c $render FileUpSettings', 'background:gray;padding:3px;border-radius:5px;color:white')
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const styles = useRecoilValue($styles)
  const { css } = useFela()
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')

  const fieldData = deepCopy(fields[fldKey])
  const { multiple, allowMaxSize, showMaxSize, maxSizeLabel, maxSize, sizeUnit, isItTotalMax, showSelectStatus, fileSelectStatus, allowedFileType, showFileList, fileExistMsg, showFilePreview, showFileSize, duplicateAllow } = fieldData.config
  let { minFile, maxFile } = fieldData.config
  minFile = isNaN(minFile) ? 0 : Number(minFile)
  maxFile = isNaN(maxFile) ? 0 : Number(maxFile)
  const { btnTxt } = fieldData
  const existType = allowedFileType ? allowedFileType.split(',._RF_,') : []
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
    fieldData.config.maxSize = value
    fieldData.config.sizeUnit = unit
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Modify Maximum size to ${value}${unit}: ${fieldData.lbl || fldKey}`, type: 'modify_maximum_size', state: { fields: allFields, fldKey } })
  }

  // function setFileSelectStatus(e) {
  //   fieldData.config.fileSelectStatus = e.target.value
  //   setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  // }

  function setConfigValue(propName, value) {
    fieldData.config[propName] = value
    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `${propNameLabel[propName]} '${String(value || 'Off').replace('true', 'On')}': ${fieldData.lbl || fldKey}`, type: `${propName}_changed`, state: { fields: allFields, fldKey } })
  }

  function setMinMaxValueConfig(propName, value) {
    value = isNaN(value) ? 0 : Number(value)
    if (value >= 0) {
      if (propName === 'maxFile' && minFile && value < minFile && minFile) {
        console.log('minFile=', typeof minFile)
        fieldData.config.minFile = value
        fieldData.err.minFile.dflt = `Minimum ${value} File Required`
      } else if (propName === 'minFile' && value > maxFile && maxFile) {
        console.log('maxFile=', typeof maxFile)
        fieldData.config.maxFile = value
        fieldData.err.maxFile.dflt = `Maximum ${value} File can uploaded`
      }
      if (propName === 'minFile') fieldData.err.minFile.dflt = `Minimum ${value} File Required`
      else if (propName === 'maxFile') fieldData.err.maxFile.dflt = `Maximum ${value} File can uploaded`

      fieldData.config[propName] = value
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
      addToBuilderHistory({ event: `${propNameLabel[propName]} '${String(value || 'Off').replace('true', 'On')}': ${fieldData.lbl || fldKey}`, type: `${propName}_changed`, state: { fields: allFields, fldKey } })
    }
  }

  function setUpBtnTxt(e) {
    fieldData.btnTxt = e.target.value
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `Button Text Modify: ${fieldData.lbl || fldKey}`, type: 'modify_button_text', state: { fields: allFields, fldKey } })
  }

  const setIconModel = (typ) => {
    if (!isStyleExist(styles, fldKey, styleClasses[typ])) addDefaultStyleClasses(selectedFieldId, typ)
    setIconFilterValue(typ, fldKey)
    setIcnType(typ)
    setIcnMdl(true)
  }

  const removeIcon = (iconType) => {
    if (fieldData[iconType]) {
      delete fieldData[iconType]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
      addToBuilderHistory({ event: `${iconElementLabel[iconType]} Icon Deleted`, type: `delete_${iconType}`, state: { fldKey, fields: allFields } })
    }
  }

  function setAllowedFileType(value) {
    const val = value.map(itm => itm.value)
    if (val.join(',') === '') {
      fieldData.config.allowedFileType = ''
    } else {
      fieldData.config.allowedFileType = val.join(',._RF_,')
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    // eslint-disable-next-line no-param-reassign
    setFields(allFields)
    addToBuilderHistory({ event: `Changed Allowed File Type: ${fieldData.lbl || fldKey}`, type: 'allow_file_type', state: { fldKey, fields: allFields } })
  }

  if (isDev) {
    window.selectedFieldData = fieldData
  }

  return (
    <>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />

      <FieldLabelSettings />

      <FieldSettingsDivider />

      <AdminLabelSettings />

      <FieldSettingsDivider />

      <SubTitleSettings />

      <FieldSettingsDivider />

      <SimpleAccordion
        id="upld-btn-txt-stng"
        title={__('Upload Button Text:')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <input
          data-testid="upld-btn-txt-inp"
          className={css(FieldStyle.input)}
          type="text"
          value={btnTxt}
          onChange={setUpBtnTxt}
        />
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="btn-icn-stng"
        title={__('Button Icons')}
        className={css(FieldStyle.fieldSection)}
        toggleChecked
        open
      >
        <div className={css(ut.mt1)}>
          <FieldIconSettings
            label="Leading Icon"
            iconSrc={fieldData?.prefixIcn}
            styleRoute="pre-i"
            setIcon={() => setIconModel('prefixIcn')}
            removeIcon={() => removeIcon('prefixIcn')}
          />

          <FieldIconSettings
            label="Trailing Icon"
            iconSrc={fieldData?.suffixIcn}
            styleRoute="suf-i"
            setIcon={() => setIconModel('suffixIcn')}
            removeIcon={() => removeIcon('suffixIcn')}
          />

        </div>

      </SimpleAccordion>

      <FieldSettingsDivider />

      <HelperTxtSettings />

      <FieldSettingsDivider />

      <FieldNameSettings />

      <FieldSettingsDivider />

      <RequiredSettings />

      <FieldSettingsDivider />

      <FieldReadOnlySettings />

      <FieldSettingsDivider />

      <FieldDisabledSettings />

      <FieldSettingsDivider />

      <FieldHideSettings />

      <FieldSettingsDivider />

      <SimpleAccordion
        id="alw-mltpl-stng"
        title={__('Allow Multiple:')}
        // eslint-disable-next-line react/jsx-no-bind
        toggleAction={e => setConfigValue('multiple', e.target.checked)}
        toggleChecked={multiple}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip="By enabling this feature, you wil enable to select multiple file control file upload limit"
        tipProps={{ width: 200, icnSize: 17 }}
        open={multiple}
        disable={!multiple}
      >
        <div className={css(ut.ml1, ut.mr1)}>
          <div className={css(ut.flxc)}>
            <span>Minimum File</span>
            <input
              data-testid="alw-mltpl-min-inp"
              className={css(FieldStyle.input, ut.w5, ut.mt1)}
              type="number"
              value={minFile}
              onChange={e => setMinMaxValueConfig('minFile', e.target.value)}
            />
          </div>
          <ErrorMessageSettings
            className={css(ut.mt0)}
            id="min-fil-err-msg"
            type="minFile"
            defaultMsg={`Minimum ${minFile} File Required`}
            allowIcons={false}
          />
          <div className={css(ut.flxc, ut.mt2)}>
            <span>Maximum File</span>
            <input
              data-testid="alw-mltpl-max-inp"
              className={css(FieldStyle.input, ut.w5, ut.mt1)}
              type="number"
              value={maxFile}
              onChange={e => setMinMaxValueConfig('maxFile', e.target.value)}
            />
          </div>
          <ErrorMessageSettings
            className={css(ut.mt0)}
            id="max-fil-err-msg"
            type="maxFile"
            defaultMsg={`Maximum ${maxFile} File can uploaded`}
            allowIcons={false}
          />

        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="fil-slct-stts-stng"
        title={__('File Select Status')}
        // eslint-disable-next-line react/jsx-no-bind
        toggleAction={e => setConfigValue('showSelectStatus', e.target.checked)}
        toggleChecked={showSelectStatus}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, ut.px10)}
        switching
        tip="By enabling this feature, you will see file select status"
        tipProps={{ width: 200, icnSize: 17 }}
        open={showSelectStatus}
        disable={!showSelectStatus}
      >
        <input
          data-testid="fil-slct-stts-inp"
          className={css(FieldStyle.input)}
          type="text"
          value={fileSelectStatus}
          onChange={e => setConfigValue('fileSelectStatus', e.target.value)}
        />
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="shw-mxmm-siz-stng"
        title={__('Show Maximum Size')}
        // eslint-disable-next-line react/jsx-no-bind
        toggleAction={e => setConfigValue('showMaxSize', e.target.checked)}
        toggleChecked={showMaxSize}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip="By disabling this option, the field show maximum size will be hidden"
        tipProps={{ width: 200, icnSize: 17 }}
        open={showMaxSize}
        disable={!showMaxSize}
      >
        <input
          data-testid="fil-slct-stts-inp"
          className={css(FieldStyle.input)}
          type="text"
          value={maxSizeLabel}
          placeholder="Write a Max Size Label Ex:(Max 2MB)"
          onChange={e => setConfigValue('maxSizeLabel', e.target.value)}
        />
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="mxmm-upld-siz-stng"
        title={__('Allow Maximum Upload Size')}
        toggleAction={e => setConfigValue('allowMaxSize', e.target.checked)}
        toggleChecked={allowMaxSize}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        switching
        tip="By enabling this feature, you will limit the upload size"
        tipProps={{ width: 200, icnSize: 17 }}
        open={allowMaxSize}
        disable={!allowMaxSize}
      >
        <div className={css(FieldStyle.placeholder)}>
          <SizeControl
            dataTestId="mxmm-upld-siz"
            className={css(ut.w10, ut.mt2, ut.mb1)}
            inputHandler={({ unit, value }) => maxSizeHandler(unit, value)}
            sizeHandler={({ unitKey, unitValue }) => maxSizeHandler(unitKey, unitValue)}
            value={maxSize}
            unit={sizeUnit}
            width="128px"
            options={['Bytes', 'KB', 'MB', 'GB']}
            step={1}
            max={1024}
          />
          {multiple && (
            <CheckBoxMini
              id="ttl-mxmm-siz"
              className={`${css(ut.mr2, ut.ml1, ut.fw500)} `}
              checked={isItTotalMax}
              title={__('Total Maximum Size')}
              onChange={e => setConfigValue('isItTotalMax', e.target.checked)}
            />
          )}
          <ErrorMessageSettings
            id="mxmm-upld-siz"
            type="maxSize"
            defaultMsg="Max Upload Size Exceeded"
            allowIcons={false}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="shw-fil-lst-stng"
        title={__('Show File List')}
        // eslint-disable-next-line react/jsx-no-bind
        toggleAction={e => setConfigValue('showFileList', e.target.checked)}
        toggleChecked={showFileList}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, ut.px10)}
        switching
        tip="By enabling this feature, you will see file select status"
        tipProps={{ width: 200, icnSize: 17 }}
        open={showFileList}
        disable={!showFileList}
      >
        <div className={css(ut.ml1)}>
          <CheckBoxMini
            id="shw-fil-prvw"
            className={`${css(ut.mr2, ut.mt2)} ${css(ut.fw500)} `}
            checked={showFilePreview}
            title={__('Show File Preview')}
            onChange={e => setConfigValue('showFilePreview', e.target.checked)}
          />
          <CheckBoxMini
            id="shw-fil-siz"
            className={`${css(ut.mr2, ut.mt2)} ${css(ut.fw500)} `}
            checked={showFileSize}
            title={__('Show File Size')}
            onChange={e => setConfigValue('showFileSize', e.target.checked)}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="fil-exst-err-msg"
        title={__('File Exist Message')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <input
          data-testid="fil-exst-msg-inp"
          className={css(FieldStyle.input)}
          type="text"
          value={fileExistMsg}
          onChange={e => setConfigValue('fileExistMsg', e.target.value)}
        />
      </SimpleAccordion>

      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <DropDown
          className="w-10"
          titleClassName="title"
          title={__('Allowed File Type:')}
          isMultiple
          addable
          options={options}
          placeholder={__('Select File Type')}
          jsonValue
          action={setAllowedFileType}
          value={existType}
        />
      </div>

      <FieldSettingsDivider />

      <Modal
        md
        autoHeight
        show={icnMdl}
        setModal={setIcnMdl}
        className="o-v"
        title={__('Icons')}
      >
        <div className="pos-rel" />
        <Icons addPaddingOnSelect={false} iconType={icnType} setModal={setIcnMdl} />
      </Modal>
    </>
  )
}

const propNameLabel = {
  multiple: 'Allow Multiple',
  minFile: 'Change Minimum File to',
  maxFile: 'Change Maximum File to',
  showSelectStatus: 'Show Selected Status',
  fileSelectStatus: 'File Select Status',
  showMaxSize: 'Show Maximum Size',
  isItTotalMax: 'Total Maximum',
  showFileList: 'Show File List',
  showFilePreview: 'Show File Preview',
  showFileSize: 'Show File Size',
}
