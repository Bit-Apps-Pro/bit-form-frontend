/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $builderHookStates, $fields, $selectedFieldId, $updateBtn } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import CloseIcn from '../../../Icons/CloseIcn'
import EditIcn from '../../../Icons/EditIcn'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { addDefaultStyleClasses, getNumFromStr, getStrFromStr, unitConverter } from '../../style-new/styleHelpers'
import Modal from '../../Utilities/Modal'
import AutoResizeInput from './AutoResizeInput'
import Icons from '../Icons'
import IconStyleBtn from '../IconStyleBtn'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from '../StyleCustomize/ChildComp/SizeControl'

export default function SubTitleSettings() {
  const [fields, setFields] = useRecoilState($fields)
  const { fieldKey: fldKey } = useParams()
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const [styles, setStyles] = useRecoilState($styles)
  const setBuilderHookState = useSetRecoilState($builderHookStates)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const { css } = useFela()
  const fieldData = deepCopy(fields[fldKey])

  const subtitle = fieldData.subtitle || ''
  const adminLabel = fieldData.adminLbl || ''

  const subTlePreIcn = `.${fldKey}-sub-titl-pre-i`
  const subTleSufIcn = `.${fldKey}-sub-titl-suf-i`

  const { width: subPreIcnWidth, height: subPreIcnHeight } = styles?.fields[fldKey]?.classes[subTlePreIcn] || {}
  const { width: subSufIcnWidth, height: subSufIcnHeight } = styles?.fields[fldKey]?.classes[subTleSufIcn] || {}

  const hideSubTitle = ({ target: { checked } }) => {
    if (checked) {
      fieldData.subtitle = 'Sub Title'
      fieldData.subtitleHide = true
      addDefaultStyleClasses(selectedFieldId, 'subTitl', setStyles)
    } else {
      delete fieldData.subtitle
      fieldData.subtitleHide = false
    }
    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    setBuilderHookState(olds => ({ ...olds, reCalculateFieldHeights: olds.reCalculateFieldHeights + 1 }))
    addToBuilderHistory(setBuilderHistory, { event: `Sub Title ${req}:  ${fieldData.lbl || adminLabel || fldKey}`, type: `subtitle_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setSubTitle = ({ target: { value } }) => {
    if (value === '') {
      delete fieldData.subtitle
      setBuilderHookState(olds => ({ ...olds, reCalculateFieldHeights: olds.reCalculateFieldHeights + 1 }))
    } else {
      fieldData.subtitle = value
    }

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Sub Title updated: ${adminLabel || fieldData.lbl || fldKey}`, type: 'change_subtitle', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setIconModel = (typ) => {
    addDefaultStyleClasses(selectedFieldId, typ, setStyles)
    setIcnType(typ)
    setIcnMdl(true)
  }

  const removeIcon = (iconType) => {
    if (fieldData[iconType]) {
      delete fieldData[iconType]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
      setStyles(prvStyle => produce(prvStyle, draft => {
        if (iconType === 'prefixIcn') delete draft.fields[selectedFieldId].classes[`.${selectedFieldId}-fld`]['padding-left']
        if (iconType === 'suffixIcn') delete draft.fields[selectedFieldId].classes[`.${selectedFieldId}-fld`]['padding-right']
      }))
    }
  }

  const icnWidthHandle = ({ unit, value }, cls, width) => {
    const convertvalue = unitConverter(unit, value, getStrFromStr(width || 'px'))
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[cls].width = `${convertvalue}${unit || 'px'}`
    }))
  }

  const icnHeightHandle = ({ unit, value }, cls, height) => {
    const convertvalue = unitConverter(unit, value, getStrFromStr(height || 'px'))
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[cls].height = `${convertvalue}${unit || 'px'}`
    }))
  }

  return (
    <div>
      <SimpleAccordion
        title={__('Sub Title', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={hideSubTitle}
        toggleChecked={fieldData?.subtitleHide}
        open={fieldData?.subtitleHide}
        disable={!fieldData?.subtitleHide}
      >
        <div className={css(FieldStyle.placeholder)}>
          <AutoResizeInput
            ariaLabel="Sub title for this Field"
            placeholder="Type sub title here..."
            value={subtitle}
            changeAction={setSubTitle}
          />
        </div>

        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500, ut.ml2)}>Start Icon</span>
          <div className={css(ut.flxcb)}>
            {fieldData?.subTlePreIcn && (
              <>
                <img src={fieldData?.subTlePreIcn} alt="start icon" width="18" height="18" />
                <IconStyleBtn route="sub-titl-pre-i" />
              </>
            )}

            <button type="button" onClick={() => setIconModel('subTlePreIcn')} className={css(ut.icnBtn)}>
              <EditIcn size={22} />
            </button>
            {fieldData.subTlePreIcn && (
              <button onClick={() => removeIcon('subTlePreIcn')} className={css(ut.icnBtn)} type="button">
                <CloseIcn size="13" />
              </button>
            )}

          </div>
        </div>
        {fieldData?.subTlePreIcn && (
          <>
            <div className={css(ut.flxcb, ut.m10)}>
              <span className={css(ut.fw500)}>Start Icon Width</span>
              <div className={css(ut.flxc)}>
                <SizeControl
                  inputHandler={val => icnWidthHandle(val, subTlePreIcn, subPreIcnWidth)}
                  sizeHandler={({ unitKey, unitValue }) => icnWidthHandle({ unit: unitKey, value: unitValue }, subTlePreIcn, subPreIcnWidth)}
                  value={getNumFromStr(subPreIcnWidth) || 10}
                  unit={getStrFromStr(subPreIcnWidth) || 'px'}
                  width="80px"
                  options={['px', '%']}
                />
              </div>
            </div>
            <div className={css(ut.flxcb, ut.m10)}>
              <span className={css(ut.fw500)}>Start Icon Height</span>
              <div className={css(ut.flxc)}>
                <SizeControl
                  inputHandler={val => icnHeightHandle(val, subTlePreIcn, subPreIcnHeight)}
                  sizeHandler={({ unitKey, unitValue }) => icnHeightHandle({ unit: unitKey, value: unitValue }, subTlePreIcn, subPreIcnHeight)}
                  value={getNumFromStr(subPreIcnHeight) || 10}
                  unit={getStrFromStr(subPreIcnHeight) || 'px'}
                  width="80px"
                  options={['px', '%']}
                />
              </div>
            </div>
          </>
        )}
        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500, ut.ml2)}>End Icon</span>
          <div className={css(ut.flxcb)}>
            {fieldData?.subTleSufIcn && (
              <>
                <img src={fieldData?.subTleSufIcn} alt="end icon" width="18" height="18" />
                <IconStyleBtn route="sub-titl-suf-i" />
              </>
            )}

            <button type="button" onClick={() => setIconModel('subTleSufIcn')} className={css(ut.icnBtn)}>
              <EditIcn size={22} />
            </button>
            {fieldData.subTleSufIcn && (
              <button onClick={() => removeIcon('subTleSufIcn')} className={css(ut.icnBtn)} type="button">
                <CloseIcn size="13" />
              </button>
            )}

          </div>
        </div>
        {fieldData?.subTleSufIcn && (
          <>
            <div className={css(ut.flxcb, ut.m10)}>
              <span className={css(ut.fw500)}>End Icon Width</span>
              <div className={css(ut.flxc)}>
                <SizeControl
                  inputHandler={val => icnWidthHandle(val, subTleSufIcn, subSufIcnWidth)}
                  sizeHandler={({ unitKey, unitValue }) => icnWidthHandle({ unit: unitKey, value: unitValue }, subTleSufIcn, subSufIcnWidth)}
                  value={getNumFromStr(subSufIcnWidth) || 10}
                  unit={getStrFromStr(subSufIcnWidth) || 'px'}
                  width="80px"
                  options={['px', '%']}
                />
              </div>
            </div>
            <div className={css(ut.flxcb, ut.m10)}>
              <span className={css(ut.fw500)}>End Icon Height</span>
              <div className={css(ut.flxc)}>
                <SizeControl
                  inputHandler={val => icnHeightHandle(val, subTleSufIcn, subSufIcnHeight)}
                  sizeHandler={({ unitKey, unitValue }) => icnHeightHandle({ unit: unitKey, value: unitValue }, subTleSufIcn, subSufIcnHeight)}
                  value={getNumFromStr(subSufIcnHeight) || 10}
                  unit={getStrFromStr(subSufIcnHeight) || 'px'}
                  width="80px"
                  options={['px', '%']}
                />
              </div>
            </div>
          </>
        )}

      </SimpleAccordion>
      <Modal
        md
        autoHeight
        show={icnMdl}
        setModal={setIcnMdl}
        className="o-v"
        title={__('Icons', 'bitform')}
      >
        <div className="pos-rel" />

        <Icons iconType={icnType} setModal={setIcnMdl} />
      </Modal>
    </div>
  )
}
