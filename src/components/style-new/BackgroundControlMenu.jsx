/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import ColorPicker from '@atomik-color/component'
import { str2Color } from '@atomik-color/core'
import produce from 'immer'
import { memo, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHistory, $unsplashImgUrl, $unsplashMdl, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import BrowserIcon from '../../Icons/BrowserIcon'
import ut from '../../styles/2.utilities'
import bgImgControlStyle from '../../styles/backgroundControl.style'
import sc from '../../styles/commonStyleEditorStyle'
import { addToBuilderHistory, assignNestedObj } from '../../Utils/FormBuilderHelper'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import ImageUploadInput from '../CompSettings/StyleCustomize/ChildComp/ImageUploadInput'
import SizeAspectRatioControl from '../CompSettings/StyleCustomize/ChildComp/SizeAspectRatioControl'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import Tip from '../Utilities/Tip'
import { hsla2hsva, hsva2hsla } from './colorHelpers'
import FilterControlMenu from './FilterControlMenu'
import SimpleGradientColorPicker from './SimpleGradientColorPicker'
import { getObjByKey, getValueByObjPath, styleToGradientObj } from './styleHelpers'

function BackgroundControlMenu({ stateObjName,
  propertyPath,
  objectPaths,
  id,
  fldKey }) {
  const [controller, setController] = useState({ parent: 'Solid', child: 'Solid' })
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
  const unsplashImgUrl = useRecoilValue($unsplashImgUrl)

  const stateObj = getObjByKey(object, { styles })

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
            assignNestedObj(drftStyles, paths['background-color'], clr)
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
  }

  useEffect(() => {
    setBgImage(getValueByObjPath(stateObj, paths['background-image']))
    setColor(str2Color(getValueByObjPath(stateObj, paths['background-color'])))
  }, [id])

  useEffect(() => {
    onValueChange(paths['background-image'], `url(${unsplashImgUrl})`)
    setBgImage(`url(${unsplashImgUrl})`)
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
    if (type === 'parent') setController({ parent: lbl, child: 'Upload' })
    else if (type === 'child') setController(old => ({ ...old, child: lbl }))
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
      <div className={css(bgImgControlStyle.innercontainer, ut.mt1)}>
        {controller.parent === 'Solid' && (
          <div className={css(ut.w10, style.container, style.preview_wrp)}>
            <ColorPicker
              showParams
              showPreview
              onChange={setSolidColor}
              value={color}
            />
          </div>

        )}

        {controller.parent === 'Gradient' && (
          <SimpleGradientColorPicker gradient={styleToGradientObj(bgImage)} changeHandler={gradientChangeHandler} />
        )}

        {controller.parent === 'Image' && (
          <>
            <StyleSegmentControl options={[{ label: 'Upload' }, { label: 'Link' }]} onChange={lbl => onTabChangeHandler(lbl, 'child')} defaultActive={controller.child} wideTab />
            <div className={css(ut.mt2)}>

              {controller.child === 'Upload' && (
                <ImageUploadInput title="Image" imageSrc={bgImage?.match(/(^url\(.+\)$)/) ? bgImage?.replace(/(url\(|\))/gi, '') : ''} value={bgImage?.slice(bgImage.lastIndexOf('/') + 1, -1)} clickAction={setWpMedia} clearAction={clearBgImage} />
              )}

              {controller.child === 'Link' && (
                <div className={css(ut.mt2)}>
                  <div className={css(ut.flxClm)}>
                    <span className={css(bgImgControlStyle.title)}>URL</span>
                    <div className={css(bgImgControlStyle.linkWrap)}>
                      <input type="url" className={css(bgImgControlStyle.urlinput, { pr: '30px !important' })} value={bgImage?.replace(/(url\(|\))/gi, '')} onChange={urlChangeHandler} placeholder="ex: https://www.example.com" />
                      <button type="button" title="search" className={css(bgImgControlStyle.browse)} onClick={() => setUnsplashMdl(true)}>
                        <BrowserIcon size="20" />
                      </button>
                    </div>
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

              <div className={css(ut.mt2)}>
                <FilterControlMenu
                  title="Backdrop Filters"
                  objectPaths={{
                    object: 'styles',
                    paths: { filter: paths['backdrop-filter'] },
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
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
    '& .common-module_transBackground__2AOKu': {
      brs: 8,
      ow: 'hidden',
    },
  },
  container: { '& > .ui-color-picker': { w: '100%' } },
}
