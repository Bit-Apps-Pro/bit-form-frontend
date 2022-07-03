/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import ColorPicker from '@atomik-color/component'
import { str2Color } from '@atomik-color/core'
import produce from 'immer'
import { memo, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useFela } from 'react-fela'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $unsplashImgUrl, $unsplashMdl, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import bgImgControlStyle from '../../styles/backgroundControl.style'
import sc from '../../styles/commonStyleEditorStyle'
import { addToBuilderHistory, assignNestedObj } from '../../Utils/FormBuilderHelper'
import { __ } from '../../Utils/i18nwrap'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import ImageUploadInput from '../CompSettings/StyleCustomize/ChildComp/ImageUploadInput'
import SizeAspectRatioControl from '../CompSettings/StyleCustomize/ChildComp/SizeAspectRatioControl'
import SingleToggle from '../Utilities/SingleToggle'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import Tip from '../Utilities/Tip'
import { hsla2hsva, hsva2hsla } from './colorHelpers'
import ColorPreview from './ColorPreview'
import SimpleGradientColorPicker from './SimpleGradientColorPicker'
import { getObjByKey, getValueByObjPath, styleToGradientObj } from './styleHelpers'

function BackgroundControlMenu({ stateObjName,
  propertyPath,
  objectPaths,
  id,
  fldKey,
  canSetVariable = true }) {
  const [controller, setController] = useState({ parent: 'Solid', child: 'Solid', color: 'Custom' })
  const { css } = useFela()
  const { object, paths } = objectPaths
  const [color, setColor] = useState()
  const [bgImage, setBgImage] = useState()
  const [bgSize, setBgSize] = useState({
    type: 'auto',
    w: '0px',
    h: '0px',
  })
  const [bgPosition, setBgPosition] = useState({
    type: 'initial',
    x: '0px',
    y: '0px',
    value: 'center',
  })
  // const [bgPositionValue, setBgPositionValue] = useState('center')
  const [bgRepeat, setBgRepeat] = useState('initial')
  const [styles, setStyles] = useRecoilState($styles)
  const setThemeVars = useSetRecoilState($themeVars)
  const [themeColors, setThemeColors] = useRecoilState($themeColors)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const [unsplashMdl, setUnsplashMdl] = useRecoilState($unsplashMdl)
  const resetUnsplashImgUrl = useResetRecoilState($unsplashImgUrl)
  const [unsplashImgUrl, setUnsplashImgUrl] = useRecoilState($unsplashImgUrl)

  const stateObj = getObjByKey(object, { styles })

  const options = [
    { label: 'Custom', icn: 'Custom color', show: ['icn'], tip: 'Custom color' },
    { label: 'Var', icn: 'Variables', show: ['icn'], tip: 'Variable color' },
  ]

  const { '--global-bg-color': themeBgColor,
    '--global-fld-bdr': themeFldBdrClr,
    '--global-fld-bg-color': themeFldBgColor,
    '--global-font-color': themeFontColor,
    '--global-accent-color': themePrimaryColor } = themeColors

  const onValueChange = (pathName, val) => {
    switch (stateObjName) {
      case 'themeColors':
        setThemeColors(prvStyle => produce(prvStyle, drft => {
          drft[`${propertyPath}`] = val
        }))
        break
      case 'themeVars':
        setThemeVars(prvStyle => produce(prvStyle, drft => {
          drft[`${propertyPath}`] = val
        }))
        break
      case 'styles':
        setStyles(preStyle => produce(preStyle, drftStyle => {
          assignNestedObj(drftStyle, pathName, val)
        }))
        break
      default:
        break
    }
    // setStyleStateObj(object, pathName, val, { setStyles })
  }

  const gradientChangeHandler = (e) => {
    onValueChange(paths['background-image'], e.style)
    setBgImage(e.style)
  }

  const setSolidColor = (colorObj) => {
    if (typeof colorObj === 'object') {
      setColor(colorObj)
      handleColor(colorObj.h, colorObj.s, colorObj.v, colorObj.a)
    } else {
      const str = `var(${colorObj})`
      const getColor = themeColors[colorObj]
      if (getColor) {
        const [_h, _s, _v, _a] = getColor.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/gi)
        const [h, s, v, a] = hsla2hsva(_h, _s, _v, _a)
        setColor({ h, s, v, a })
        handleColor(h, s, v, a, str)
      } else {
        handleColor('', '', '', '', str)
      }
    }
  }

  const setColorState = (colorObj) => {
    if (typeof colorObj === 'object') {
      setColor(colorObj)
      handleColor(colorObj.h, colorObj.s, colorObj.v, colorObj.a)
    } else {
      const str = `var(${colorObj})`
      const getColor = themeColors[colorObj]
      if (getColor) {
        const [_h, _s, _v, _a] = getColor.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/gi)
        const [h, s, v, a] = hsla2hsva(_h, _s, _v, _a)
        setColor({ h, s, v, a })
        handleColor(h, s, v, a, str)
      } else {
        handleColor('', '', '', '', str)
      }
    }
  }

  const transparantColor = (e) => {
    const colorObj = { h: 0, s: 0, v: 0, a: 0 }
    if (e.target.checked) {
      setColorState(colorObj)
    } else {
      setColorState('--global-accent-color')
    }
  }

  const checkTransparant = () => {
    if (color?.h === 0 && color?.s === 0 && color?.v === 0 && color?.a === 0) {
      return true
    }
    return false
  }

  const handleColor = (_h, _s, _v, _a, str = '') => {
    const [h, s, l, a, hslaStr] = hsva2hsla(_h, _s, _v, _a)

    const event = 'color changed'
    const type = propertyPath
    const state = { fldKey: stateObjName }
    const historyData = { event, type, state }
    switch (stateObjName) {
      case 'themeColors':
        // eslint-disable-next-line no-case-declarations
        const newThemeColors = produce(themeColors, drftThmClr => {
          drftThmClr[propertyPath] = hslaStr
        })
        setThemeColors(newThemeColors)
        historyData.state.themeColors = newThemeColors
        addToBuilderHistory(setBuilderHistory, historyData, setUpdateBtn)
        break

      case 'themeVars':
        setThemeVars(prvState => produce(prvState, drftThmVar => {
          drftThmVar[propertyPath] = hslaStr
        }))
        break

      case 'styles':
        setStyles(prvState => produce(prvState, drftStyles => {
          let hslaColor = hslaStr
          const propertyPathArr = Array.isArray(paths) ? paths[0] : propertyPath
          const value = getValueByObjPath(drftStyles, propertyPathArr)
          const checkExistImportant = value?.match(/(!important)/gi)?.[0]
          if (checkExistImportant) hslaColor = `${hslaColor} !important`
          const clr = str || hslaColor
          if (Array.isArray(paths)) {
            paths.forEach(path => {
              assignNestedObj(drftStyles, path, clr)
            })
          } else {
            assignNestedObj(drftStyles, paths['background-image'], '')
            assignNestedObj(drftStyles, paths.background, clr)
          }
        }))
        break

      default:
        break
    }
  }

  const clearBgImage = (e) => {
    e.stopPropagation()
    setBgImage('')
    onValueChange(paths['background-image'], '')
    setUnsplashImgUrl('')
  }

  useEffect(() => {
    const tempBgImg = getValueByObjPath(stateObj, paths['background-image'])
    setBgImage(tempBgImg)
    setColor(str2Color(getValueByObjPath(stateObj, paths.background)))
    // setUnsplashImgUrl(tempBgImg)
  }, [])

  useEffect(() => {
    if (unsplashImgUrl) {
      onValueChange(paths['background-image'], `url(${unsplashImgUrl})`)
      setBgImage(`url(${unsplashImgUrl})`)
    }
    return () => {
      resetUnsplashImgUrl()
    }
  }, [unsplashImgUrl])

  const sizeSelectHandler = e => {
    setBgSize(prevBgSize => ({ ...prevBgSize, type: e.target.value }))
    onValueChange(paths['background-size'], `${e.target.value}`)
  }

  const positionSelectHandler = ({ target: { value } }) => {
    setBgPosition(prevBgPos => ({ ...prevBgPos, type: value }))
    if (value !== 'size' && value !== 'positions') {
      onValueChange(paths['background-position'], value)
    }
  }

  const bgRepeatSelectHandler = e => {
    setBgRepeat(e.target.value)
    onValueChange(paths['background-repeat'], e.target.value)
  }
  const positionChangeHandler = (value) => {
    // setBgPositionValue(value)
    setBgPosition(prevBgPos => ({ ...prevBgPos, value }))
    onValueChange(paths['background-position'], value)
  }

  const urlChangeHandler = e => {
    onValueChange(paths['background-image'], `url(${e.target.value})`)
    setBgImage(`url(${e.target.value})`)
  }
  const fldBgSizeHandler = (value, unit, inputId) => {
    if (inputId === 0) {
      setBgSize(prevBgSize => ({ ...prevBgSize, w: `${value}${unit}` }))
      onValueChange(paths['background-size'], `${value}${unit} ${bgSize.h}`)
    } else {
      setBgSize(prevBgSize => ({ ...prevBgSize, h: `${value}${unit}` }))
      onValueChange(paths['background-size'], `${bgSize.w} ${value}${unit}`)
    }
  }

  const fldBgPositionHandler = (value, unit, inputId) => {
    if (inputId === 0) {
      setBgPosition(prevBgPos => ({ ...prevBgPos, x: `${value}${unit}` }))
      onValueChange(paths['background-position'], `${value}${unit} ${bgPosition.y}`)
    } else {
      setBgPosition(prevBgPos => ({ ...prevBgPos, y: `${value}${unit}` }))
      onValueChange(paths['background-position'], `${bgPosition.x} ${value}${unit}`)
    }
  }

  const onTabChangeHandler = (lbl, type) => {
    if (type === 'parent') setController({ parent: lbl, child: 'Upload', color: 'Custom' })
    else if (type === 'child') setController(old => ({ ...old, child: lbl }))
    else if (type === 'color') setController(old => ({ ...old, color: lbl }))
  }

  const setWpMedia = () => {
    if (typeof wp !== 'undefined' && wp.media) {
      const wpMediaMdl = wp.media({
        title: 'Media',
        button: { text: 'Select picture' },
        library: { type: 'image' },
        multiple: false,
      })

      wpMediaMdl.on('select', () => {
        const attachment = wpMediaMdl.state().get('selection').first().toJSON()
        // fieldData[iconType] = attachment.url
        // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
        // setModal(false)
        onValueChange(paths['background-image'], `url(${attachment.url})`)
        setBgImage(`url(${attachment.url})`)
      })

      wpMediaMdl.open()
    }
  }

  return (
    <div className={css(bgImgControlStyle.container)}>
      <StyleSegmentControl options={[{ label: 'Solid' }, { label: 'Gradient' }, { label: 'Image' }]} onChange={lbl => onTabChangeHandler(lbl, 'parent')} defaultActive={controller.parent} wideTab />
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={200}
        autoHeightMax={365}
      >
        <div className={css(ut.mt1)}>
          <Grow open={controller.parent === 'Solid'}>
            {canSetVariable ? (
              <>
                <div className={css(c.mb)}>
                  <StyleSegmentControl
                    square
                    noShadow
                    defaultActive="Custom"
                    options={options}
                    size={60}
                    component="button"
                    onChange={lbl => onTabChangeHandler(lbl, 'color')}
                    show={['icn']}
                    variant="lightgray"
                    width="100%"
                    wideTab
                  />
                </div>

                <Grow open={controller.color === 'Var'}>
                  <div className={css(c.varClr)}>
                    <button
                      className={`${css(c.clrItem)} ${css(color === '--global-bg-color' ? c.active : null)}`}
                      type="button"
                      onClick={() => setColorState('--global-bg-color')}
                      data-testid={`${id}-g-bg-c`}
                    >
                      <ColorPreview bg={themeBgColor} className={css(ut.mr2)} />
                      <span>Background Color</span>
                    </button>

                    <button
                      className={css(c.clrItem, color === '--global-accent-color' ? c.active : null)}
                      type="button"
                      onClick={() => setColorState('--global-accent-color')}
                      data-testid={`${id}-g-a-c`}
                    >
                      <ColorPreview bg={themePrimaryColor} className={css(ut.mr2)} />
                      <span>Background Accent Color</span>
                    </button>

                    <button
                      className={css(c.clrItem, color === '--global-font-color' ? c.active : null)}
                      type="button"
                      onClick={() => setColorState('--global-font-color')}
                      data-testid={`${id}-g-f-c`}
                    >
                      <ColorPreview bg={themeFontColor} className={css(ut.mr2)} />
                      <span>Font Color</span>
                    </button>

                    <button
                      className={css(c.clrItem, color === '--global-fld-bdr' ? c.active : null)}
                      type="button"
                      onClick={() => setColorState('--global-fld-bdr')}
                      data-testid={`${id}-g-f-b`}
                    >
                      <ColorPreview bg={themeFldBdrClr} className={css(ut.mr2)} />
                      <span>Field Border Color</span>
                    </button>

                    <button
                      className={css(c.clrItem, color === '--global-fld-bg-color' ? c.active : null)}
                      type="button"
                      onClick={() => setColorState('--global-fld-bg-color')}
                      data-testid={`${id}-g-f-bg-c`}
                    >
                      <ColorPreview bg={themeFldBgColor} className={css(ut.mr2)} />
                      <span>Field Background Color</span>
                    </button>
                  </div>
                </Grow>

                <Grow open={controller.color === 'Custom'}>
                  <div className={css(c.container, style.container, style.preview_wrp)}>
                    <div className={css(c.subContainer)}>
                      <SingleToggle
                        title={__('Transparant')}
                        action={transparantColor}
                        isChecked={checkTransparant()}
                        id="color-transparant"
                      />
                    </div>
                    <ColorPicker
                      showParams
                      showPreview
                      onChange={setColorState}
                      value={color}
                    />
                  </div>
                </Grow>
              </>
            ) : (
              <div className={css(c.container)}>
                <div className={css(c.subContainer)}>
                  <SingleToggle
                    title={__('Transparant')}
                    action={transparantColor}
                    isChecked={checkTransparant()}
                    id="color-transparant"
                  />
                </div>
                <ColorPicker
                  showParams
                  showPreview
                  onChange={setColorState}
                  value={color}
                />
              </div>
            )}
            {/* <div className={css(ut.w10, style.container, style.preview_wrp)}>
            <ColorPicker
              showParams
              showPreview
              onChange={setSolidColor}
              value={color}
            />
          </div> */}
          </Grow>

          <Grow open={controller.parent === 'Gradient'}>
            <SimpleGradientColorPicker gradient={styleToGradientObj(bgImage)} changeHandler={gradientChangeHandler} />
          </Grow>

          <Grow open={controller.parent === 'Image'}>
            <>
              <StyleSegmentControl options={[{ label: 'Upload' }, { label: 'Link' }]} onChange={lbl => onTabChangeHandler(lbl, 'child')} defaultActive={controller.child} wideTab />
              <div className={css(ut.mt2, { p: '0px 2px' })}>

                {controller.child === 'Upload' && (
                  <ImageUploadInput title="Image" imageSrc={bgImage?.match(/(^url\(.+\)$)/) ? bgImage?.replace(/(url\(|\))/gi, '') : ''} value={bgImage?.slice(bgImage.lastIndexOf('/') + 1, -1)} clickAction={setWpMedia} clearAction={clearBgImage} />
                )}

                {controller.child === 'Link' && (
                  <div className={css(ut.mt2)}>
                    <div className={css(ut.flxClm)}>
                      <div className={css({ flx: 'between' })}>
                        <span className={css(bgImgControlStyle.title)}>URL</span>
                        <span className={css(bgImgControlStyle.title, bgImgControlStyle.browse)} role="button" tabIndex={0} onClick={() => setUnsplashMdl(true)} onKeyUp={() => setUnsplashMdl(true)}>Browse</span>
                      </div>
                      <input type="url" className={css(bgImgControlStyle.urlinput, { pr: '30px !important' })} value={bgImage?.match(/(^url\(.+\)$)/) ? bgImage?.replace(/(url\(|\))/gi, '') : ''} onChange={urlChangeHandler} placeholder="ex: https://www.example.com" />
                    </div>
                    {/* <button type="button" className={css(ut.mt2)}>browse</button> */}
                  </div>
                )}
                <div className={css(ut.mt2)}>
                  <div className={css(ut.flxcb)}>
                    <span className={css(bgImgControlStyle.title)}>Size</span>
                    <div className={css(ut.flxc)}>
                      {/* <span className={css(backgroundImageControlStyle.icon)}>
                        <StyleResetIcn size={12} />
                      </span>
                      <span className={css(backgroundImageControlStyle.icon)}>*</span> */}
                      <select value={bgSize.type} name="" id="" onChange={sizeSelectHandler} className={css(sc.select)}>
                        <option value="auto">auto</option>
                        <option value="size">size</option>
                        <option value="cover">cover</option>
                        <option value="contain">contain</option>
                        <option value="initial">initial</option>
                      </select>
                    </div>
                  </div>
                  <Grow open={bgSize.type === 'size'}>
                    <SizeAspectRatioControl
                      className={css(ut.ml6, ut.mb2)}
                      options={[{ label: 'W', value: bgSize.w }, { label: 'H', value: bgSize.h }]}
                      unitOptions={['px', '%']}
                      valuChangeHandler={fldBgSizeHandler}
                    />
                  </Grow>
                </div>

                <div className={css(ut.mt2)}>
                  <div className={css(ut.flxcb)}>
                    <span className={css(bgImgControlStyle.title)}>Position</span>
                    <div className={css(ut.flxc)}>
                      {/* <span className={css(backgroundImageControlStyle.icon)}>
                        <StyleResetIcn size={12} />
                      </span> */}
                      {/* <span className={css(backgroundImageControlStyle.icon, bgPosition.includes('!important') ? backgroundImageControlStyle.activeicon : '')}>*</span> */}
                      <select value={bgPosition.type} name="" id="" onChange={positionSelectHandler} className={css(sc.select)}>
                        <option value="positions">Positions</option>
                        <option value="size">Size</option>
                        <option value="inherit">Inherit</option>
                        <option value="initial">Initial</option>
                      </select>
                    </div>
                  </div>

                  <Grow open={bgPosition.type === 'size'}>
                    <SizeAspectRatioControl
                      className={css(ut.ml6, ut.mb2)}
                      options={[{ label: 'X', value: bgPosition.x }, { label: 'Y', value: bgPosition.y }]}
                      unitOptions={['px', '%']}
                      valuChangeHandler={fldBgPositionHandler}
                    />
                  </Grow>
                  <Grow open={bgPosition.type === 'positions'}>

                    <div className={css(ut.flxcb, ut.ml6, ut.mt2, bgImgControlStyle.positioncontainer)}>
                      <div className={css(bgImgControlStyle.positionitem)}>
                        <Tip msg="Top Left">
                          <span className={css(bgImgControlStyle.positiondot, bgPosition.value === 'top left' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('top left')} onClick={() => positionChangeHandler('top left')} tabIndex={0}>&nbsp;</span>
                        </Tip>
                      </div>
                      <div className={css(bgImgControlStyle.positionitem, ut.txCenter)}>
                        <Tip msg="Top Center">
                          <span className={css(bgImgControlStyle.positiondot, bgPosition.value === 'top center' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('top center')} onClick={() => positionChangeHandler('top center')} tabIndex={0}>&nbsp;</span>
                        </Tip>
                      </div>
                      <div className={css(bgImgControlStyle.positionitem, ut.txRight)}>
                        <Tip msg="Top Right">
                          <span className={css(bgImgControlStyle.positiondot, bgPosition.value === 'top right' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('top right')} onClick={() => positionChangeHandler('top right')} tabIndex={0}>&nbsp;</span>
                        </Tip>
                      </div>
                      <div className={css(bgImgControlStyle.positionitem)}>
                        <Tip msg="Center Left">
                          <span className={css(bgImgControlStyle.positiondot, bgPosition.value === 'center left' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('center left')} onClick={() => positionChangeHandler('center left')} tabIndex={0}>&nbsp;</span>
                        </Tip>
                      </div>
                      <div className={css(bgImgControlStyle.positionitem, ut.txCenter)}>
                        <Tip msg="Center">
                          <span className={css(bgImgControlStyle.positiondot, bgPosition.value === 'center' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('center')} onClick={() => positionChangeHandler('center')} tabIndex={0}>&nbsp;</span>
                        </Tip>
                      </div>
                      <div className={css(bgImgControlStyle.positionitem, ut.txRight)}>
                        <Tip msg="Center Right">
                          <span className={css(bgImgControlStyle.positiondot, bgPosition.value === 'center right' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('center right')} onClick={() => positionChangeHandler('center right')} tabIndex={0}>&nbsp;</span>
                        </Tip>
                      </div>
                      <div className={css(bgImgControlStyle.positionitem)}>
                        <Tip msg="Bottom Left">
                          <span className={css(bgImgControlStyle.positiondot, bgPosition.value === 'bottom left' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('bottom left')} onClick={() => positionChangeHandler('bottom left')} tabIndex={0}>&nbsp;</span>
                        </Tip>
                      </div>
                      <div className={css(bgImgControlStyle.positionitem, ut.txCenter)}>
                        <Tip msg="Bottom Center">
                          <span className={css(bgImgControlStyle.positiondot, bgPosition.value === 'bottom center' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('bottom center')} onClick={() => positionChangeHandler('bottom center')} tabIndex={0}>&nbsp;</span>
                        </Tip>
                      </div>
                      <div className={css(bgImgControlStyle.positionitem, ut.txRight)}>
                        <Tip msg="Bottom Right">
                          <span className={css(bgImgControlStyle.positiondot, bgPosition.value === 'bottom right' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('bottom right')} onClick={() => positionChangeHandler('bottom right')} tabIndex={0}>&nbsp;</span>
                        </Tip>
                      </div>
                    </div>
                  </Grow>

                </div>
                <div className={css(ut.mt2)}>
                  <div className={css(ut.flxcb)}>
                    <span className={css(bgImgControlStyle.title)}>Repeat</span>
                    <div className={css(ut.flxc)}>
                      {/* <span className={css(backgroundImageControlStyle.icon)}>
                        <StyleResetIcn size={12} />
                      </span> */}
                      {/* <span className={css(backgroundImageControlStyle.icon, bgPosition.includes('!important') ? backgroundImageControlStyle.activeicon : '')}>*</span> */}
                      <select value={bgRepeat} name="" id="" onChange={bgRepeatSelectHandler} className={css(sc.select)}>
                        <option value="repeat">Repeat</option>
                        <option value="repeat-x">Repeat-X</option>
                        <option value="repeat-y">Repeat-Y</option>
                        <option value="no-repeat">No Repeat</option>
                        <option value="space">Space</option>
                        <option value="round">Round</option>
                        <option value="initial">Initial</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </Grow>
        </div>
      </Scrollbars>
      {/* <Modal
        md
        autoHeight
        show={unsplashMdl}
        setModal={setUnsplashMdl}
        className="o-v"
        title={__('Unsplash Images')}
      >
        <div className="pos-rel" />
        <UnsplashImageViewer setModal={setUnsplashMdl} />
      </Modal> */}
    </div>
  )
}

export default memo(BackgroundControlMenu)

const style = {
  preview_wrp: {
    '& div[role="group"]': { p: 4, b: 0 },
    '& input': {
      brs: 8,
      b: '1px solid lightgray',
      p: '3px 8px',
      mnh: '10px !important',
      fs: 12,
      mb: 3,
      bs: 'none',
      ':focus': { focusShadow: 1, b: '1px solid var(--b-50)' },
    },
    '& .styles-module_container__2LiHz': { w: '100%' },
    '& .common-module_transBackground__2AOKu': {
      brs: 8,
      ow: 'hidden',
    },
  },
  container: { '& > .ui-color-picker': { w: '100%' } },
}

const c = {
  preview_wrp: {
    '& div[role="group"]': { p: 4, b: 0 },
    '& input': {
      brs: 8,
      b: '1px solid lightgray',
      p: '3px 8px',
      mnh: '10px !important',
      fs: 12,
      mb: 3,
      bs: 'none',
      ':focus': { focusShadow: 1, b: '1px solid var(--b-50)' },
    },
    '& .common-module_transBackground__2AOKu': {
      brs: 8,
      ow: 'hidden',
    },
  },
  container: {
    dy: 'flex',
    fd: 'column',
  },
  subContainer: {
    m: 5,
    '& span': { fs: 12 },
    '& input': { m: 0 },
  },
  color: {
    w: 30,
    h: 30,
    brs: 8,
    mr: 10,
  },
  bggrid: { bi: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==)' },
  varClr: { my: 5, w: '100%' },
  active: { bcr: 'var(--b-50) !important', bd: '#f3f8ff' },
  clrItem: {
    dy: 'block',
    flx: 'align-center',
    bd: 'transparent',
    b: '2px solid var(--white-0-93)',
    p: 3,
    mb: 8,
    brs: 10,
    fs: 12,
    cur: 'pointer',
    w: '100%',
    tn: 'background .3s',
    ':hover': { bd: 'var(--white-0-97)' },
  },
  m: { mr: 15 },
  mb: { mb: 5 },
}
