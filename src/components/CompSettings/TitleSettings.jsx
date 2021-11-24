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

function TitleSettings() {
  const { css } = useFela()
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [styles, setStyles] = useRecoilState($styles)
  const wrpCLass = `.${fldKey}-wrp`
  const { 'align-items': position, 'flex-direction': flex } = styles.fields[fldKey].classes[wrpCLass]
  const [icnMdl, setIcnMdl] = useState(false)
  const [fieldName, setFieldName] = useState('')

  const handleTitle = ({ target: { value, name } }) => {
    fieldData[name] = value
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  useEffect(() => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fldKey].classes[wrpCLass]['background-image'] = `url(${fieldData?.bg_img})`
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

  return (
    <>
      <div className="">
        <FieldSettingTitle
          title="Field Settings"
          subtitle={fieldData.typ}
          fieldKey={fldKey}
        />
        <hr className={css(FieldStyle.divider)} />
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
        <br />

        <div className={css(ut.mt2, { mx: 10 })}>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Title Image</span>
            <div className={css(ut.flxcb)}>
              {fieldData?.title_img && (
                <img src={fieldData?.title_img} alt="icon" width="25" height="25" />
              )}
              <button type="button" onClick={() => setIconModel('title_img')} className={css(ut.icnBtn)}>
                <EditIcn size={22} />
              </button>
              {fieldData?.title_img && (
                <button onClick={() => removeImage('title_img')} className={css(ut.icnBtn)} type="button">
                  <CloseIcn size="13" />
                </button>
              )}
            </div>
          </div>
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

}
export default memo(TitleSettings)
