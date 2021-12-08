/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import produce from 'immer'
import { memo, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId, $styles } from '../../GlobalStates'
import BdrDottedIcn from '../../Icons/BdrDottedIcn'
import CloseIcn from '../../Icons/CloseIcn'
import EditIcn from '../../Icons/EditIcn'
import TxtAlignCntrIcn from '../../Icons/TxtAlignCntrIcn'
import TxtAlignLeftIcn from '../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../Icons/TxtAlignRightIcn'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Downmenu from '../Utilities/Downmenu'
import Modal from '../Utilities/Modal'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import SmartTags from './SmartTags'
import Icons from './Icons'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'
import SpacingControl from '../style-new/SpacingControl'
import SimpleColorPicker from '../style-new/SimpleColorPicker'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from './StyleCustomize/ChildComp/SizeControl'
import { getNumFromStr, getStrFromStr, unitConverter } from '../style-new/styleHelpers'
import BorderControl from '../style-new/BorderControl'

function TitleSettings() {
  const { css } = useFela()
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [styles, setStyles] = useRecoilState($styles)
  const wrpCLass = `.${fldKey}-wrp`
  const titleClass = `.${fldKey}-title`
  const subTitleClass = `.${fldKey}-sub-title`
  const logoCls = `.${fldKey}-logo`
  const { classes } = styles.fields[fldKey]
  const { 'align-items': position, 'flex-direction': flex } = classes[wrpCLass] || ''
  const { color: titleClr, 'font-size': tleFntSize } = classes[titleClass] || ''
  const { color: subTitleClr, 'font-size': subTleFntSize } = classes[subTitleClass] || ''
  const { border, width: logoWidth, height: logoHeight } = classes[logoCls] || ''
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

  const positionHandle = (val, type) => {
    let justifyContent = 'left'
    if (val === 'center') justifyContent = 'center'
    else if (val === 'flex-end') justifyContent = 'right'

    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[wrpCLass][type] = val
      drftStyle.fields[fldKey].classes[wrpCLass]['justify-content'] = justifyContent
    }))
  }

  const flexDirectionHandle = (val, type) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[wrpCLass][type] = val
    }))
  }

  const setIconModel = (typ) => {
    setFieldName(typ)
    setIcnMdl(true)
  }

  const removeImage = (name) => {
    if (fieldData[name]) {
      delete fieldData[name]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
    }
  }

  const titlePath = `fields->${fldKey}->classes->${titleClass}`
  const subTitlePath = `fields->${fldKey}->classes->${subTitleClass}`
  const logoPath = `fields->${fldKey}->classes->${logoCls}`

  const titlePaths = {
    object: 'styles',
    paths: {
      margin: `${titlePath}->margin`,
      padding: `${titlePath}->padding`,
    },
  }
  const subTitlePaths = {
    object: 'styles',
    paths: {
      margin: `${subTitlePath}->margin`,
      padding: `${subTitlePath}->padding`,
    },
  }
  const logoPaths = {
    object: 'styles',
    paths: {
      border: `${logoPath}->border`,
      borderWidth: `${logoPath}->border-width`,
      borderRadius: `${logoPath}->border-radius`,
    },
  }

  const colorHandler = (val, cls) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[cls].color = val
    }))
  }
  const fntSizeHandler = ({ unit, value, id }) => {
    const convertvalue = unitConverter(unit, value, getStrFromStr(tleFntSize || 'px'))

    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[id]['font-size'] = `${convertvalue}${unit || 'px'}`
    }))
  }

  const widthHandler = ({ unit, value }) => {
    const convertvalue = unitConverter(unit, value, getStrFromStr(logoWidth || 'px'))
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[logoCls].width = `${convertvalue}${unit || 'px'}`
    }))
  }
  const heightHandler = ({ unit, value }) => {
    const convertvalue = unitConverter(unit, value, getStrFromStr(logoHeight || 'px'))
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[logoCls].height = `${convertvalue}${unit || 'px'}`
    }))
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
        <div className={css(ut.mt2, { mx: 10 })}>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Background Image</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.bg_img && (
                <img src={fieldData?.bg_img} alt="icon" width="25" height="25" />
              )}
              <button type="button" onClick={() => setIconModel('bg_img')} className={css(ut.icnBtn)}>
                <EditIcn size={22} />
              </button>
              {fieldData?.bg_img && (
                <button onClick={() => removeImage('bg_img')} className={css(ut.icnBtn)} type="button">
                  <CloseIcn size="13" />
                </button>
              )}

            </div>
          </div>
        </div>
        <hr className={css(FieldStyle.divider)} />
        <div className={css(style.main)}>
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
            activeValue={position}
          />
        </div>
        <hr className={css(FieldStyle.divider)} />
        <div className={css(style.main)}>
          <span className={css(style.label)}>Flex Direction</span>
          <StyleSegmentControl
            show={['icn']}
            tipPlace="bottom"
            className={css(style.segment)}
            options={[
              { icn: <TxtAlignLeftIcn size="17" />, label: 'column', tip: 'Vertical' },
              { icn: <TxtAlignCntrIcn size="17" />, label: 'column-reverse', tip: 'Vertical  Reverse' },
              { icn: <TxtAlignRightIcn size="17" />, label: 'row', tip: 'Horizontal' },
              { icn: <TxtAlignRightIcn size="17" />, label: 'row-reverse', tip: 'Horizontal Reverse' },
            ]}
            onChange={val => flexDirectionHandle(val, 'flex-direction')}
            activeValue={flex}
          />
        </div>
        <hr className={css(FieldStyle.divider)} />
        <SimpleAccordion
          title="Logo"
          className={css(ut.m10)}
        >
          <div className={css(ut.flxcb, ut.ml2)}>
            <span className={css(ut.fw500)}>Image</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.titleImg && (
                <img src={fieldData?.titleImg} alt="icon" width="25" height="25" />
              )}
              <button type="button" onClick={() => setIconModel('titleImg')} className={css(ut.icnBtn)}>
                <EditIcn size={22} />
              </button>
              {fieldData?.titleImg && (
                <button onClick={() => removeImage('titleImg')} className={css(ut.icnBtn)} type="button">
                  <CloseIcn size="13" />
                </button>
              )}
            </div>
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500, ut.ml2)}>Border</span>
            <div className={css(ut.flxcb, ut.mr2)}>
              <BorderControl subtitle="Image Border" value={border} objectPaths={logoPaths} />
            </div>
          </div>
          <div className={css(ut.flxcb, ut.m10)}>
            <span className={css(ut.fw500)}>Width</span>
            <div className={css(ut.flxc)}>
              <SizeControl
                inputHandler={widthHandler}
                sizeHandler={({ unitKey, unitValue }) => widthHandler({ unit: unitKey, value: unitValue })}
                value={getNumFromStr(logoWidth) || 10}
                unit={getStrFromStr(logoWidth) || 'px'}
                width="110px"
                options={['px', '%']}
              />
            </div>
          </div>
          <div className={css(ut.flxcb, ut.m10)}>
            <span className={css(ut.fw500)}>Height</span>
            <div className={css(ut.flxc)}>
              <SizeControl
                inputHandler={heightHandler}
                sizeHandler={({ unitKey, unitValue }) => heightHandler({ unit: unitKey, value: unitValue })}
                value={getNumFromStr(logoHeight) || 10}
                unit={getStrFromStr(logoHeight) || 'px'}
                width="110px"
                options={['px', '%']}
              />
            </div>
          </div>
        </SimpleAccordion>
        <hr className={css(FieldStyle.divider)} />
        <SimpleAccordion
          title="Title"
          className={css(ut.m10)}
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

            <textarea
              placeholder="Title..."
              className={css(FieldStyle.input)}
              name="title"
              value={fieldData?.title}
              onChange={handleTitle}
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
          <div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500, ut.ml2)}>Spacing</span>
              <div className={css(ut.flxcb, ut.mr2)}>
                <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={titlePaths} />
              </div>
            </div>
          </div>
          <div className={css(ut.flxcb, ut.m10)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Font Color</span>
            </div>
            <SimpleColorPicker value={titleClr || 'hsla(201, 71%, 39%, 100)'} action={{ onChange: (val) => colorHandler(val, `.${fldKey}-title`) }} id="title-font-clr" />
          </div>
          <div className={css(ut.flxcb, ut.m10)}>
            <span className={css(ut.fw500)}>Font Size</span>
            <div className={css(ut.flxc)}>
              <SizeControl
                inputHandler={fntSizeHandler}
                sizeHandler={({ unitKey, unitValue, id }) => fntSizeHandler({ unit: unitKey, value: unitValue, id })}
                value={getNumFromStr(tleFntSize) || 10}
                unit={getStrFromStr(tleFntSize) || 'px'}
                width="110px"
                options={['px', 'em', 'rem']}
                id={`.${fldKey}-title`}
              />
            </div>
          </div>
        </SimpleAccordion>
        <hr className={css(FieldStyle.divider)} />
        <SimpleAccordion
          title="Sub Title"
          className={css(ut.m10)}
        >

          <div className={css(FieldStyle.placeholder, ut.mt2)}>
            <div className={css(style.title)}>
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
                  fieldName="subTitle"
                />
              </Downmenu>
            </div>
            <textarea
              placeholder="Sub Title..."
              className={css(FieldStyle.input)}
              name="subTitle"
              value={fieldData?.subTitle}
              onChange={handleTitle}
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

          <div>
            <div className={css(ut.flxcb, ut.mt2)}>
              <span className={css(ut.fw500, ut.ml2)}>Spacing</span>
              <div className={css(ut.flxcb, ut.mr2)}>
                <SpacingControl action={{ type: 'spacing-control' }} subtitle="Spacing control" objectPaths={subTitlePaths} />
              </div>
            </div>
          </div>
          <div className={css(ut.flxcb, ut.m10)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Font Color</span>
            </div>
            <SimpleColorPicker value={subTitleClr || 'hsla(201, 71%, 39%, 100)'} action={{ onChange: (val) => colorHandler(val, `.${fldKey}-sub-title`) }} id="sub-title-font-clr" />
          </div>
          <div className={css(ut.flxcb, ut.m10)}>
            <span className={css(ut.fw500)}>Font Size</span>
            <div className={css(ut.flxc)}>
              <SizeControl
                inputHandler={fntSizeHandler}
                sizeHandler={({ unitKey, unitValue, id }) => fntSizeHandler({ unit: unitKey, value: unitValue, id })}
                value={getNumFromStr(subTleFntSize) || 10}
                unit={getStrFromStr(subTleFntSize) || 'px'}
                width="110px"
                options={['px', 'em', 'rem']}
                id={`.${fldKey}-sub-title`}
              />
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
