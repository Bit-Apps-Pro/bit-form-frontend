/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import produce from 'immer'
import { memo, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $builderHookStates, $fields, $selectedFieldId, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import BdrDottedIcn from '../../Icons/BdrDottedIcn'
import CloseIcn from '../../Icons/CloseIcn'
import EditIcn from '../../Icons/EditIcn'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { addDefaultStyleClasses } from '../style-new/styleHelpers'
import Downmenu from '../Utilities/Downmenu'
import Modal from '../Utilities/Modal'
import Tip from '../Utilities/Tip'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import Icons from './Icons'
import IconStyleBtn from './IconStyleBtn'
import SmartTags from './SmartTags'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

function TitleSettings() {
  const { css } = useFela()
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [styles, setStyles] = useRecoilState($styles)
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setBuilderHookState = useSetRecoilState($builderHookStates)
  const wrpCLass = `.${fldKey}-fld-wrp`
  const [icnMdl, setIcnMdl] = useState(false)
  const [fieldName, setFieldName] = useState('')

  const handleTitle = ({ target: { value, name } }) => {
    fieldData[name] = value
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  useEffect(() => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[wrpCLass]['background-image'] = `url(${fieldData?.bg_img || ''})`
    }))
  }, [fieldData?.bg_img])

  const setIconModel = (typ) => {
    addDefaultStyleClasses(selectedFieldId, typ, setStyles)
    setFieldName(typ)
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

  const removeImage = (name) => {
    if (fieldData[name]) {
      delete fieldData[name]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
    }
  }

  const hideLogo = ({ target: { checked } }) => {
    if (checked) {
      fieldData.logo = 'logo'
      fieldData.logoHide = true
      addDefaultStyleClasses(selectedFieldId, 'logo', setStyles)
    } else {
      delete fieldData.logo
      fieldData.logoHide = false
    }
    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    setBuilderHookState(olds => ({ ...olds, reCalculateFieldHeights: olds.reCalculateFieldHeights + 1 }))
    addToBuilderHistory(setBuilderHistory, { event: `Logo ${req}:  ${fieldData.lbl || fldKey}`, type: `logo${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideTitle = ({ target: { checked } }) => {
    if (checked) {
      fieldData.title = 'Title'
      fieldData.titleHide = true
      addDefaultStyleClasses(selectedFieldId, 'title', setStyles)
    } else {
      delete fieldData.title
      fieldData.titleHide = false
    }
    const req = checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    // recalculate builder field height
    setBuilderHookState(olds => ({ ...olds, reCalculateFieldHeights: olds.reCalculateFieldHeights + 1 }))
    addToBuilderHistory(setBuilderHistory, { event: `Title ${req}:  ${fieldData.lbl || fldKey}`, type: `title_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

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
    addToBuilderHistory(setBuilderHistory, { event: `Sub Title ${req}:  ${fieldData.lbl || fldKey}`, type: `subtitle_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const inputHandler = (val, type) => {
    if (val) {
      fieldData[type] = val
    } else {
      delete fieldData[type]
    }
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  return (
    <>
      <div className="">
        <FieldSettingTitle
          title="Field Settings"
          subtitle={fieldData.typ}
          fieldKey={fldKey}
        />
        <SimpleAccordion
          title={__('Logo', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={hideLogo}
          toggleChecked={fieldData?.logoHide}
          open={fieldData?.logoHide}
          disable={!fieldData?.logoHide}
        >
          <div className={css(ut.flxcb, ut.ml2)}>
            <span className={css(ut.fw500)}>Image</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.logo && (
                <>
                  <img src={fieldData?.logo} alt="icon" width="25" height="25" />
                  <Tip msg="Customize Style">
                    <IconStyleBtn route="logo" />
                  </Tip>
                </>
              )}
              <Tip msg="Change Logo">
                <button type="button" onClick={() => setIconModel('logo')} className={css(ut.icnBtn)}>
                  <EditIcn size={22} />
                </button>
              </Tip>
              {fieldData?.logo && (
                <Tip msg="Remove Logo">
                  <button onClick={() => removeImage('logo')} className={css(ut.icnBtn)} type="button">
                    <CloseIcn size="13" />
                  </button>
                </Tip>
              )}
            </div>
          </div>
        </SimpleAccordion>
        <hr className={css(FieldStyle.divider)} />
        <SimpleAccordion
          title={__('Title', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={hideTitle}
          toggleChecked={fieldData?.titleHide}
          open={fieldData?.titleHide}
          disable={!fieldData?.titleHide}
        >
          <div className={css(FieldStyle.placeholder, ut.mt2, ut.ml1)}>
            <div className={css(style.title)}>
              <label className={css(ut.fw500, ut.ml2, ut.mt2)}>Title</label>
              <Downmenu>
                <button
                  data-close
                  type="button"
                  className={css(style.btn)}
                  unselectable="on"
                  draggable="false"
                  style={{ cursor: 'pointer' }}
                  title={__('More Options', 'bitform')}
                >
                  <BdrDottedIcn size="19" />
                </button>
                <SmartTags
                  fieldName="title"
                />
              </Downmenu>
            </div>
            <AutoResizeInput
              placeholder="Title..."
              name="title"
              value={fieldData?.title}
              changeAction={handleTitle}
            />
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500, ut.ml2)}>Tag</span>
            <div className={css(ut.flxcb, ut.mr2, ut.w3)}>
              <select className={css(style.select)} value={fieldData?.titleTag} onChange={(e) => inputHandler(e.target.value, 'titleTag')}>
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
                <option value="div">Div</option>
                <option value="span">Span</option>
                <option value="p">p</option>
              </select>
            </div>
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500, ut.ml2)}>Start Icon</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.titlePreIcn && (
                <>
                  <img src={fieldData?.titlePreIcn} alt="start icon" width="18" height="18" />
                  <Tip msg="Customize Style">
                    <IconStyleBtn route="sub-titl-pre-i" />
                  </Tip>
                </>
              )}

              <Tip msg="Change Icon">
                <button type="button" onClick={() => setIconModel('titlePreIcn')} className={css(ut.icnBtn)}>
                  <EditIcn size={22} />
                </button>
              </Tip>
              {fieldData.titlePreIcn && (
                <Tip msg="Remove Icon">
                  <button onClick={() => removeIcon('titlePreIcn')} className={css(ut.icnBtn)} type="button">
                    <CloseIcn size="13" />
                  </button>
                </Tip>
              )}

            </div>
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500, ut.ml2)}>End Icon</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.titleSufIcn && (
                <>
                  <img src={fieldData?.titleSufIcn} alt="end icon" width="18" height="18" />
                  <Tip msg="Customize Style">
                    <IconStyleBtn route="sub-titl-suf-i" />
                  </Tip>
                </>
              )}
              <Tip msg="Edit Icon">
                <button type="button" onClick={() => setIconModel('titleSufIcn')} className={css(ut.icnBtn)}>
                  <EditIcn size={22} />
                </button>
              </Tip>
              {fieldData.titleSufIcn && (
                <Tip msg="Remove Icon">
                  <button onClick={() => removeIcon('titleSufIcn')} className={css(ut.icnBtn)} type="button">
                    <CloseIcn size="13" />
                  </button>
                </Tip>
              )}

            </div>
          </div>
        </SimpleAccordion>
        <hr className={css(FieldStyle.divider)} />

        <SimpleAccordion
          title={__('Sub Title', 'bitform')}
          className={css(FieldStyle.fieldSection)}
          switching
          toggleAction={hideSubTitle}
          toggleChecked={fieldData?.subtitleHide}
          open={fieldData?.subtitleHide}
          disable={!fieldData?.subtitleHide}
        >
          <div className={css(style.title, ut.mt2)}>
            <label className={css(ut.fw500, ut.ml2)}>Sub Title</label>
            <Downmenu>
              <button
                data-close
                type="button"
                className={css(style.btn)}
                unselectable="on"
                draggable="false"
                style={{ cursor: 'pointer' }}
                title={__('Fields', 'bitform')}
              >
                <BdrDottedIcn size="19" />
              </button>
              <SmartTags
                fieldName="subtitle"
              />
            </Downmenu>
          </div>
          <div className={css(FieldStyle.placeholder)}>
            <AutoResizeInput
              placeholder="Sub Title..."
              name="subtitle"
              value={fieldData?.subtitle}
              changeAction={handleTitle}
            />
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500, ut.ml2)}>Tag</span>
            <div className={css(ut.flxcb, ut.mr2, ut.w3)}>
              <select className={css(style.select)} value={fieldData?.subTitleTag} onChange={(e) => inputHandler(e.target.value, 'subTitleTag')}>
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
                <option value="div">Div</option>
                <option value="span">Span</option>
                <option value="p">p</option>
              </select>
            </div>
          </div>

          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500, ut.ml2)}>Start Icon</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.subTlePreIcn && (
                <>
                  <img src={fieldData?.subTlePreIcn} alt="start icon" width="18" height="18" />
                  <Tip msg="Customize Style">
                    <IconStyleBtn route="sub-titl-pre-i" />
                  </Tip>
                </>
              )}

              <Tip msg="Edit Icon">
                <button type="button" onClick={() => setIconModel('subTlePreIcn')} className={css(ut.icnBtn)}>
                  <EditIcn size={22} />
                </button>
              </Tip>
              {fieldData.subTlePreIcn && (
                <Tip msg="Remove Icon">
                  <button onClick={() => removeIcon('subTlePreIcn')} className={css(ut.icnBtn)} type="button">
                    <CloseIcn size="13" />
                  </button>
                </Tip>
              )}

            </div>
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500, ut.ml2)}>End Icon</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.subTleSufIcn && (
                <>
                  <img src={fieldData?.subTleSufIcn} alt="end icon" width="18" height="18" />
                  <Tip msg="Customize Style">
                    <IconStyleBtn route="sub-titl-suf-i" />
                  </Tip>
                </>
              )}
              <Tip msg="Edit Icon">
                <button type="button" onClick={() => setIconModel('subTleSufIcn')} className={css(ut.icnBtn)}>
                  <EditIcn size={22} />
                </button>
              </Tip>
              {fieldData.subTleSufIcn && (
                <Tip msg="Remove Icon">
                  <button onClick={() => removeIcon('subTleSufIcn')} className={css(ut.icnBtn)} type="button">
                    <CloseIcn size="13" />
                  </button>
                </Tip>
              )}

            </div>
          </div>
        </SimpleAccordion>

        <hr className={css(FieldStyle.divider)} />
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
          selected="Upload Image"
          uploadLbl="Upload Image"
          setModal={setIcnMdl}
        />
      </Modal>
    </>
  )
}

const style = {
  main: { flx: 'center-between' },
  label: {
    fw: 500,
    ml: 10,
    mt: 5,
  },
  segment: {
    mr: 7,
    mt: 4,
  },
  title: {
    dy: 'flex',
    jc: 'space-between',
  },
  formfield: {
    brs: 8,
    w: 150,
    dy: 'block',
  },
  btn: {
    b: 0,
    brs: 5,
    mr: 15,
    curp: 1,
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
    mt: 10,
    mb: 3,
    bs: 'none !important',
    b: 'none !important',
    brs: '8px !important',
    '::placeholder': { cr: 'hsl(215deg 16% 57%)', fs: 12 },
    ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
  },

}
export default memo(TitleSettings)
