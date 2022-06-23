/* eslint-disable no-param-reassign */
import produce from 'immer'
import { memo, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $confirmations, $fieldsArr, $updateBtn } from '../../GlobalStates/GlobalStates'
import BoxFullIcon from '../../Icons/BoxFullIcon'
import BoxIcon from '../../Icons/BoxIcon'
import CloseIcn from '../../Icons/CloseIcn'
import EditIcn from '../../Icons/EditIcn'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import { renderHTMR } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import { getNumFromStr, getStrFromStr, objectArrayToStyleStringGenarator, unitConverter } from '../style-new/styleHelpers'
import CheckBox from '../Utilities/CheckBox'
import SingleToggle from '../Utilities/SingleToggle'
import SliderModal from '../Utilities/SliderModal'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import TinyMCE from '../Utilities/TinyMCE'
import ConfirmMsgPreview from './ConfirmMsgPreview'

function Message({ id, msgItem }) {
  const { css } = useFela()

  const setUpdateBtn = useSetRecoilState($updateBtn)
  const fieldsArr = useRecoilValue($fieldsArr)
  const [allConf, setAllConf] = useRecoilState($confirmations)
  const [msgActive, setMsgActive] = useState(false)
  const [modal, setModal] = useState({ show: false })
  const [closeColorType, setCloseColorType] = useState('default')
  const [closeIconColorType, setCloseIconColorType] = useState('default')

  const [activePeperties, setActiveProperties] = useState('background')

  const handleActiveProperties = ({ target: { name } }) => {
    setActiveProperties(name)
  }

  const handlePositionChange = ({ target: { value } }) => {
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[id].config.position = value
    }))
    setUpdateBtn({ unsaved: true })
  }

  const handleMsgType = ({ target: { value } }) => {
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[id].config.msgType = value
    }))
    setUpdateBtn({ unsaved: true })
  }

  const handleMsgAnimation = ({ target: { value } }) => {
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[id].config.animation = value
    }))
    setUpdateBtn({ unsaved: true })
  }

  const handleDelay = ({ target: { value } }) => {
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[id].config.duration = value > 0 ? value : 1
    }))
    setUpdateBtn({ unsaved: true })
  }

  const handleAutoHide = () => {
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[id].config.autoHide = !draft.type.successMsg[id].config.autoHide
    }))
    setUpdateBtn({ unsaved: true })
  }

  const handleColorTypeChange = ({ target: { name, value } }) => {
    if (name === 'closeColorType') {
      setCloseColorType(value)
    } else if (name === 'closeIconColorType') {
      setCloseIconColorType(value)
    }
  }

  const handleConfirmationStyle = ({ target: { name, value } }) => {
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[id].config.styles[name] = value
    }))
    setUpdateBtn({ unsaved: true })
  }

  const handleConfirmationShadow = ({ target: { name, value } }, index) => {
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[id].config.styles.boxShadow[index][name] = value
    }))
    setUpdateBtn({ unsaved: true })
  }

  const handleShadowDelete = (e, index) => {
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[id].config.styles.boxShadow.splice(index, 1)
    }))
    setUpdateBtn({ unsaved: true })
  }

  const handleAddShadow = () => {
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[id].config.styles.boxShadow.push({ x: '0px', y: '27px', blur: '30px', spread: '', color: 'rgb(0 0 0 / 18%)', inset: '' })
    }))
    setUpdateBtn({ unsaved: true })
  }

  const handleMsg = (mg, idx) => {
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[idx].msg = mg
    }))
    setUpdateBtn({ unsaved: true })
  }

  let values = msgItem?.styles?.padding?.trim().split(' ')
  const handleValues = ({ value: val, unit, id: index }) => {
    values = msgItem?.styles?.trim().split(' ')
    const preUnit = getStrFromStr(values[index] || 'px')
    const convertvalue = unitConverter(unit, val, preUnit)

    values[index] = convertvalue + unit

    let v
    if (controller === 'All') {
      v = `${values[0]}`
    } else {
      v = `${values[0] || '0px'} ${values[1] || '0px'} ${values[2] || '0px'} ${values[3] || '0px'}`
    }
    setAllConf(prevConf => produce(prevConf, draft => {
      draft.type.successMsg[id].config.styles.padding = v
    }))
    setUpdateBtn({ unsaved: true })
  }

  const unitOption = ['px', 'em', 'rem']

  const options = [
    { label: 'All', icn: <BoxFullIcon stroke="1.7" size={14} />, show: ['icn'], tip: 'All Side' },
    { label: 'Individual', icn: <BoxIcon stroke="1.7" size="15" />, show: ['icn'], tip: 'Individual Side' },
  ]

  const [controller, setController] = useState('All')

  const positions = {
    snackbar: ['top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right'],
    modal: [
      'top-center',
      'center-center',
      'bottom-center'],
  }
  const animations = {
    snackbar: ['fade',
      'scale',
      'slide-up',
      'slide-down',
      'slide-left',
      'slide-right'],
    modal: [
      'fade',
      'scale',
      'slide-up',
      'slide-down'],
  }

  const styles = {
    msgContainer: {
      m: 'auto',

      w: msgItem.config?.styles?.width,
      h: 'auto',
    },
    msgBackground: {
      w: '100%',
      h: '100%',
      flx: 'center',
      bd: 'rgba(0, 0, 0, 0.0)',
    },
    msgContent: {
      bd: msgItem.config?.styles?.background,
      p: msgItem.config?.styles?.padding,
      b: `${msgItem.config?.styles?.borderWidth} ${msgItem.config?.styles?.borderType} ${msgItem.config?.styles?.borderColor}`,
      brs: msgItem.config?.styles?.borderRadius,
      w: '100%',
      m: 'auto',
      pn: 'relative',
      wb: 'break-all',
      bs: objectArrayToStyleStringGenarator(msgItem?.config?.styles?.boxShadow || []),
    },
    close: {
      cr: msgItem.config?.styles?.closeIconColor,
      bd: msgItem.config?.styles?.closeBackground,
      pn: 'absolute',
      rt: '7px',
      ...msgItem?.config?.msgType === 'modal' && { tp: '7px' },
      ...msgItem?.config?.msgType === 'snackbar' && { tp: '50%', tm: 'translateY(-50%)' },
      h: '25px',
      w: '25px',
      b: 'none',
      brs: '50%',
      p: 0,
      dy: 'grid',
      g: 'center',
      cur: 'pointer',
      ':hover': {
        cr: msgItem.config?.styles?.closeIconHover,
        bd: msgItem.config?.styles?.closeHover,
      },
      ':focus': {
        cr: msgItem.config?.styles?.closeIconHover,
        cur: 'pointer',
      },
    },
    closeIcon: {
      w: '15px',
      h: '15px',
      // 'stroke-width': 2,
    },
    styleButton: {
      oe: 'none',
      p: '10px 10px',
      fs: '14px',
      fw: '600',
      b: 'none',
      bd: 'none',
      brs: 8,
      w: 'auto',
      h: 33,
      flxi: 'center',
      mr: 2,
      zx: 1,
      ow: 'hidden',
      curp: 1,
      pn: 'relative',
      cr: 'var(--b-54-12)',
      ':disabled': { oy: 0.4, cur: 'not-allowed' },
      ':focus:not(:focus-visible)': { bs: 'none' },
      ':hover:not(:disabled, .active)': { cr: 'var(--b-53-13)' },
      ':focus-visible': { bs: '0 0 0 2px var(--b-50) inset' },
      '&.active': {
        bd: 'var(--b-79-96)',
        cr: 'var(--b-50)',
      },
      '::before': {
        ct: '""',
        zx: -1,
        pn: 'absolute',
        size: 0,
        // tp: '50%',
        // lt: '50%',
        // brs: 8,
        // tm: 'translate(-50%,-50%)',
        tn: '400ms border, opacity 300ms',
        oy: 0,
        b: '0px solid var(--white-0-81-32)',
      },
      ':hover::before': { b: '60px solid var(--white-0-81-32)', oy: 1 },
      ':disabled::before': { dy: 'none' },
    },
    input: {
      h: '30px !important',
      fs: '12px !important',
      fw: 600,
      bd: '#f0f0f1 !important',
      brs: '8px !important',
      b: 'none !important',
      ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
    },
    selectInput: {
      h: '30px !important',
      fs: '12px !important',
      fw: 600,
      bc: '#f0f0f1 !important',
      brs: '8px !important',
      b: 'none !important',
      ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
    },
    colorInput: {
      w: 30,
      p: 0,
      brs: '8px !important',
      '-webkit-appearance': 'none',
      '::-webkit-color-swatch-wrapper': { p: 0 },
      '::-webkit-color-swatch': {
        b: '1px solid #afafaf',
        brs: '8px !important',
      },
      '::-moz-color-swatch': {
        b: '1px solid #afafaf',
        brs: '8px !important',
      },
      '::-moz-focus-inner': {
        b: '1px solid #afafaf',
        brs: '8px !important',
      },
    },
    segmentcontainer: {
      flx: 'align-center',
      jc: 'flex-end',
      flxp: 'wrap',
      mt: 10,
      w: 220,
    },
    segmentWrapper: {
      w: 255,
      p: '0px 20px',
    },
    titlecontainer: { flx: 'center-between' },
    title: { fs: 12, fw: 500 },
    label: {
      fs: '12px',
      fw: '500',
    },
    backgrounLabel: { w: 195 },
    valueLabel: { fs: '12px' },
  }

  return (
    <>
      <div className={css({ p: 10, flx: '1', fd: 'column' })}>

        <div className={css({ flx: 1, fd: 'column', rg: 5 })}>
          <div>
            <div className={css({ flx: 'align-center', cg: 5 })}>
              <span className={css({ w: 130 })}>{__('Message Styles', 'bitform')}</span>
              <select
                className={css(styles.selectInput)}
                name="animation"
                value={allConf.type.successMsg[id]?.config?.animation}
                onChange={handleMsgAnimation}
              >
                <option value="custom-style">Custom Style</option>
              </select>
              <button type="button" className={css(styles.input, { curp: 1 })} title="Edit styles" onClick={() => setModal({ show: true })}>
                <span><EditIcn size="20" /></span>
              </button>
            </div>
          </div>
          <div>
            <span className={css({ w: 130 })}>{__('Message Type', 'bitform')}</span>
            <CheckBox radio name={`msg-type-${id}`} onChange={handleMsgType} checked={msgItem?.config?.msgType === 'snackbar'} title={<small className="txt-dp"><b>Snackbar</b></small>} value="snackbar" />
            <CheckBox radio name={`msg-type-${id}`} onChange={handleMsgType} checked={msgItem?.config?.msgType === 'modal'} title={<small className="txt-dp"><b>Modal</b></small>} value="modal" />
          </div>
          <div className={css({ flx: 1, cg: 5 })}>
            <div className={css({ flx: 'align-center' })}>
              <span className={css({ fs: 15, w: 80 })}>Animation</span>
              <select
                className={css(styles.selectInput)}
                name="animation"
                value={msgItem?.config?.animation}
                onChange={handleMsgAnimation}
              >
                {
                  animations[msgItem.config?.msgType]?.map(value => <option value={value}>{value.replace(/-/g, ' ').replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}</option>)
                }
              </select>
            </div>
            {(msgItem?.config?.msgType === 'snackbar' || ['slide-up', 'slide-down'].includes(msgItem?.config?.animation)) && (
              <div className={css({ flx: 'align-center' })}>
                <span className={css({ fs: 15, w: 65 })}>Position</span>
                <select
                  className={css(styles.selectInput)}
                  name="position"
                  value={msgItem?.config?.position}
                  onChange={handlePositionChange}
                >
                  {
                    positions[msgItem?.config?.msgType]?.map(value => <option value={value}>{value.replace(/-/g, ' ').replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}</option>)
                  }
                </select>
              </div>
            )}
            <div className={css({ flx: 'align-center' })}>
              <span className={css({ fs: 15, w: 80 })}>Auto Hide</span>
              <SingleToggle name={`auto-hide-check-${id}`} action={handleAutoHide} isChecked={allConf.type.successMsg[id]?.config?.autoHide} className="flx" />
            </div>
            {allConf.type.successMsg[id]?.config?.autoHide && (
              <div className={css({ flx: 'align-center' })}>
                <span className={css({ fs: 15, w: 70 })}>Duration</span>
                <input placeholder="Duration" className={css(styles.input, { w: 50 })} type="number" value={msgItem?.config?.duration} onChange={handleDelay} />
                <small>Sec</small>
              </div>
            )}
          </div>
          <div>
            <button type="button" className={css(app.btn, app.blueGrd, { mt: 0 })} onClick={() => setMsgActive(!msgActive)}>Preview</button>
          </div>
        </div>
      </div>
      <SliderModal
        title="Confirmation Style"
        show={modal.show}
        setModal={setModal}
        className={css({ h: '500px !important', w: '550px !important' })}
      >
        <div className="confirmation-style">
          <div className={`style-preview ${css({ h: '250px', p: '40px 20px', ow: 'auto', bd: '#E8E8E8' })}`}>
            <div className={`msg-container-${id} ${css(styles.msgContainer)}`}>
              <div className={`msg-background-${id} ${css(styles.msgBackground)}`}>
                <div className={`msg-content-${id} ${css(styles.msgContent)}`}>
                  <button
                    className={`close-${id} ${css(styles.close)}`}
                    type="button"
                  >
                    <svg className={`close-icn-${id} ${css(styles.closeIcon)}`} viewBox="0 0 30 30">
                      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" x1="4" y1="3.88" x2="26" y2="26.12" />
                      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" x1="26" y1="3.88" x2="4" y2="26.12" />
                    </svg>
                  </button>
                  <div>{renderHTMR(msgItem?.msg)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={css({ h: '210px', bd: 'white', bt: '1px solid #abaaaa' })}>
            <div className={css({ p: '10px 20px' })}>
              <button type="button" name="background" className={`${css(styles.styleButton)} ${activePeperties === 'background' && 'active'}`} onClick={handleActiveProperties}>
                Background
              </button>
              <button type="button" name="border" className={`${css(styles.styleButton)} ${activePeperties === 'border' && 'active'}`} onClick={handleActiveProperties}>
                Border
              </button>
              <button type="button" name="shadow" className={`${css(styles.styleButton)} ${activePeperties === 'shadow' && 'active'}`} onClick={handleActiveProperties}>
                Shadow
              </button>
              <button type="button" name="width" className={`${css(styles.styleButton)} ${activePeperties === 'width' && 'active'}`} onClick={handleActiveProperties}>
                Width
              </button>
              <button type="button" name="padding" className={`${css(styles.styleButton)} ${activePeperties === 'padding' && 'active'}`} onClick={handleActiveProperties}>
                Padding
              </button>
            </div>
            <div className="properties-container">
              {activePeperties === 'background' && (
                <div className={css({ dy: 'flex', fd: 'column', p: '0px 20px', rg: 5 })}>
                  <div className={css({ flx: 'align-center', cg: 5 })}>
                    <span className={css(styles.label, styles.backgrounLabel)}>Message Background Color</span>
                    <input type="color" name="background" className={css({ ml: 88 }, styles.input, styles.colorInput)} value={msgItem.config?.styles?.background} onChange={handleConfirmationStyle} />
                    <input type="text" name="background" className={css({ w: 165 }, styles.input)} value={msgItem.config?.styles?.background} onChange={handleConfirmationStyle} />
                  </div>
                  <div className={css({ flx: 'align-center', cg: 5 })}>
                    <span className={css(styles.label, styles.backgrounLabel)}>Close Button Background Color</span>
                    <select name="closeColorType" className={css({ w: 80 }, styles.selectInput)} value={closeColorType} onChange={handleColorTypeChange}>
                      <option value="default">Default</option>
                      <option value="hover">Hover</option>
                    </select>
                    <input type="color" name={closeColorType === 'default' ? 'closeBackground' : 'closeHover'} className={css(styles.input, styles.colorInput)} value={closeColorType === 'default' ? msgItem.config?.styles?.closeBackground : msgItem.config?.styles?.closeHover} onChange={handleConfirmationStyle} />
                    <input type="text" name={closeColorType === 'default' ? 'closeBackground' : 'closeHover'} className={css({ w: 165 }, styles.input)} value={closeColorType === 'default' ? msgItem.config?.styles?.closeBackground : msgItem.config?.styles?.closeHover} onChange={handleConfirmationStyle} />
                  </div>
                  <div className={css({ flx: 'align-center', cg: 5 })}>
                    <span className={css(styles.label, styles.backgrounLabel)}>Close icon color</span>
                    <select name="closeIconColorType" className={css({ w: 80 }, styles.selectInput)} value={closeIconColorType} onChange={handleColorTypeChange}>
                      <option value="default">Default</option>
                      <option value="hover">Hover</option>
                    </select>
                    <input
                      type="color"
                      name={closeIconColorType === 'default' ? 'closeIconColor' : 'closeIconHover'}
                      className={css(styles.input, styles.colorInput)}
                      value={closeIconColorType === 'default' ? msgItem.config?.styles?.closeIconColor : msgItem.config?.styles?.closeIconHover}
                      onChange={handleConfirmationStyle}
                    />
                    <input
                      type="text"
                      name={closeIconColorType === 'default' ? 'closeIconColor' : 'closeIconHover'}
                      className={css({ w: 165 }, styles.input)}
                      value={closeIconColorType === 'default' ? msgItem.config?.styles?.closeIconColor : msgItem.config?.styles?.closeIconHover}
                      onChange={handleConfirmationStyle}
                    />
                  </div>
                </div>
              )}

              {activePeperties === 'border' && (
                <div className={css({ dy: 'flex', fd: 'column', p: '0px 20px' })}>
                  <div className={css({ flx: 'align-center' })}>
                    <span className={css(styles.valueLabel, { ml: 102 })}>Color</span>
                    <span className={css(styles.valueLabel, { ml: 124 })}>Thickness</span>
                    <span className={css(styles.valueLabel, { ml: 30 })}>Type</span>
                  </div>
                  <div className={css({ flx: 'align-center', mb: 5, cg: 5 })}>
                    <span className={css({ w: 55 }, styles.label)}>Border</span>
                    <input type="color" name="borderColor" className={css(styles.input, styles.colorInput)} value={msgItem.config?.styles?.borderColor} onChange={handleConfirmationStyle} />
                    <input type="text" name="borderColor" className={css({ w: 150 }, styles.input)} value={msgItem.config?.styles?.borderColor} onChange={handleConfirmationStyle} />
                    <input type="text" name="borderWidth" className={css({ w: 80 }, styles.input)} value={msgItem.config?.styles?.borderWidth} onChange={handleConfirmationStyle} />
                    <select name="borderType" className={css({ w: 80 }, styles.selectInput)} value={msgItem.config?.styles?.borderType} onChange={handleConfirmationStyle}>
                      <option value="none">None</option>
                      <option value="hidden">Hidden</option>
                      <option value="dotten">Dotted</option>
                      <option value="dashed">Dashed</option>
                      <option value="solid">Solid</option>
                      <option value="double">Double</option>
                      <option value="groove">Groove</option>
                      <option value="ridge">Ridge</option>
                      <option value="inset">Inset</option>
                      <option value="outset">Outset</option>
                      <option value="initial">Inital</option>
                      <option value="inherit">Inherit</option>
                    </select>
                  </div>
                  <div className={css({ flx: 'align-center', cg: 5 })}>
                    <span className={css({ w: 55 }, styles.label)}>Radius</span>
                    <input type="text" name="borderRadius" className={css({ w: 80 }, styles.input)} value={msgItem.config?.styles?.borderRadius} onChange={handleConfirmationStyle} />
                  </div>
                </div>
              )}
              {activePeperties === 'shadow' && (
                <div className={css({ dy: 'flex', fd: 'column', p: '0px 20px' })}>
                  <div className={css({ flx: 'align-center', cg: 5 })}>
                    <span className={css(styles.valueLabel, { ml: 48 })}>Color</span>
                    <span className={css(styles.valueLabel, { ml: 92 })}>X</span>
                    <span className={css(styles.valueLabel, { ml: 45 })}>Y</span>
                    <span className={css(styles.valueLabel, { ml: 42 })}>Blur</span>
                    <span className={css(styles.valueLabel, { ml: 25 })}>Spread</span>
                    <span className={css(styles.valueLabel, { ml: 12 })}>Inset</span>
                  </div>
                  <div className={css({ flx: 'space-between' })}>
                    <div className={css({ h: 110, ow: 'auto', px: 5, pt: 2, w: '100%' })}>
                      {msgItem.config?.styles?.boxShadow?.map((shadow, index) => (
                        <div className={css({ flx: 'align-center', mb: 5, cg: 5 })}>
                          <input type="color" name="color" className={css(styles.input, styles.colorInput)} value={shadow.color} onChange={(e) => handleConfirmationShadow(e, index)} />
                          <input type="text" name="color" className={css({ w: 120 }, styles.input)} value={shadow.color} onChange={(e) => handleConfirmationShadow(e, index)} />
                          <input type="text" name="x" className={css({ w: 50 }, styles.input)} value={shadow.x} onChange={(e) => handleConfirmationShadow(e, index)} />
                          <input type="text" name="y" className={css({ w: 50 }, styles.input)} value={shadow.y} onChange={(e) => handleConfirmationShadow(e, index)} />
                          <input type="text" name="blur" className={css({ w: 50 }, styles.input)} value={shadow.blur} onChange={(e) => handleConfirmationShadow(e, index)} />
                          <input type="text" name="spread" className={css({ w: 50 }, styles.input)} value={shadow.spread} onChange={(e) => handleConfirmationShadow(e, index)} />

                          <select name="inset" className={css({ w: 72 }, styles.selectInput)} value={shadow.inset} onChange={(e) => handleConfirmationShadow(e, index)}>
                            <option value="">Outset</option>
                            <option value="inset">Inset</option>
                          </select>
                          <span role="button" tabIndex={0} onKeyPress={(e) => handleShadowDelete(e, index)} onClick={(e) => handleShadowDelete(e, index)}>
                            <CloseIcn size="12" className={css({ curp: 1 })} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={css({ flx: 'center', pt: 5 })}>
                    <span className={css({ curp: 1 })} role="button" tabIndex={0} onKeyPress={handleAddShadow} onClick={handleAddShadow}>
                      <CloseIcn size="12" className={css({ curp: 1, tm: 'rotate(45deg)' })} />
                    </span>
                  </div>
                </div>
              )}
              {activePeperties === 'width' && (
                <div className={css({ dy: 'flex', fd: 'column', p: '0px 20px' })}>
                  <div className={css({ flx: 'align-center', cg: 5 })}>
                    <span className={css(styles.label, { w: 55 })}>Width</span>
                    <input type="text" name="width" className={css({ w: '100px' }, styles.input)} value={msgItem.config?.styles?.width} onChange={handleConfirmationStyle} />
                  </div>
                </div>
              )}
              {activePeperties === 'padding'
                && (
                  <div className={css(styles.segmentWrapper)}>
                    <div className={css(styles.titlecontainer)}>
                      <span className={css(styles.title)}>Padding</span>
                      <StyleSegmentControl
                        square
                        defaultActive="All"
                        options={options}
                        values={60}
                        component="button"
                        onChange={lbl => setController(lbl)}
                        show={['icn']}
                        variant="lightgray"
                        noShadow
                      />
                    </div>
                    <div className={css(styles.segmentcontainer)}>
                      <Grow open={controller === 'All'}>
                        <div className={css({ p: 2 })}>
                          <SizeControl
                            min="0"
                            inputHandler={handleValues}
                            sizeHandler={({ unitKey, unitValue, indexId }) => handleValues({ value: unitValue, unit: unitKey, indexId })}
                            id="0"
                            label={<BoxFullIcon size={14} />}
                            value={getNumFromStr(values[0]) || 0}
                            unit={getStrFromStr(values[0]) || 'px'}
                            options={unitOption}
                            width="110px"
                          />
                        </div>
                      </Grow>
                      <Grow open={controller === 'Individual'}>
                        <div className={css(ut.flxc, { flxp: 'wrap', jc: 'end', p: 2 })}>
                          <SizeControl
                            min="0"
                            inputHandler={handleValues}
                            sizeHandler={({ unitKey, unitValue, indexId }) => handleValues({ value: unitValue, unit: unitKey, indexId })}
                            id="0"
                            label={<BoxIcon size="14" varient="top" />}
                            width="100px"
                            value={getNumFromStr(values[0]) || 0}
                            unit={getStrFromStr(values[0]) || 'px'}
                            options={unitOption}
                            className={css(ut.mr1, ut.mb1)}
                          />
                          <SizeControl
                            min="0"
                            inputHandler={handleValues}
                            sizeHandler={({ unitKey, unitValue, indexId }) => handleValues({ value: unitValue, unit: unitKey, indexId })}
                            id="1"
                            label={<BoxIcon size="14" varient="right" />}
                            width="100px"
                            value={getNumFromStr(values[1]) || 0}
                            unit={getStrFromStr(values[1]) || 'px'}
                            options={unitOption}
                            className={css(ut.mr1, ut.mb1)}
                          />
                          <SizeControl
                            min="0"
                            inputHandler={handleValues}
                            sizeHandler={({ unitKey, unitValue, indexId }) => handleValues({ value: unitValue, unit: unitKey, indexId })}
                            id="2"
                            label={<BoxIcon size="14" varient="bottom" />}
                            width="100px"
                            value={getNumFromStr(values[2]) || 0}
                            unit={getStrFromStr(values[2]) || 'px'}
                            options={unitOption}
                            className={css(ut.mr1, ut.mb1)}
                          />
                          <SizeControl
                            min="0"
                            inputHandler={handleValues}
                            sizeHandler={({ unitKey, unitValue, indexId }) => handleValues({ value: unitValue, unit: unitKey, indexId })}
                            id="3"
                            label={<BoxIcon size="14" varient="left" />}
                            width="100px"
                            value={getNumFromStr(values[3]) || 0}
                            unit={getStrFromStr(values[3]) || 'px'}
                            options={unitOption}
                            className={css(ut.mr1, ut.mb1)}
                          />
                        </div>
                      </Grow>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
        <div> Sample</div>
      </SliderModal>
      <ConfirmMsgPreview
        index={id}
        msgId={msgItem.id || id}
        active={msgActive}
        setActive={setMsgActive}
        msgType={msgItem?.config?.msgType || 'snackbar'}
        position={msgItem?.config?.position || 'top-center'}
        animation={msgItem?.config?.animation || 'fade'}
        autoHide={msgItem?.config?.autoHide || false}
        duration={msgItem?.config?.duration || 1}
        message={msgItem?.msg}
        confirmationStyles={msgItem?.config?.styles || ''}
      />

      <TinyMCE
        id={`conf-${id}`}
        formFields={fieldsArr}
        value={msgItem?.msg}
        onChangeHandler={val => handleMsg(val, id)}
      />
    </>
  )
}

export default memo(Message)
