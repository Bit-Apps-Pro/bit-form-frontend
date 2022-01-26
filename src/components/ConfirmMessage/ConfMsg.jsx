/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

import { memo, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useImmer } from 'use-immer'
import { $confirmations, $fieldsArr, $updateBtn } from '../../GlobalStates/GlobalStates'
import BoxFullIcon from '../../Icons/BoxFullIcon'
import BoxIcon from '../../Icons/BoxIcon'
import CloseIcn from '../../Icons/CloseIcn'
import EditIcn from '../../Icons/EditIcn'
import StackIcn from '../../Icons/StackIcn'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import { objectArrayToStyleStringGenarator } from '../style-new/styleHelpers'
import Accordions from '../Utilities/Accordions'
import Button from '../Utilities/Button'
import CheckBox from '../Utilities/CheckBox'
import ConfirmModal from '../Utilities/ConfirmModal'
import SingleToggle from '../Utilities/SingleToggle'
import SliderModal from '../Utilities/SliderModal'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import TinyMCE from '../Utilities/TinyMCE'
import ConfirmMsgPreview from './ConfirmMsgPreview'

function ConfMsg({ removeIntegration }) {
  const [confMdl, setConfMdl] = useState({ show: false, action: null })
  const [allConf, setAllConf] = useRecoilState($confirmations)
  const fieldsArr = useRecoilValue($fieldsArr)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const [msgType, setMsgType] = useState('snackbar')
  const [position, setPosition] = useState('top-center')
  const [animation, setAnimation] = useState('fade')
  const [autoHide, setAutoHide] = useState(false)
  const [duration, setDuration] = useState(1)
  const [msgActive, setMsgActive] = useState(false)
  const [modal, setModal] = useState({ show: false })
  const [closeColorType, setCloseColorType] = useState('default')
  const [closeIconColorType, setCloseIconColorType] = useState('default')
  const [confirmationStyles, setConfirmationStyles] = useImmer({
    width: '300px',
    background: '#fafafa',
    borderWidth: '1px',
    borderType: 'solid',
    borderColor: 'gray',
    borderRadius: '10px',
    boxShadow: [{ x: '0px', y: '27px', blur: '30px', spread: '', color: 'rgb(0 0 0 / 18%)', inset: '' },
      { x: '0px', y: '5.2px', blur: '9.4px', spread: '5px', color: 'rgb(0 0 0 / 6%)', inset: '' },
      { x: '0px', y: '5.2px', blur: '9.4px', spread: '5px', color: 'rgb(0 0 0 / 6%)', inset: 'inset' },
      { x: '0px', y: '11.1px', blur: '14px', spread: '', color: 'rgb(0 0 0 / 14%)', inset: '' }],
    closeBackground: '#48484829',
    closeHover: '#dfdfdf',
    closeIconColor: '#5a5a5a',
    closeIconHover: '#000',
  })

  const { css } = useFela()

  const [activePeperties, setActiveProperties] = useState('background')

  const handleActiveProperties = ({ target: { name } }) => {
    setActiveProperties(name)
  }

  const handlePositionChange = ({ target: { value } }) => setPosition(value)

  const handleMsgType = ({ target: { value } }) => setMsgType(value)

  const handleMsgAnimation = ({ target: { value } }) => setAnimation(value)

  const handleDelay = ({ target: { value } }) => setDuration((value > 0 ? value : 1))

  const handleAutoHide = () => setAutoHide(prevState => !prevState)

  const handleColorTypeChange = ({ target: { name, value } }) => {
    if (name === 'closeColorType') {
      setCloseColorType(value)
    } else if (name === 'closeIconColorType') {
      setCloseIconColorType(value)
    }
  }

  const handleConfirmationStyle = ({ target: { name, value } }) => setConfirmationStyles(prvStyle => {
    prvStyle[name] = value
  })

  const handleConfirmationShadow = ({ target: { name, value } }, index) => setConfirmationStyles(prevState => {
    prevState.boxShadow[index][name] = value
  })

  const handleShadowDelete = (e, index) => setConfirmationStyles(prevState => {
    prevState.boxShadow.splice(index, 1)
  })

  const handleAddShadow = () => {
    setConfirmationStyles(prvStyle => {
      prvStyle.boxShadow.push({ x: '0px', y: '27px', blur: '30px', spread: '', color: 'rgb(0 0 0 / 18%)', inset: '' })
    })
  }

  const handleMsg = (mg, idx) => {
    const confirmation = deepCopy(allConf)
    confirmation.type.successMsg[idx].msg = mg
    setAllConf(confirmation)
    setUpdateBtn({ unsaved: true })
  }

  const handleMsgTitle = (e, idx) => {
    const confirmation = deepCopy(allConf)
    confirmation.type.successMsg[idx].title = e.target.value
    setAllConf(confirmation)
    setUpdateBtn({ unsaved: true })
  }

  const addMoreMsg = () => {
    const confirmation = deepCopy(allConf)
    if (confirmation?.type?.successMsg) {
      confirmation.type.successMsg.push({ title: `Untitled Message ${confirmation.type.successMsg.length + 1}`, msg: __('Successfully Submitted.', 'bitform') })
    } else {
      confirmation.type = { successMsg: [], ...confirmation.type }
      confirmation.type.successMsg.push({ title: `Untitled Message ${confirmation.type.successMsg.length + 1}`, msg: __('Successfully Submitted.', 'bitform') })
    }
    setAllConf(confirmation)
    setUpdateBtn({ unsaved: true })
  }

  const closeMdl = () => {
    confMdl.show = false
    setConfMdl({ ...confMdl })
  }

  const showDelConf = (i) => {
    confMdl.show = true
    confMdl.action = () => rmvMsg(i)
    setConfMdl({ ...confMdl })
  }

  const rmvMsg = async i => {
    const confirmation = deepCopy(allConf)
    const tmpData = confirmation.type.successMsg[i]
    confirmation.type.successMsg.splice(i, 1)
    setAllConf(confirmation)
    confMdl.show = false
    setConfMdl({ ...confMdl })
    if (tmpData.id !== undefined) {
      const status = await removeIntegration(tmpData.id, 'msg')
      if (!status) {
        confirmation.type.successMsg.splice(i, 0, tmpData)
        setAllConf(confirmation)
      }
    }
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
      w: confirmationStyles.width,
      h: 'auto',
    },
    msgBackground: {
      w: '100%',
      h: '100%',
      flx: 'center',
      bd: 'rgba(0, 0, 0, 0.0)',
    },
    msgContent: {
      bd: confirmationStyles.background,
      p: '5px 35px 5px 20px',
      b: `${confirmationStyles.borderWidth} ${confirmationStyles.borderType} ${confirmationStyles.borderColor}`,
      brs: confirmationStyles.borderRadius,
      w: '100%',
      m: 'auto',
      pn: 'relative',
      wb: 'break-all',
      bs: objectArrayToStyleStringGenarator(confirmationStyles.boxShadow),
    },
    close: {
      cr: confirmationStyles.closeIconColor,
      bd: confirmationStyles.closeBackground,
      pn: 'absolute',
      rt: '7px',
      ...msgType === 'modal' && { tp: '7px' },
      ...msgType === 'snackbar' && { tp: '50%', tm: 'translateY(-50%)' },
      h: '25px',
      w: '25px',
      b: 'none',
      brs: '50%',
      p: 0,
      dy: 'grid',
      g: 'center',
      cur: 'pointer',
      ':hover': {
        cr: confirmationStyles.closeIconHover,
        bd: confirmationStyles.closeHover,
      },
      ':focus': {
        cr: confirmationStyles.closeIconHover,
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
    <div>
      <ConfirmModal
        action={confMdl.action}
        show={confMdl.show}
        body={__('Are you sure to delete this message ?', 'bitform')}
        btnTxt={__('Delete', 'bitform')}
        close={closeMdl}
      />

      {allConf?.type?.successMsg ? allConf.type.successMsg?.map((item, i) => (
        <div key={`f-m-${i + 1}`} className="flx">
          <Accordions
            title={item.title}
            titleEditable
            cls="mt-2 mr-2 w-9"
            onTitleChange={e => handleMsgTitle(e, i)}
          >
            <div className={css({ p: 10, flx: '1', fd: 'column' })}>

              <div className={css({ flx: 1, fd: 'column', rg: 5 })}>
                <div>
                  <div className={css({ flx: 'align-center', cg: 5 })}>
                    <span className={css({ w: 130 })}>{__('Message Styles', 'bitform')}</span>
                    <select
                      className={css(styles.selectInput)}
                      name="animation"
                      value={animation}
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
                  <CheckBox radio name="msg-type" onChange={handleMsgType} checked={msgType === 'snackbar'} title={<small className="txt-dp"><b>Snackbar</b></small>} value="snackbar" />
                  <CheckBox radio name="msg-type" onChange={handleMsgType} checked={msgType === 'modal'} title={<small className="txt-dp"><b>Modal</b></small>} value="modal" />
                </div>
                <div className={css({ flx: 1, cg: 5 })}>
                  <div className={css({ flx: 'align-center' })}>
                    <span className={css({ fs: 15, w: 80 })}>Animation</span>
                    <select
                      className={css(styles.selectInput)}
                      name="animation"
                      value={animation}
                      onChange={handleMsgAnimation}
                    >
                      {
                        animations[msgType].map(value => <option value={value}>{value.replace(/-/g, ' ').replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}</option>)
                      }
                    </select>
                  </div>
                  {(msgType === 'snackbar' || ['slide-up', 'slide-down'].includes(animation)) && (
                    <div className={css({ flx: 'align-center' })}>
                      <span className={css({ fs: 15, w: 65 })}>Position</span>
                      <select
                        className={css(styles.selectInput)}
                        name="position"
                        value={position}
                        onChange={handlePositionChange}
                      >
                        {
                          positions[msgType].map(value => <option value={value}>{value.replace(/-/g, ' ').replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}</option>)
                        }
                      </select>
                    </div>
                  )}
                  <div className={css({ flx: 'align-center' })}>
                    <span className={css({ fs: 15, w: 80 })}>Auto Hide</span>
                    <SingleToggle action={handleAutoHide} isChecked={autoHide} className="flx" />
                  </div>
                  {autoHide && (
                    <div className={css({ flx: 'align-center' })}>
                      <span className={css({ fs: 15, w: 70 })}>Duration</span>
                      <input placeholder="Duration" className={css(styles.input, { w: 50 })} type="number" value={duration} onChange={handleDelay} />
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
                  <div className={`msg-container-${i} ${css(styles.msgContainer)}`}>
                    <div className={`msg-background-${i} ${css(styles.msgBackground)}`}>
                      <div className={`msg-content-${i} ${css(styles.msgContent)}`}>
                        <button
                          className={`close-${i} ${css(styles.close)}`}
                          type="button"
                        >
                          <svg className={`close-icn-${i} ${css(styles.closeIcon)}`} viewBox="0 0 30 30">
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" x1="4" y1="3.88" x2="26" y2="26.12" />
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" x1="26" y1="3.88" x2="4" y2="26.12" />
                          </svg>
                        </button>
                        {/* eslint-disable-next-line react/no-danger */}
                        <div dangerouslySetInnerHTML={{ __html: item.msg }} />
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
                          <input type="color" name="background" className={css({ ml: 88 }, styles.input, styles.colorInput)} value={confirmationStyles.background} onChange={handleConfirmationStyle} />
                          <input type="text" name="background" className={css({ w: 165 }, styles.input)} value={confirmationStyles.background} onChange={handleConfirmationStyle} />
                        </div>
                        <div className={css({ flx: 'align-center', cg: 5 })}>
                          <span className={css(styles.label, styles.backgrounLabel)}>Close Button Background Color</span>
                          <select name="closeColorType" className={css({ w: 80 }, styles.selectInput)} value={closeColorType} onChange={handleColorTypeChange}>
                            <option value="default">Default</option>
                            <option value="hover">Hover</option>
                          </select>
                          <input type="color" name={closeColorType === 'default' ? 'closeBackground' : 'closeHover'} className={css(styles.input, styles.colorInput)} value={closeColorType === 'default' ? confirmationStyles.closeBackground : confirmationStyles.closeHover} onChange={handleConfirmationStyle} />
                          <input type="text" name={closeColorType === 'default' ? 'closeBackground' : 'closeHover'} className={css({ w: 165 }, styles.input)} value={closeColorType === 'default' ? confirmationStyles.closeBackground : confirmationStyles.closeHover} onChange={handleConfirmationStyle} />
                        </div>
                        <div className={css({ flx: 'align-center', cg: 5 })}>
                          <span className={css(styles.label, styles.backgrounLabel)}>Close icon color</span>
                          <select name="closeIconColorType" className={css({ w: 80 }, styles.selectInput)} value={closeIconColorType} onChange={handleColorTypeChange}>
                            <option value="default">Default</option>
                            <option value="hover">Hover</option>
                          </select>
                          <input type="color" name={closeIconColorType === 'default' ? 'closeIconColor' : 'closeIconHover'} className={css(styles.input, styles.colorInput)} value={closeIconColorType === 'default' ? confirmationStyles.closeIconColor : confirmationStyles.closeIconHover} onChange={handleConfirmationStyle} />
                          <input type="text" name={closeIconColorType === 'default' ? 'closeIconColor' : 'closeIconHover'} className={css({ w: 165 }, styles.input)} value={closeIconColorType === 'default' ? confirmationStyles.closeIconColor : confirmationStyles.closeIconHover} onChange={handleConfirmationStyle} />
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
                          <input type="color" name="borderColor" className={css(styles.input, styles.colorInput)} value={confirmationStyles.borderColor} onChange={handleConfirmationStyle} />
                          <input type="text" name="borderColor" className={css({ w: 150 }, styles.input)} value={confirmationStyles.borderColor} onChange={handleConfirmationStyle} />
                          <input type="text" name="borderWidth" className={css({ w: 80 }, styles.input)} value={confirmationStyles.borderWidth} onChange={handleConfirmationStyle} />
                          <select name="borderType" className={css({ w: 80 }, styles.selectInput)} value={confirmationStyles.borderType} onChange={handleConfirmationStyle}>
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
                          <input type="text" name="borderRadius" className={css({ w: 80 }, styles.input)} value={confirmationStyles.borderRadius} onChange={handleConfirmationStyle} />
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
                            {confirmationStyles.boxShadow.map((shadow, index) => (
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
                          <input type="text" name="width" className={css({ w: '100px' }, styles.input)} value={confirmationStyles.width} onChange={handleConfirmationStyle} />
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
                              activeValue={controller}
                            />
                          </div>
                          <div className={css(styles.segmentcontainer)}>
                            <Grow open={controller === 'All'}>
                              <div className={css({ p: 2 })}>
                                <SizeControl
                                  min="0"
                                  inputHandler={() => { }}
                                  sizeHandler={() => { }}
                                  id="0"
                                  label={<BoxFullIcon size={14} />}
                                  value={0}
                                  unit="px"
                                  options={unitOption}
                                  width="110px"
                                />
                              </div>
                            </Grow>
                            <Grow open={controller === 'Individual'}>
                              <div className={css(ut.flxc, { flxp: 'wrap', jc: 'end', p: 2 })}>
                                <SizeControl
                                  min="0"
                                  inputHandler={() => { }}
                                  sizeHandler={() => { }}
                                  id="0"
                                  label={<BoxIcon size="14" varient="top" />}
                                  width="100px"
                                  value={0}
                                  unit="px"
                                  options={unitOption}
                                  className={css(ut.mr1, ut.mb1)}
                                />
                                <SizeControl
                                  min="0"
                                  inputHandler={() => { }}
                                  sizeHandler={() => { }}
                                  id="0"
                                  label={<BoxIcon size="14" varient="right" />}
                                  width="100px"
                                  value={0}
                                  unit="px"
                                  options={unitOption}
                                  className={css(ut.mr1, ut.mb1)}
                                />
                                <SizeControl
                                  min="0"
                                  inputHandler={() => { }}
                                  sizeHandler={() => { }}
                                  id="0"
                                  label={<BoxIcon size="14" varient="bottom" />}
                                  width="100px"
                                  value={0}
                                  unit="px"
                                  options={unitOption}
                                  className={css(ut.mr1, ut.mb1)}
                                />
                                <SizeControl
                                  min="0"
                                  inputHandler={() => { }}
                                  sizeHandler={() => { }}
                                  id="0"
                                  label={<BoxIcon size="14" varient="left" />}
                                  width="100px"
                                  value={0}
                                  unit="px"
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
              active={msgActive}
              setActive={setMsgActive}
              msgType={msgType}
              position={position}
              animation={animation}
              autoHide={autoHide}
              duration={duration}
              message={item.msg}
              confirmationStyles={confirmationStyles}
            />
            <TinyMCE
              id={`conf-${i}`}
              formFields={fieldsArr}
              value={item.msg}
              onChangeHandler={val => handleMsg(val, i)}
            />
          </Accordions>
          <Button onClick={() => showDelConf(i)} icn className="sh-sm white mt-2"><TrashIcn size={16} /></Button>
        </div>
      )) : (
        <div className={css(ut.btcdEmpty, ut.txCenter)}>
          <StackIcn size="50" />
          {__('Empty', 'bitform')}
        </div>
      )}
      <div className="txt-center"><Button onClick={addMoreMsg} icn className="sh-sm blue tooltip mt-2" style={{ '--tooltip-txt': `'${__('Add More Alternative Success Message', 'bitform')}'` }}><CloseIcn size="14" stroke="3" className="icn-rotate-45" /></Button></div>
    </div>
  )
}

export default memo(ConfMsg)
