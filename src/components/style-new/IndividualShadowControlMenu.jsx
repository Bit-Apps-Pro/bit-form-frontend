/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { memo, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles, $themeVars } from '../../GlobalStates'
import AddIcon from '../../Icons/AddIcon'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import boxSizeControlStyle from '../../styles/boxSizeControl.style'
import sc from '../../styles/commonStyleEditorStyle'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import { __ } from '../../Utils/i18nwrap'
import SimpleAccordion from '../CompSettings/StyleCustomize/ChildComp/SimpleAccordion'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import SimpleColorPickerTooltip from './SimpleColorPickerTooltip'
import { getNumFromStr, getStrFromStr, getValueByObjPath, splitValueBySpaces, unitConverter } from './styleHelpers'

function IndividualShadowControlMenu({ propertyPath }) {
  const { css } = useFela()
  const themeVars = useRecoilValue($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  const isShadow = typeof color === 'string'
  const [controller, setController] = useState(isShadow ? 'Default' : 'Hover')
  const options = [
    { label: 'Default', icn: 'Default', show: ['icn'], tip: 'Default shadow' },
    { label: 'Hover', icn: 'Hover', show: ['icn'], tip: 'Hover shadow' },
  ]

  const getShadowStyleVal = () => {
    let shadowValue = getValueByObjPath(styles, propertyPath)
    if (shadowValue.match(/var/gi)?.[0] === 'var') {
      const themeVarShadow = shadowValue.replaceAll(/\(|var|,.*|\)/gi, '')
      shadowValue = themeVars[themeVarShadow]
    }
    return shadowValue
  }
  const splitShadow = (shadowString) => shadowString?.split(/,(?![^(]*\))/gi)
  const getShadowStyleArr = splitShadow(getShadowStyleVal())

  const extractShadowValue = () => {
    const shadowArr = []
    for (let i = 0; i < getShadowStyleArr.length; i += 1) {
      const [xOffset, yOffset, blur, spread, color, inset] = splitValueBySpaces(getShadowStyleArr[i] || '3px -35px 54px -10px hsla(0, 44%, 35%, 66%) inset')
      shadowArr[i] = { xOffset, yOffset, blur, spread, color, inset }
    }
    return shadowArr
  }
  const shadowValues = extractShadowValue()

  const newShadowVal = (name, val, unit) => {
    if (name === 'color') {
      return val || 'hsla(0, 0%, 0%, 100)'
    }
    if (name === 'inset') {
      return val || ''
    }
    return `${val || '0'}${unit === undefined ? 'px' : unit}`
  }
  const generateShadowValue = (name, { value, unit }, indx) => {
    const newShadowStyle = Object.entries(shadowValues[indx]).map(([shName, shVal]) => {
      if (shName === name) {
        return newShadowVal(name, value, unit)
      }
      return newShadowVal(shName, shVal, '')
    }).join(' ')
    getShadowStyleArr[indx] = newShadowStyle
    setStyles(prvStyles => produce(prvStyles, drftStyles => {
      assignNestedObj(drftStyles, propertyPath, getShadowStyleArr.toString())
    }))
  }

  const unitHandler = (name, unit, value, oldVal, indx) => {
    if (value) {
      const preUnit = getStrFromStr(oldVal)
      const convertedVal = unitConverter(unit, value, preUnit)
      generateShadowValue(name, { value: convertedVal, unit }, indx)
    }
  }
  const addShadowHandler = () => {
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      const getOldShadow = getShadowStyleVal()
      assignNestedObj(drftStyles, propertyPath, `${getOldShadow},`)
    }))
  }
  const deleteShadow = (indx) => {
    setStyles(prvStyle => produce(prvStyle, drftStyles => {
      const getOldShadow = getShadowStyleVal()
      const shadowArr = splitShadow(getOldShadow)
      if (shadowArr.length === 1) return
      shadowArr.splice(indx, 1)
      assignNestedObj(drftStyles, propertyPath, shadowArr.toString())
    }))
  }
  return (
    <div>
      <div className={css(boxSizeControlStyle.titlecontainer, c.mb)}>
        <StyleSegmentControl
          square
          noShadow
          defaultActive="Default"
          options={options}
          size={80}
          component="button"
          onChange={lbl => setController(lbl)}
          show={['icn']}
          variant="lightgray"
          activeValue={controller}
          width="100%"
          wideTab
        />
      </div>
      {controller === 'Default'
        && getShadowStyleArr.map((item, indx) => (
          <SimpleAccordion
            className={css(c.constainer)}
            title={__(`Shadow-${indx + 1}`, 'bitform')}
            open={indx === 0}
            actionComponent={<button type="button" className={css(c.delBtn)} tabIndex="0" onClick={() => deleteShadow(indx)}><TrashIcn size="15" /></button>}
            key={`shadow-${indx * 2 * 4}`}
          >
            <div>
              <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                <span className={css(ut.fs12, ut.fw500)}>X</span>
                <SizeControl
                  width="105px"
                  value={Number(getNumFromStr(shadowValues[indx].xOffset) || 0)}
                  unit={getStrFromStr(shadowValues[indx].xOffset) || 'px'}
                  inputHandler={valObj => generateShadowValue('xOffset', valObj, indx)}
                  sizeHandler={({ unitKey, unitValue }) => unitHandler('xOffset', unitKey, unitValue, shadowValues[indx].xOffset, indx)}
                  options={['px', 'em', 'rem']}
                  min="-10"
                  max="20"
                />
              </div>
              <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                <span className={css(ut.fs12, ut.fw500)}>Y</span>
                <SizeControl
                  width="105px"
                  value={Number(getNumFromStr(shadowValues[indx].yOffset) || 0)}
                  unit={getStrFromStr(shadowValues[indx].yOffset) || 'px'}
                  inputHandler={valObj => generateShadowValue('yOffset', valObj, indx)}
                  sizeHandler={({ unitKey, unitValue }) => unitHandler('yOffset', unitKey, unitValue, shadowValues[indx].yOffset, indx)}
                  options={['px', 'em', 'rem']}
                  min="-10"
                  max="20"
                />
              </div>
              <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                <span className={css(ut.fs12, ut.fw500)}>Blur</span>
                <SizeControl
                  width="105px"
                  value={Number(getNumFromStr(shadowValues[indx].blur) || 0)}
                  unit={getStrFromStr(shadowValues[indx].blur) || 'px'}
                  inputHandler={valObj => generateShadowValue('blur', valObj, indx)}
                  sizeHandler={({ unitKey, unitValue }) => unitHandler('blur', unitKey, unitValue, shadowValues[indx].blur, indx)}
                  options={['px', 'em', 'rem']}
                  min="-10"
                  max="20"
                />
              </div>
              <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
                <span className={css(ut.fs12, ut.fw500)}>Spread</span>
                <SizeControl
                  width="105px"
                  value={Number(getNumFromStr(shadowValues[indx].spread) || 0)}
                  unit={getStrFromStr(shadowValues[indx].spread) || 'px'}
                  inputHandler={valObj => generateShadowValue('spread', valObj, indx)}
                  sizeHandler={({ unitKey, unitValue }) => unitHandler('spread', unitKey, unitValue, shadowValues[indx].spread, indx)}
                  options={['px', 'em', 'rem']}
                  min="-10"
                  max="20"
                />
              </div>
              <div className={css(ut.flxcb, ut.mb2)}>
                <span className={css(ut.fs12, ut.fw500)}>Color</span>
                <SimpleColorPickerTooltip action={{ onChange: val => generateShadowValue('color', { value: val }, indx) }} value={shadowValues[indx].color} />
              </div>
              <div className={css(ut.flxcb, ut.mb2)}>
                <span className={css(ut.fs12, ut.fw500)}>Inset</span>
                <select className={css(sc.select)} value={shadowValues[indx].inset || ''} onChange={e => generateShadowValue('inset', { value: e.target.value }, indx)}>
                  <option value="">outset</option>
                  <option value="inset">inset</option>
                </select>
              </div>
            </div>
          </SimpleAccordion>
        ))}
      {controller === 'Hover' && (
        <SimpleAccordion
          className={css(c.constainer)}
          title={__('Shadow-1', 'bitform')}
          open
          actionComponent={<button type="button" className={css(c.delBtn)} tabIndex="0" onClick={deleteShadow}><TrashIcn size="15" /></button>}
        >
          {/* <div>
            <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
              <span className={css(ut.fs12, ut.fw500)}>X</span>
              <SizeControl
                width="105px"
                value="0"
                unit="px"
                inputHandler={valObj => generateShadowValue('xOffset', valObj)}
                sizeHandler={({ unitKey, unitValue }) => unitHandler('xOffset', unitKey, unitValue, 1)}
                options={['px', 'em', 'rem']}
                min="-10"
                max="20"
              />
            </div>
            <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
              <span className={css(ut.fs12, ut.fw500)}>Y</span>
              <SizeControl
                width="105px"
                value="0"
                unit="px"
                inputHandler={valObj => generateShadowValue('xOffset', valObj)}
                sizeHandler={({ unitKey, unitValue }) => unitHandler('xOffset', unitKey, unitValue, 1)}
                options={['px', 'em', 'rem']}
                min="-10"
                max="20"
              />
            </div>
            <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
              <span className={css(ut.fs12, ut.fw500)}>Blur</span>
              <SizeControl
                width="105px"
                value="0"
                unit="px"
                inputHandler={valObj => generateShadowValue('xOffset', valObj)}
                sizeHandler={({ unitKey, unitValue }) => unitHandler('xOffset', unitKey, unitValue, 1)}
                options={['px', 'em', 'rem']}
                min="-10"
                max="20"
              />
            </div>
            <div className={css(ut.flxcb, ut.mb2, ut.mt2)}>
              <span className={css(ut.fs12, ut.fw500)}>Spread</span>
              <SizeControl
                width="105px"
                value="0"
                unit="px"
                inputHandler={valObj => generateShadowValue('xOffset', valObj)}
                sizeHandler={({ unitKey, unitValue }) => unitHandler('xOffset', unitKey, unitValue, 1)}
                options={['px', 'em', 'rem']}
                min="-10"
                max="20"
              />
            </div>
            <div className={css(ut.flxcb, ut.mb2)}>
              <span className={css(ut.fs12, ut.fw500)}>Inset</span>
              <select className={css(sc.select)} onChange={e => generateShadowValue('inset', { value: e.target.value })}>
                <option value="">outset</option>
                <option value="inset">inset</option>
              </select>
            </div>
          </div> */}
        </SimpleAccordion>
      )}
      <div className={css(c.footer)}>
        <button className={css(c.addBtn)} onClick={addShadowHandler} type="button" tabIndex="0" title="Add Shadow">
          <AddIcon size="20" />
        </button>
      </div>
    </div>
  )
}

export default memo(IndividualShadowControlMenu)

const c = {
  mb: { md: 5 },
  constainer: {
    w: 200,
    mx: 10,
    my: 5,
    p: 5,
    fw: 500,
    brs: 8,
  },
  delBtn: {
    bd: 'transparent',
    oe: 'none',
    b: 'none',
    '&:hover': {
      bd: 'var(--white-0-86)',
      brs: '50%',
    },
  },
  footer: { flx: 'center' },
  addBtn: {
    bd: 'transparent',
    oe: 'none',
    b: 'none',
    '&:hover': {
      bd: 'var(--white-0-86)',
      cr: 'var(--b-50)',
    },
  },
}
