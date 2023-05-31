/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { create } from 'mutative'
import { memo, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useParams } from 'react-router-dom'
import { useAtom, useAtomValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import BdrDottedIcn from '../../Icons/BdrDottedIcn'
import DirectionIcn from '../../Icons/DirectionIcn'
import TxtAlignCntrIcn from '../../Icons/TxtAlignCntrIcn'
import TxtAlignLeftIcn from '../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../Icons/TxtAlignRightIcn'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory, reCalculateFldHeights } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import {
  addDefaultStyleClasses,
  iconElementLabel,
  isStyleExist,
  setIconFilterValue,
  styleClasses,
} from '../style-new/styleHelpers'
import Downmenu from '../Utilities/Downmenu'
import Modal from '../Utilities/Modal'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import Icons from './Icons'
import SmartTags from './SmartTags'
import FieldIconSettings from './StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'
import SizeAndPosition from './StyleCustomize/StyleComponents/SizeAndPosition'

function TitleSettings() {
  const { css } = useFela()
  const { fieldKey } = useParams()
  const [fields, setFields] = useAtom($fields)
  const fieldData = deepCopy(fields[fieldKey])
  const [styles, setStyles] = useAtom($styles)
  const selectedFieldId = useAtomValue($selectedFieldId)
  const fldStyleObj = styles?.fields?.[fieldKey]
  const { classes } = fldStyleObj
  const wrpCLass = `.${fieldKey}-fld-wrp`
  const [icnMdl, setIcnMdl] = useState(false)
  const [fieldName, setFieldName] = useState('')
  const { 'align-items': position, 'flex-direction': flex } = classes[wrpCLass] || ''
  const subtitleAlignment = styles.fields[fieldKey].classes[`.${fieldKey}-sub-titl`]?.['justify-content'] || 'start'

  const handleTitle = ({ target: { value, name } }) => {
    fieldData[name] = value
    const allFields = create(fields, draft => { draft[fieldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({ event: `${name} Modified to ${value}`, type: `${name}_changes`, state: { fldKey: fieldKey, fields: allFields } })
  }

  const setIconModel = (typ) => {
    if (!isStyleExist(styles, fieldKey, styleClasses[typ])) addDefaultStyleClasses(selectedFieldId, typ)
    setIconFilterValue(typ, fieldKey)
    setFieldName(typ)
    setIcnMdl(true)
    reCalculateFldHeights(fieldKey)
  }

  const removeIcon = (iconType) => {
    if (fieldData[iconType]) {
      delete fieldData[iconType]
      const allFields = create(fields, draft => { draft[fieldKey] = fieldData })
      setFields(allFields)
      const newStyles = create(styles, draft => {
        if (iconType === 'prefixIcn') delete draft.fields[selectedFieldId].classes[`.${selectedFieldId}-fld`]['padding-left']
        if (iconType === 'suffixIcn') delete draft.fields[selectedFieldId].classes[`.${selectedFieldId}-fld`]['padding-right']
      })
      setStyles(newStyles)
      addToBuilderHistory({ event: `${iconElementLabel[iconType]} Icon Deleted`, type: `delete_${iconType}`, state: { fldKey: fieldKey, fields: allFields, styles: newStyles } })
    }
  }

  const removeImage = (name) => {
    if (fieldData[name]) {
      delete fieldData[name]
      const allFields = create(fields, draft => { draft[fieldKey] = fieldData })
      setFields(allFields)
      reCalculateFldHeights(fieldKey)
      addToBuilderHistory({
        event: `${iconElementLabel[name]} Icon Deleted`,
        type: `delete_${name}`,
        state: { fldKey: fieldKey, fields: allFields },
      })
    }
  }

  const hideTitle = ({ target: { checked } }) => {
    if (checked) {
      fieldData.title = 'Title'
      fieldData.titleHide = false
      addDefaultStyleClasses(selectedFieldId, 'title')
    } else {
      delete fieldData.title
      fieldData.titleHide = true
    }
    const req = checked ? 'on' : 'off'
    const allFields = create(fields, draft => { draft[fieldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    reCalculateFldHeights(fieldKey)
    addToBuilderHistory({
      event: `Title ${req}:  ${fieldData.lbl || fieldKey}`,
      type: 'title_toggle',
      state: { fields: allFields, fldKey: fieldKey },
    })
  }

  const hideSubTitle = ({ target: { checked } }) => {
    if (checked) {
      fieldData.subtitle = 'Subtitle'
      fieldData.subtitleHide = false
      addDefaultStyleClasses(selectedFieldId, 'subTitl')
    } else {
      delete fieldData.subtitle
      fieldData.subtitleHide = true
    }
    const req = checked ? 'on' : 'off'
    const allFields = create(fields, draft => { draft[fieldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    reCalculateFldHeights(fieldKey)
    addToBuilderHistory({
      event: `Subtitle ${req}:  ${fieldData.lbl || fieldKey}`,
      type: 'subtitle_toggle',
      state: { fields: allFields, fldKey: fieldKey },
    })
  }

  const inputHandler = (val, type) => {
    if (val) {
      fieldData[type] = val
    } else {
      delete fieldData[type]
    }
    const allFields = create(fields, draft => { draft[fieldKey] = fieldData })
    setFields(allFields)
    reCalculateFldHeights(fieldKey)
    addToBuilderHistory({
      event: `Subtitle ${val}:  ${fieldData.lbl || fieldKey}`,
      type: 'subtitle_change',
      state: { fields: allFields, fldKey: fieldKey },
    })
  }

  const flexDirectionHandle = (val, type) => {
    const newStyles = create(styles, drftStyle => {
      drftStyle.fields[fieldKey].classes[wrpCLass][type] = val
    })
    setStyles(newStyles)
    reCalculateFldHeights(fieldKey)
    addToBuilderHistory({
      event: `Direction Change to ${val}:  ${fieldData.lbl || fieldKey}`,
      type: 'direction_changes',
      state: { styles: newStyles, fldKey: fieldKey },
    })
  }

  const positionHandle = (val, type) => {
    let justifyContent = 'left'
    if (val === 'center') justifyContent = 'center'
    else if (val === 'flex-end') justifyContent = 'right'
    const newStyles = create(styles, drftStyle => {
      drftStyle.fields[fieldKey].classes[wrpCLass][type] = val
      drftStyle.fields[fieldKey].classes[wrpCLass]['justify-content'] = justifyContent
    })
    setStyles(newStyles)
    addToBuilderHistory({ event: `Title Alignment Change to ${val}:  ${fieldData.lbl || fieldKey}`, type: 'position_changes', state: { styles: newStyles, fldKey: fieldKey } })
  }

  const handleSubtitleAlignment = (val) => {
    // console.log({ val })
    // console.log(styles.fields[fieldKey].classes[`.${fieldKey}-sub-titl`]['justify-content'])
    const newStyles = create(styles, drftStyle => {
      if (val === 'start') {
        // console.log('first')
        delete drftStyle.fields[fieldKey].classes[`.${fieldKey}-sub-titl`]['justify-content']
      } else {
        drftStyle.fields[fieldKey].classes[`.${fieldKey}-sub-titl`]['justify-content'] = val
      }
    })
    setStyles(newStyles)
    addToBuilderHistory({ event: `Subtitle Alignment Change to ${val}:  ${fieldData.lbl || fieldKey}`, type: 'position_changes', state: { styles: newStyles, fldKey: fieldKey } })
  }

  useEffect(() => {
    if (fieldData?.logo || fieldData?.titlePreIcn || fieldData?.titleSufIcn || fieldData?.subTitlPreIcn || fieldData?.subTitlSufIcn) {
      reCalculateFldHeights(fieldKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icnMdl])

  return (
    <>
      <div className="">
        <FieldSettingTitle
          title="Field Settings"
          subtitle={fieldData.typ}
          fieldKey={fieldKey}
        />

        <SimpleAccordion
          id="titl-stng"
          title={__('Title')}
          className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
          switching
          tip="By disabling this option, the field title will be hidden"
          tipProps={{ width: 250, icnSize: 17 }}
          toggleAction={hideTitle}
          toggleChecked={!fieldData?.titleHide}
          open={!fieldData?.titleHide}
          disable={fieldData?.titleHide}
        >
          <div className={css(FieldStyle.placeholder, ut.mt1, ut.ml1)}>
            <div className={css(style.title)}>
              <label className={css(ut.fw500)}>Text</label>
              <Downmenu>
                <button
                  data-testid="titl-mor-opt-btn"
                  data-close
                  type="button"
                  className={css(style.btn)}
                  unselectable="on"
                  draggable="false"
                  style={{ cursor: 'pointer' }}
                  title={__('More Options')}
                >
                  <BdrDottedIcn size="16" />
                </button>
                <SmartTags fieldName="title" />
              </Downmenu>
            </div>
            <AutoResizeInput
              id="titl"
              placeholder="Type title text here..."
              name="title"
              value={fieldData?.title}
              changeAction={handleTitle}
            />
          </div>
          <div className={css(ut.flxcb, ut.mt1)}>
            <span className={css(ut.fw500, ut.ml2)}>HTML Tag</span>
            <div className={css(ut.flxcb, ut.mr2, ut.w3)}>
              <select data-testid="titl-tag-slct" className={css(style.select)} value={fieldData?.titleTag} onChange={(e) => inputHandler(e.target.value, 'titleTag')}>
                {tagOptions.map((opt, index) => <option key={`opt-title-${index * 4}`} value={opt.value}>{opt.title}</option>)}
              </select>
            </div>
          </div>
          <FieldIconSettings
            label="Leading Icon"
            iconSrc={fieldData?.titlePreIcn}
            styleRoute="title-pre-i"
            setIcon={() => setIconModel('titlePreIcn')}
            removeIcon={() => removeIcon('titlePreIcn')}
          />
          <FieldIconSettings
            label="Trailing Icon"
            iconSrc={fieldData?.titleSufIcn}
            styleRoute="title-suf-i"
            setIcon={() => setIconModel('titleSufIcn')}
            removeIcon={() => removeIcon('titleSufIcn')}
          />
        </SimpleAccordion>

        <FieldSettingsDivider />

        <SimpleAccordion
          id="sub-titl-stng"
          title={__('Subtitle')}
          className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
          switching
          tip="By disabling this option, the field subtitle will be hidden"
          tipProps={{ width: 250, icnSize: 17 }}
          toggleAction={hideSubTitle}
          toggleChecked={!fieldData?.subtitleHide}
          open={fieldData?.subtitleHide}
          disable={fieldData?.subtitleHide}
        >
          <div className={css(FieldStyle.placeholder, ut.mt1, ut.ml1)}>
            <div className={css(style.title)}>
              <label className={css(ut.fw500)}>Text</label>
              <Downmenu>
                <button
                  data-testid="sub-titl-mor-opt-btn"
                  data-close
                  type="button"
                  className={css(style.btn)}
                  unselectable="on"
                  draggable="false"
                  style={{ cursor: 'pointer' }}
                  title={__('Fields')}
                >
                  <BdrDottedIcn size="16" />
                </button>
                <SmartTags fieldName="subtitle" />
              </Downmenu>
            </div>

            <AutoResizeInput
              id="sub-titl-stng"
              placeholder="Type subtitle here..."
              name="subtitle"
              value={fieldData?.subtitle}
              changeAction={handleTitle}
            />
          </div>
          <div className={css(ut.flxcb, ut.mt1)}>
            <span className={css(ut.fw500, ut.ml2)}>HTML Tag</span>
            <div className={css(ut.flxcb, ut.mr2, ut.w3)}>
              <select
                data-testid="sub-titl-tag"
                className={css(style.select)}
                value={fieldData?.subTitleTag}
                onChange={(e) => inputHandler(e.target.value, 'subTitleTag')}
              >
                {tagOptions.map((opt, indx) => <option key={`title-opt-${indx * 4}`} value={opt.value}>{opt.title}</option>)}
              </select>
            </div>
          </div>
          <FieldIconSettings
            label="Leading Icon"
            iconSrc={fieldData?.subTitlPreIcn}
            styleRoute="sub-titl-pre-i"
            setIcon={() => setIconModel('subTitlPreIcn')}
            removeIcon={() => removeIcon('subTitlPreIcn')}
          />
          <FieldIconSettings
            label="Trailing Icon"
            iconSrc={fieldData?.subTitlSufIcn}
            styleRoute="sub-titl-suf-i"
            setIcon={() => setIconModel('subTitlSufIcn')}
            removeIcon={() => removeIcon('subTitlSufIcn')}
          />

          <div className={css(style.main, ut.ml2)}>
            <span className={css(ut.fw500)}>Alignment</span>
            <StyleSegmentControl
              show={['icn']}
              tipPlace="bottom"
              className={css(style.segment)}
              options={[
                { icn: <TxtAlignLeftIcn size="17" />, label: 'start', tip: 'Left' },
                { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
                { icn: <TxtAlignRightIcn size="17" />, label: 'end', tip: 'Right' },
              ]}
              onChange={handleSubtitleAlignment}
              defaultActive={subtitleAlignment}
            />
          </div>
        </SimpleAccordion>
        <FieldSettingsDivider />
        <AdminLabelSettings />
        <FieldSettingsDivider />
        <SizeAndPosition />
        <FieldSettingsDivider />
        <FieldIconSettings
          classNames={css(style.section)}
          labelClass={css(style.logoLabel)}
          label="Logo/Icon"
          iconSrc={fieldData?.logo}
          styleRoute="logo"
          setIcon={() => setIconModel('logo')}
          removeIcon={() => removeImage('logo')}
        />

        <FieldSettingsDivider />
        <div className={css(style.section, style.main)}>
          <span className={css(style.label)}>Label Alignment</span>
          <StyleSegmentControl
            show={['icn']}
            tipPlace="bottom"
            className={css(style.segment)}
            options={[
              { icn: <TxtAlignLeftIcn size="17" />, label: 'flex-start', tip: 'Left' },
              { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
              { icn: <TxtAlignRightIcn size="17" />, label: 'flex-end', tip: 'Right' },
            ]}
            onChange={val => positionHandle(val, 'align-items')}
            defaultActive={position}
          />
        </div>
        <FieldSettingsDivider />
        <div className={css(style.section, style.main)}>
          <span className={css(style.label)}>Layout Direction</span>
          <StyleSegmentControl
            show={['icn']}
            tipPlace="bottom"
            className={css(style.segment)}
            options={[
              { icn: <DirectionIcn size="17" dir="down" />, label: 'column', tip: 'Vertical' },
              { icn: <DirectionIcn size="17" dir="up" />, label: 'column-reverse', tip: 'Vertical  Reverse' },
              { icn: <DirectionIcn size="17" dir="right" />, label: 'row', tip: 'Horizontal' },
              { icn: <DirectionIcn size="17" dir="left" />, label: 'row-reverse', tip: 'Horizontal Reverse' },
            ]}
            onChange={val => flexDirectionHandle(val, 'flex-direction')}
            defaultActive={flex}
          />
        </div>
        <FieldSettingsDivider />
      </div>
      <Modal
        md
        autoHeight
        show={icnMdl}
        setModal={setIcnMdl}
        className="o-v"
        title="Image"
      >
        <div className="pos-rel" />

        <Icons
          iconType={fieldName}
          selected={fieldName === 'logo' ? 'Upload Image' : 'Icons'}
          uploadLbl="Upload Image"
          setModal={setIcnMdl}
          addPaddingOnSelect={false}
        />
      </Modal>

    </>
  )
}
const tagOptions = [
  { value: 'h1', title: 'H1' },
  { value: 'h2', title: 'H2' },
  { value: 'h3', title: 'H3' },
  { value: 'h4', title: 'H4' },
  { value: 'h5', title: 'H5' },
  { value: 'h6', title: 'H6' },
  { value: 'div', title: 'Div' },
  { value: 'span', title: 'Span' },
  { value: 'p', title: 'p' },
]
const style = {
  section: {
    my: 5,
    mx: 15,
  },
  logoLabel: {
    flx: 'center-between',
    ml: '0px !important',
    my: 5,
    brs: 8,
    fw: '600 !important',
  },
  main: { flx: 'center-between' },
  label: { fw: 600 },
  segment: {
    mr: 7,
    mt: 4,
  },
  title: {
    dy: 'flex',
    jc: 'space-between',
    mx: 5,
    mt: 5,
  },
  formfield: {
    brs: 8,
    w: 150,
    dy: 'block',
  },
  btn: {
    b: 0,
    brs: 5,
    curp: 1,
    flx: 'center-between',
  },
  spaceControl: { m: '9px 10px 0px 7px' },
  select: {
    fs: 14,
    fw: 500,
    w: '96%',
    bd: 'var(--b-79-96) !important',

    oe: 'none !important',
    ae: 'auto !important',
    mx: 'auto',
    dy: 'block',
    lh: '2 !important',
    px: 8,
    p: '0 !important',
    mb: 3,
    bs: 'none !important',
    b: 'none !important',
    brs: '8px !important',
    '::placeholder': { cr: 'hsl(215deg 16% 57%)', fs: 12 },
    ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
  },

}
export default memo(TitleSettings)
