import { useState } from 'react'
import { useFela } from 'react-fela'
import StyleResetIcn from '../../../../Icons/StyleResetIcn'
import TrashIcn from '../../../../Icons/TrashIcn'
import ut from '../../../../styles/2.utilities'
import backgroundImageControlStyle from '../../../../styles/backgroundImageControl.style'
import SimpleGradientColorPicker from '../../../style-new/SimpleGradientColorPicker'
import Downmenu from '../../../Utilities/Downmenu'
import StyleSegmentControl from '../../../Utilities/StyleSegmentControl'
import Tip from '../../../Utilities/Tip'
import CustomInputControl from './CustomInputControl'
import ImageUploadInput from './ImageUploadInput'
import SizeAspectRatioControl from './SizeAspectRatioControl'

export default function BackgroundImageControl({ }) {
  const [controller, setController] = useState({ parent: 'Image', child: '' })
  const { css } = useFela()
  const backgroundsize = 'auto'
  const [bgPos, setBgPos] = useState('initial !important')
  const [bgfilters, setBgFilters] = useState('blur(20%) brightness(120%)')

  const onTabChangeHandler = (lbl, type) => {
    if (type === 'parent') setController({ parent: lbl })
    else if (type === 'child') setController(old => ({ ...old, child: lbl }))
  }

  const generateBgFiltersArr = () => (bgfilters.length ? bgfilters.split(' ').map(fltr => ({ name: fltr.match(/.+?(?=\()/)[0], value: fltr.match(/\d*\.?\d/)[0], unit: fltr.match(/%|px|deg/)?.[0] || '' })) : [])

  const generateBgFiltersStr = filters => filters.map(fltr => `${fltr.name}(${fltr.value}${fltr.unit})`).join(' ')

  const addNewFilter = (name, value, unit) => {
    const filters = generateBgFiltersArr()
    if (!filters.find(fltr => fltr.name === name)) {
      filters.push({ name, value, unit })
      setBgFilters(generateBgFiltersStr(filters))
    }
  }

  const removeFilter = name => {
    const filters = generateBgFiltersArr()
    filters.splice(filters.findIndex(fltr => fltr.name === name), 1)
    setBgFilters(generateBgFiltersStr(filters))
  }

  const setFilterValue = (name, value) => {
    const filters = generateBgFiltersArr()
    const filterIndex = filters.findIndex(fltr => fltr.name === name)
    filters[filterIndex].value = value
    setBgFilters(generateBgFiltersStr(filters))
  }

  return (
    <div className={css(backgroundImageControlStyle.container)}>
      <StyleSegmentControl options={[{ label: 'Image' }, { label: 'Gradient' }]} onChange={lbl => onTabChangeHandler(lbl, 'parent')} wideTab />
      <div className={css(backgroundImageControlStyle.innercontainer, ut.mt1)}>
        {controller.parent === 'Image' && (
          <>
            <StyleSegmentControl options={[{ label: 'Upload' }, { label: 'Link' }]} onChange={lbl => onTabChangeHandler(lbl, 'child')} wideTab />
            <div className={css(ut.mt2)}>

              {controller.child === 'Upload' && (
                <ImageUploadInput title="Image" value="test.png" />
              )}

              {controller.child === 'Link' && (
                <div className={css(ut.mt2)}>
                  <div className={css(ut.flxcb)}>
                    <span className={css(backgroundImageControlStyle.title)}>URL</span>
                    <input className={css(backgroundImageControlStyle.urlinput)} type="url" placeholder="https://www.example.com" />
                  </div>
                  {/* <button type="button" className={css(ut.mt2)}>browse</button> */}
                </div>
              )}
              <div className={css(ut.mt3)}>
                <div className={css(ut.flxcb)}>
                  <span className={css(backgroundImageControlStyle.title)}>Size</span>
                  <div className={css(ut.flxc)}>
                    <span className={css(backgroundImageControlStyle.icon)}>
                      <StyleResetIcn size={12} />
                    </span>
                    <span className={css(backgroundImageControlStyle.icon)}>*</span>
                    <select name="" id="" className={css(backgroundImageControlStyle.select)}>
                      <option value="auto">auto</option>
                      <option value="size">size</option>
                      <option value="cover">cover</option>
                      <option value="contain">contain</option>
                      <option value="initial">initial</option>
                    </select>
                  </div>
                </div>

                <SizeAspectRatioControl className={css(ut.ml6, ut.mb2)} options={[{ label: 'W' }, { label: 'H' }]} />

              </div>

              <div className={css(ut.mt3)}>
                <div className={css(ut.flxcb)}>
                  <span className={css(backgroundImageControlStyle.title)}>Position</span>
                  <div className={css(ut.flxc)}>
                    <span className={css(backgroundImageControlStyle.icon)}>
                      <StyleResetIcn size={12} />
                    </span>
                    <span className={css(backgroundImageControlStyle.icon, bgPos.includes('!important') ? backgroundImageControlStyle.activeicon : '')}>*</span>
                    <select name="" id="" className={css(backgroundImageControlStyle.select)}>
                      <option value="contain">initial</option>
                      <option value="contain">size</option>
                    </select>
                  </div>
                </div>

                <SizeAspectRatioControl className={css(ut.ml6, ut.mt2)} options={[{ label: 'X' }, { label: 'Y' }]} />

                <div className={css(ut.flxcb, ut.ml6, ut.mt3, backgroundImageControlStyle.positioncontainer)}>
                  <div className={css(backgroundImageControlStyle.positionitem)}>
                    <Tip msg="Top Left">
                      <span className={css(backgroundImageControlStyle.positiondot)} />
                    </Tip>
                  </div>
                  <div className={css(backgroundImageControlStyle.positionitem, ut.txCenter)}>
                    <Tip msg="Top Center">
                      <span className={css(backgroundImageControlStyle.positiondot)} />
                    </Tip>
                  </div>
                  <div className={css(backgroundImageControlStyle.positionitem, ut.txRight)}>
                    <Tip msg="Top Right">
                      <span className={css(backgroundImageControlStyle.positiondot)} />
                    </Tip>
                  </div>
                  <div className={css(backgroundImageControlStyle.positionitem)}>
                    <Tip msg="Center Left">
                      <span className={css(backgroundImageControlStyle.positiondot)} />
                    </Tip>
                  </div>
                  <div className={css(backgroundImageControlStyle.positionitem, ut.txCenter)}>
                    <Tip msg="Center">
                      <span className={css(backgroundImageControlStyle.positiondot)} />
                    </Tip>
                  </div>
                  <div className={css(backgroundImageControlStyle.positionitem, ut.txRight)}>
                    <Tip msg="Center Right">
                      <span className={css(backgroundImageControlStyle.positiondot)} />
                    </Tip>
                  </div>
                  <div className={css(backgroundImageControlStyle.positionitem)}>
                    <Tip msg="Bottom Left">
                      <span className={css(backgroundImageControlStyle.positiondot)} />
                    </Tip>
                  </div>
                  <div className={css(backgroundImageControlStyle.positionitem, ut.txCenter)}>
                    <Tip msg="Bottom Center">
                      <span className={css(backgroundImageControlStyle.positiondot)} />
                    </Tip>
                  </div>
                  <div className={css(backgroundImageControlStyle.positionitem, ut.txRight)}>
                    <Tip msg="Bottom Right">
                      <span className={css(backgroundImageControlStyle.positiondot)} />
                    </Tip>
                  </div>
                </div>

              </div>

              <div className={css(ut.mt3)}>
                <div className={css(ut.flxcb)}>
                  <span className={css(backgroundImageControlStyle.title)}>Filters</span>
                  <Downmenu place="bottom-end">
                    <button type="button" className={css(backgroundImageControlStyle.addbtn)}>+ Add</button>
                    <div className={css(backgroundImageControlStyle.filterlist)}>
                      <button onClick={() => addNewFilter('blur', 5, 'px')} type="button" className={css(backgroundImageControlStyle.filterbutton)}>Blur</button>
                      <button onClick={() => addNewFilter('brightness', 120, '%')} type="button" className={css(backgroundImageControlStyle.filterbutton)}>Brightness</button>
                      <button onClick={() => addNewFilter('contrast', 10, '%')} type="button" className={css(backgroundImageControlStyle.filterbutton)}>Contrast</button>
                      <button onClick={() => addNewFilter('grayscale', 50, '%')} type="button" className={css(backgroundImageControlStyle.filterbutton)}>Grayscale</button>
                      <button onClick={() => addNewFilter('hue-rotate', 45, 'deg')} type="button" className={css(backgroundImageControlStyle.filterbutton)}>Hue Rotate</button>
                      <button onClick={() => addNewFilter('invert', 10, '%')} type="button" className={css(backgroundImageControlStyle.filterbutton)}>Invert</button>
                      <button onClick={() => addNewFilter('opacity', 10, '%')} type="button" className={css(backgroundImageControlStyle.filterbutton)}>Opacity</button>
                      <button onClick={() => addNewFilter('saturate', 110, '%')} type="button" className={css(backgroundImageControlStyle.filterbutton)}>Saturate</button>
                      <button onClick={() => addNewFilter('sepia', 10, '%')} type="button" className={css(backgroundImageControlStyle.filterbutton)}>Sepia</button>
                    </div>
                  </Downmenu>
                </div>

                {generateBgFiltersArr().map(fltr => (
                  <div className={css(ut.flxc, ut.mt1)}>
                    <CustomInputControl label={fltr.name} value={fltr.value} min={0} width="50%" onChange={val => setFilterValue(fltr.name, val)} />
                    {/* <SizeControl className={css(ut.mt1)} label={fltr.name} width="50%" /> */}
                    <button onClick={() => removeFilter(fltr.name)} type="button" className={css(ut.ml1, backgroundImageControlStyle.removebtn)}>
                      <TrashIcn size={14} />
                    </button>
                  </div>
                ))}

              </div>
            </div>
          </>
        )}

        {controller.parent === 'Gradient' && (
          <SimpleGradientColorPicker />
        )}

      </div>
    </div>
  )
}
