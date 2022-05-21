/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $selectedFieldId, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { addDefaultStyleClasses, isStyleExist, setIconFilterValue, styleClasses } from '../style-new/styleHelpers'
import CheckBoxMini from '../Utilities/CheckBoxMini'
import DropDown from '../Utilities/DropDown'
import Modal from '../Utilities/Modal'
import SingleToggle from '../Utilities/SingleToggle'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import FieldDisabledSettings from './CompSettingsUtils/FieldDisabledSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
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
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const styles = useRecoilValue($styles)
  const { css } = useFela()
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')

  const fieldData = deepCopy(fields[fldKey])
  const { multiple, showMaxSize, maxSize, sizeUnit, isItTotalMax, showSelectStatus, fileSelectStatus, allowedFileType, showFileList, showFilePreview, showFileSize, duplicateAllow, minFile, maxFile } = fieldData.config
  const adminLabel = fieldData.adminLbl === undefined ? '' : fieldData.adminLbl
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
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  // function setFileSelectStatus(e) {
  //   fieldData.config.fileSelectStatus = e.target.value
  //   setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  // }

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

  function setConfigValue(propName, value) {
    fieldData.config[propName] = value
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  function setUpBtnTxt(e) {
    fieldData.btnTxt = e.target.value
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
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
    }
  }

  function setAllowedFileType(value) {
    const val = value.map(itm => itm.value)
    if (val.join(',') === '') {
      fieldData.config.allowedFileType = ''
    } else {
      fieldData.config.allowedFileType = val.join(',._RF_,')
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
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
        title={__('Upload Button Text:', 'bitform')}
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
        title={__('Button Icons', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        toggleAction={hideAdminLabel}
        toggleChecked
        open
      // disable={!fieldData?.adminLbl}
      >
        <div className={css(ut.mt1)}>
          <FieldIconSettings
            label="Prefix Icon"
            iconSrc={fieldData?.prefixIcn}
            styleRoute="pre-i"
            setIcon={() => setIconModel('prefixIcn')}
            removeIcon={() => removeIcon('prefixIcn')}
          />

          <FieldIconSettings
            label="Suffix Icon"
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

      <RequiredSettings />

      <FieldSettingsDivider />

      <FieldReadOnlySettings />

      <FieldSettingsDivider />

      <FieldDisabledSettings />

      <FieldSettingsDivider />

      <SimpleAccordion
        id="alw-mltpl-stng"
        title={__('Allow Multiple:', 'bitform')}
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
              onChange={e => setConfigValue('minFile', e.target.value)}
            />
          </div>
          <div className={css(ut.flxc)}>
            <span>Maximum File</span>
            <input
              data-testid="alw-mltpl-max-inp"
              className={css(FieldStyle.input, ut.w5, ut.mt1)}
              type="number"
              value={maxFile}
              onChange={e => setConfigValue('maxFile', e.target.value)}
            />
          </div>

        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="fil-slct-stts-stng"
        title={__('File Select Status', 'bitform')}
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

      <SingleToggle
        id="shw-mxmm-siz-stng"
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}
        title={__('Show Maximum Size', 'bitform')}
        action={e => setConfigValue('showMaxSize', e.target.checked)}
        isChecked={showMaxSize}
        tip="By disabling this option, the field show maximum size will be hidden"
      />

      <FieldSettingsDivider />

      <SimpleAccordion
        id="mxmm-upld-siz-stng"
        title={__('Maximum Upload Size', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <SizeControl
            dataTestId="mxmm-upld-siz"
            className={css(ut.w10, ut.mt1, ut.mb1)}
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
              className={`${css(ut.mr2)} ${css(ut.fw500)} `}
              checked={isItTotalMax}
              title={__('Total Maximum Size', 'bitform')}
              onChange={e => setConfigValue('isItTotalMax', e.target.checked)}
            />
          )}
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="shw-fil-lst-stng"
        title={__('Show File List', 'bitform')}
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
            title={__('Show File Preview', 'bitform')}
            onChange={e => setConfigValue('showFilePreview', e.target.checked)}
          />
          <CheckBoxMini
            id="shw-fil-siz"
            className={`${css(ut.mr2, ut.mt2)} ${css(ut.fw500)} `}
            checked={showFileSize}
            title={__('Show File Size', 'bitform')}
            onChange={e => setConfigValue('showFileSize', e.target.checked)}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <DropDown
          className="w-10"
          titleClassName="title"
          title={__('Allowed File Type:', 'bitform')}
          isMultiple
          addable
          options={options}
          placeholder={__('Select File Type', 'bitform')}
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
        title={__('Icons', 'bitform')}
      >
        <div className="pos-rel" />
        <Icons addPaddingOnSelect={false} iconType={icnType} setModal={setIcnMdl} />
      </Modal>
    </>
  )
}
