import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $styles } from '../../../../GlobalStates/StylesState'
import ut from '../../../../styles/2.utilities'
import bgImgControlStyle from '../../../../styles/backgroundImageControl.style'
import FilterControlMenu from '../../../style-new/FilterControlMenu'
import SimpleGradientColorPicker from '../../../style-new/SimpleGradientColorPicker'
import { getObjByKey, getValueByObjPath, setStyleStateObj } from '../../../style-new/styleHelpers'
import StyleSegmentControl from '../../../Utilities/StyleSegmentControl'
import Tip from '../../../Utilities/Tip'
import Grow from './Grow'
import ImageUploadInput from './ImageUploadInput'
import SizeAspectRatioControl from './SizeAspectRatioControl'

export default function BackgroundImageControl({ stateObjName,
  propertyPath,
  objectPaths,
  id,
  fldKey }) {
  const [controller, setController] = useState({ parent: 'Image', child: 'Upload' })
  const { css } = useFela()
  const { object, bgObjName, paths } = objectPaths
  const [bgfilters, setBgFilters] = useState('blur(20%) brightness(120%)')
  const [bgImage, setBgImage] = useState('')
  const [bgSize, setBgSize] = useState({
    type: 'auto',
    w: '0px',
    h: '0px',
  })
  const [bgPosition, setBgPosition] = useState({
    type: 'initial',
    x: '0px',
    y: '0px',
  })
  const [bgPositionValue, setBgPositionValue] = useState('center')
  const [bgRepeat, setBgRepeat] = useState('initial')
  const [styles, setStyles] = useRecoilState($styles)

  const stateObj = getObjByKey(object, { styles })

  const onValueChange = (pathName, val) => {
    setStyleStateObj(object, pathName, val, { setStyles })
  }
  const gradientChangeHandler = (e) => {
    onValueChange(paths['background-image'], e.style)
  }

  const clearBgImage = (e) => {
    e.stopPropagation()
    setBgImage('')
  }

  useEffect(() => {
    setBgImage(getValueByObjPath(stateObj, paths['background-image']))
  }, [])

  useEffect(() => {
    onValueChange(paths['background-image'], bgImage)
  }, [bgImage])

  useEffect(() => {
    onValueChange(paths['background-repeat'], bgRepeat)
  }, [bgRepeat])

  useEffect(() => {
    if (bgSize.type === 'size') {
      onValueChange(paths['background-size'], `${bgSize.w} ${bgSize.h}`)
    } else {
      onValueChange(paths['background-size'], bgSize.type)
    }
  }, [bgSize])

  useEffect(() => {
    if (bgPosition.type === 'positions') {
      onValueChange(paths['background-position'], bgPositionValue)
    } else if (bgPosition.type === 'size') {
      onValueChange(paths['background-position'], `${bgPosition.x} ${bgPosition.y}`)
    } else {
      onValueChange(paths['background-position'], bgPosition.type)
    }
  }, [bgPosition, bgPositionValue])

  const sizeSelectHandler = e => {
    setBgSize(prevBgSize => ({ ...prevBgSize, type: e.target.value }))
  }

  const positionSelectHandler = e => {
    setBgPosition(prevBgPos => ({ ...prevBgPos, type: e.target.value }))
  }

  const bgRepeatSelectHandler = e => {
    setBgRepeat(e.target.value)
  }
  const positionChangeHandler = (value) => {
    setBgPositionValue(value)
  }

  const urlChangeHandler = e => {
    onValueChange(paths['background-image'], `url(${e.target.value})`)
    setBgImage(`url(${e.target.value})`)
  }
  const fldBgSizeHandler = (value, unit, inputId) => {
    if (inputId === 0) {
      setBgSize(prevBgSize => ({ ...prevBgSize, w: `${value}${unit}` }))
    } else {
      setBgSize(prevBgSize => ({ ...prevBgSize, h: `${value}${unit}` }))
    }
  }

  const fldBgPositionHandler = (value, unit, inputId) => {
    if (inputId === 0) {
      setBgPosition(prevBgPos => ({ ...prevBgPos, x: `${value}${unit}` }))
    } else {
      setBgPosition(prevBgPos => ({ ...prevBgPos, y: `${value}${unit}` }))
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
      <StyleSegmentControl options={[{ label: 'Image' }, { label: 'Gradient' }]} onChange={lbl => onTabChangeHandler(lbl, 'parent')} activeValue={controller.parent} wideTab />
      <div className={css(bgImgControlStyle.innercontainer, ut.mt1)}>
        {controller.parent === 'Image' && (
          <>
            <StyleSegmentControl options={[{ label: 'Upload' }, { label: 'Link' }]} onChange={lbl => onTabChangeHandler(lbl, 'child')} activeValue={controller.child} wideTab />
            <div className={css(ut.mt2)}>

              {controller.child === 'Upload' && (
                <ImageUploadInput title="Image" imageSrc={bgImage?.replace(/(url\(|\))/gi, '')} value={bgImage?.slice(bgImage.lastIndexOf('/') + 1, -1)} clickAction={setWpMedia} clearAction={clearBgImage} />
              )}

              {controller.child === 'Link' && (
                <div className={css(ut.mt2)}>
                  <div className={css(ut.flxClm)}>
                    <span className={css(bgImgControlStyle.title)}>URL</span>
                    <input type="url" className={css(bgImgControlStyle.urlinput)} value={bgImage?.replace(/(url\(|\))/gi, '')} onChange={urlChangeHandler} placeholder="ex: https://www.example.com" />
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
                    <select value={bgSize.type} name="" id="" onChange={sizeSelectHandler} className={css(bgImgControlStyle.select)}>
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
                    <select value={bgPosition.type} name="" id="" onChange={positionSelectHandler} className={css(bgImgControlStyle.select)}>
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
                        <span className={css(bgImgControlStyle.positiondot, bgPositionValue === 'top left' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('top left')} onClick={() => positionChangeHandler('top left')} tabIndex={0}>&nbsp;</span>
                      </Tip>
                    </div>
                    <div className={css(bgImgControlStyle.positionitem, ut.txCenter)}>
                      <Tip msg="Top Center">
                        <span className={css(bgImgControlStyle.positiondot, bgPositionValue === 'top center' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('top center')} onClick={() => positionChangeHandler('top center')} tabIndex={0}>&nbsp;</span>
                      </Tip>
                    </div>
                    <div className={css(bgImgControlStyle.positionitem, ut.txRight)}>
                      <Tip msg="Top Right">
                        <span className={css(bgImgControlStyle.positiondot, bgPositionValue === 'top right' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('top right')} onClick={() => positionChangeHandler('top right')} tabIndex={0}>&nbsp;</span>
                      </Tip>
                    </div>
                    <div className={css(bgImgControlStyle.positionitem)}>
                      <Tip msg="Center Left">
                        <span className={css(bgImgControlStyle.positiondot, bgPositionValue === 'center left' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('center left')} onClick={() => positionChangeHandler('center left')} tabIndex={0}>&nbsp;</span>
                      </Tip>
                    </div>
                    <div className={css(bgImgControlStyle.positionitem, ut.txCenter)}>
                      <Tip msg="Center">
                        <span className={css(bgImgControlStyle.positiondot, bgPositionValue === 'center' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('center')} onClick={() => positionChangeHandler('center')} tabIndex={0}>&nbsp;</span>
                      </Tip>
                    </div>
                    <div className={css(bgImgControlStyle.positionitem, ut.txRight)}>
                      <Tip msg="Center Right">
                        <span className={css(bgImgControlStyle.positiondot, bgPositionValue === 'center right' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('center right')} onClick={() => positionChangeHandler('center right')} tabIndex={0}>&nbsp;</span>
                      </Tip>
                    </div>
                    <div className={css(bgImgControlStyle.positionitem)}>
                      <Tip msg="Bottom Left">
                        <span className={css(bgImgControlStyle.positiondot, bgPositionValue === 'bottom left' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('bottom left')} onClick={() => positionChangeHandler('bottom left')} tabIndex={0}>&nbsp;</span>
                      </Tip>
                    </div>
                    <div className={css(bgImgControlStyle.positionitem, ut.txCenter)}>
                      <Tip msg="Bottom Center">
                        <span className={css(bgImgControlStyle.positiondot, bgPositionValue === 'bottom center' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('bottom center')} onClick={() => positionChangeHandler('bottom center')} tabIndex={0}>&nbsp;</span>
                      </Tip>
                    </div>
                    <div className={css(bgImgControlStyle.positionitem, ut.txRight)}>
                      <Tip msg="Bottom Right">
                        <span className={css(bgImgControlStyle.positiondot, bgPositionValue === 'bottom right' && bgImgControlStyle.positionDotActive)} role="button" onKeyPress={() => positionChangeHandler('bottom right')} onClick={() => positionChangeHandler('bottom right')} tabIndex={0}>&nbsp;</span>
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
                    <select value={bgRepeat} name="" id="" onChange={bgRepeatSelectHandler} className={css(bgImgControlStyle.select)}>
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

        {controller.parent === 'Gradient' && (
          <SimpleGradientColorPicker changeHandler={gradientChangeHandler} />
        )}

      </div>
    </div>
  )
}
