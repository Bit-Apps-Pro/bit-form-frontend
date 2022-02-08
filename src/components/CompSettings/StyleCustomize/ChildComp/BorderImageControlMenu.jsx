/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $styles } from '../../../../GlobalStates/StylesState'
import { $themeVars } from '../../../../GlobalStates/ThemeVarsState'
import ut from '../../../../styles/2.utilities'
import bgImgControlStyle from '../../../../styles/backgroundImageControl.style'
import SimpleGradientColorPicker from '../../../style-new/SimpleGradientColorPicker'
import { getObjByKey, getValueByObjPath, setStyleStateObj } from '../../../style-new/styleHelpers'
import StyleSegmentControl from '../../../Utilities/StyleSegmentControl'
import ImageUploadInput from './ImageUploadInput'
import SpaceControl from './SpaceControl'

export default function BorderImageControlMenu({ stateObjName,
  objectPaths,
  id,
  fldKey }) {
  const [controller, setController] = useState({ parent: 'Image', child: 'Upload' })
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const { css } = useFela()
  const { object, bgObjName, paths } = objectPaths
  const [bgfilters, setBgFilters] = useState('blur(20%) brightness(120%)')
  const [borderImage, setBorderImage] = useState('')
  const [repeat, setRepeat] = useState('initial')
  const [styles, setStyles] = useRecoilState($styles)
  console.log('paths', paths)
  console.log('border-image-path', paths['border-image'])

  const stateObj = getObjByKey(object, { styles })

  const onValueChange = (pathName, val) => {
    setStyleStateObj(object, pathName, val, { setStyles })
  }
  const gradientChangeHandler = (e) => {
    onValueChange(paths['border-image'], e.style)
  }

  const clearBorderImage = (e) => {
    e.stopPropagation()
    setBorderImage('')
  }

  useEffect(() => {
    setBorderImage(getValueByObjPath(stateObj, paths['border-image']))
  }, [])

  useEffect(() => {
    onValueChange(paths['border-image'], borderImage)
  }, [borderImage])

  useEffect(() => {
    onValueChange(paths['border-image-repeat'], repeat)
  }, [repeat])

  const repeatSelectHandler = e => {
    setRepeat(e.target.value)
  }

  const urlChangeHandler = e => {
    onValueChange(paths['border-image'], `url(${e.target.value})`)
    setBorderImage(`url(${e.target.value})`)
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
        onValueChange(paths['border-image'], `url(${attachment.url})`)
        setBorderImage(`url(${attachment.url})`)
      })

      wpMediaMdl.open()
    }
  }
  const onSizeChange = (pathName, val) => {
    setStyleStateObj(object, pathName, val, { setThemeVars, setStyles })
  }

  const getVal = (propertyPath) => {
    if (object === 'themeVars') return themeVars[propertyPath]
    if (object === 'styles') {
      let value = getValueByObjPath(styles, propertyPath)
      const isCssVar = value?.match(/var/gi)?.[0]
      if (isCssVar === 'var') {
        const getVarProperty = value.replaceAll(/\(|var|,.*|\)/gi, '')
        value = themeVars[getVarProperty]
      }
      return value
    }
  }

  const widthValue = getVal(paths['border-image-width'])
  const sliceValue = getVal(paths['border-image-slice'])
  const outsetValue = getVal(paths['border-image-outset'])

  return (
    <div className={css(bgImgControlStyle.container)}>
      <StyleSegmentControl options={[{ label: 'Image' }, { label: 'Gradient' }]} onChange={lbl => onTabChangeHandler(lbl, 'parent')} activeValue={controller.parent} wideTab />
      <div className={css(bgImgControlStyle.innercontainer, ut.mt1)}>
        {controller.parent === 'Image' && (
          <>
            <StyleSegmentControl options={[{ label: 'Upload' }, { label: 'Link' }]} onChange={lbl => onTabChangeHandler(lbl, 'child')} activeValue={controller.child} wideTab />
            <div className={css(ut.mt2)}>

              {controller.child === 'Upload' && (
                <ImageUploadInput title="Image" imageSrc={borderImage?.replace(/(url\(|\))/gi, '')} value={borderImage?.slice(borderImage.lastIndexOf('/') + 1, -1)} clickAction={setWpMedia} clearAction={clearBorderImage} />
              )}

              {controller.child === 'Link' && (
                <div className={css(ut.mt2)}>
                  <div className={css(ut.flxClm)}>
                    <span className={css(bgImgControlStyle.title)}>URL</span>
                    <input type="url" className={css(bgImgControlStyle.urlinput)} value={borderImage.replace(/(url\(|\))/gi, '')} onChange={urlChangeHandler} placeholder="ex: https://www.example.com" />
                  </div>
                  {/* <button type="button" className={css(ut.mt2)}>browse</button> */}
                </div>
              )}
              <div className={css(ut.mt2)}>
                <div className={css(ut.flxcb)}>
                  <span className={css(bgImgControlStyle.title)}>Repeat</span>
                  <div className={css(ut.flxc)}>
                    {/* <span className={css(backgroundImageControlStyle.icon)}>
                      <StyleResetIcn size={12} />
                    </span>
                    <span className={css(backgroundImageControlStyle.icon)}>*</span> */}
                    <select value={repeat} name="" id="" onChange={repeatSelectHandler} className={css(bgImgControlStyle.select)}>
                      <option value="stretch">Stretch</option>
                      <option value="repeat">Repeat</option>
                      <option value="round">Round</option>
                      <option value="space">space</option>
                      <option value="initial">initial</option>
                    </select>
                  </div>
                </div>
              </div>

              <SpaceControl
                value={outsetValue}
                className={css(ut.mb2)}
                onChange={val => onSizeChange(paths['border-image-outset'], val)}
                title="Outset"
                unitOption={['px', '%']}
                min="0"
                max="20"
              />

              <SpaceControl
                value={widthValue}
                className={css(ut.mb2)}
                onChange={val => onSizeChange(paths['border-image-width'], val)}
                title="Width"
                unitOption={['', 'px', '%']}
                min="0"
                max="100"
              />

              <SpaceControl
                value={sliceValue}
                className={css(ut.mb2)}
                onChange={val => onSizeChange(paths['border-image-slice'], val)}
                title="Slice"
                unitOption={['', '%']}
                min="0"
                max="100"
              />
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
