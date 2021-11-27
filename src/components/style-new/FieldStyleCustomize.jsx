/* eslint-disable no-loop-func */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $colorScheme, $selectedFieldId, $styles, $tempStyles, $themeColors, $themeVars } from '../../GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import ut from '../../styles/2.utilities'
import { deepCopy } from '../../Utils/Helpers'
import ResetStyle from './ResetStyle'
import SimpleColorPicker from './SimpleColorPicker'
import { CommonStyle } from './styleHelpers'
import ThemeControl from './ThemeControl'

export default function FieldStyleCustomize() {
  const { css } = useFela()
  const { formType, formID } = useParams()
  const setStyles = useSetRecoilState($styles)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const { themeVars: tempThemevars } = useRecoilValue($tempStyles)
  const colorSchemeRoot = useRecoilValue($colorScheme)
  const [colorScheme, setColorScheme] = useState(colorSchemeRoot)
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const themeColors = useRecoilValue($themeColors)

  const { '--global-font-color': themeFontColor,
    '--global-primary-color': themePrimaryColor } = themeColors

  const { '--global-font-color': tempFontColor,
    '--global-primary-color': tempPrimaryColor } = tempThemevars

  const setSizes = ({ target: { value } }) => {
    const tmpThemeVar = deepCopy(themeVars)

    setStyles(prvStyle => produce(prvStyle, drft => {
      const flds = prvStyle.fields

      const commonStyles = CommonStyle(selectedFieldId, value)
      const commonStylClasses = Object.keys(commonStyles)

      const fldClassesObj = flds[selectedFieldId].classes
      const fldClasses = Object.keys(fldClassesObj)
      console.log(commonStyles, flds, fldClassesObj)

      const commonStylClassesLen = commonStylClasses.length
      for (let indx = 0; indx < commonStylClassesLen; indx += 1) {
        const comnStylClass = commonStylClasses[indx]

        if (fldClassesObj.hasOwnProperty(comnStylClass)) {
          const mainStlProperties = fldClassesObj[comnStylClass]
          const comStlProperties = commonStyles[comnStylClass]
          const comnStlPropertiesKey = Object.keys(comStlProperties)

          const comnStlPropertiesKeyLen = comnStlPropertiesKey.length
          for (let popIndx = 0; popIndx < comnStlPropertiesKeyLen; popIndx += 1) {
            const comnStlProperty = comnStlPropertiesKey[popIndx]

            if (mainStlProperties.hasOwnProperty(comnStlProperty)) {
              const mainStlVal = mainStlProperties[comnStlProperty]
              const comStlVal = comStlProperties[comnStlProperty]
              if (mainStlVal === comStlVal) {
                continue
              }
              if (mainStlVal?.match(/var/gi)?.[0] === 'var') {
                const mainStateVar = mainStlVal.replaceAll(/\(|var|!important|,.*|\)/gi, '')
                tmpThemeVar[mainStateVar] = comStlVal
                continue
              }
              if (!mainStlVal?.match(/var/gi)?.[0]) {
                drft.fields[selectedFieldId].classes[fldClasses[indx]][comnStlProperty] = comStlVal
              }
            }
          }
        }
      }
    }))

    setThemeVars(tmpThemeVar)
  }

  const handlecolorScheme = ({ target: { name } }) => setColorScheme(name)

  const handChange = ({ target: { checked } }) => {
    if (checked) {
      setThemeVars(prvThemevar => produce(prvThemevar, drft => {
        drft['--global-font-color'] = tempThemevars['--global-font-color']
      }))
    } else {
      console.log(checked)
    }
  }

  return (
    <div className={css(cls.mainWrapper)}>
      <span className={css({ flxi: 'center', mt: 10 })}>
        <Link to={`/form/builder/${formType}/${formID}/themes`} className={css([cls.breadcumbLink, ut.fontBody, cls.l1])}>
          <ChevronLeft size="14" />
          {' '}
          Themes /
          {' '}
        </Link>
        <span className={css([cls.breadcumbLink, ut.fontBody, cls.l2])}>Theme Customize</span>
      </span>
      <h4 className={css(cls.title)}>Theme Customize</h4>
      <div className={css(cls.divider)} />
      <div className={css(cls.wrp)}>
        <h4 className={css(cls.subTitle)}>Color Scheme</h4>
        <div className={css(ut.flxcb, ut.w9, ut.mt1)}>
          <button onClick={handlecolorScheme} name="light" data-active={colorScheme === 'light'} className={css(cls.menuItem, colorScheme === 'light' && cls.clrActive)} type="button">Light</button>
          <button onClick={handlecolorScheme} name="dark" data-active={colorScheme === 'dark'} className={css(cls.menuItem, colorScheme === 'dark' && cls.clrActive)} type="button">Dark</button>
          <button onClick={handlecolorScheme} name="high-contrast" data-active={colorScheme === 'high-contrast'} className={css(cls.menuItem, colorScheme === 'high-contrast' && cls.clrActive)} type="button">High Contrast</button>
        </div>
        <div className={css(cls.divider)} />

        <h4 className={css(cls.subTitle)}>Quick Tweaks</h4>
        <div className={css(cls.container)}>

          {/*
          <div className={css(ut.flxc)}>
            <div className={css(cls.menuItem)}>Default</div>
            <div className={css(cls.menuItem, { px: 10 })}>Dark Mode</div>
            <div className={css(cls.menuItem)}>High Contrast Mode</div>
          </div> */}

          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Primary Color</span>
              {(tempPrimaryColor !== themePrimaryColor)
                && <ResetStyle themeVar="--global-primary-color" stateName="themeColors" />}
            </div>
            <SimpleColorPicker value={themePrimaryColor} action={{ type: 'global-primary-color' }} subtitle="Primary color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Font Color</span>
              <span><input type="checkbox" title="Default Color" onChange={handChange} name="" id="" /></span>
              {(tempFontColor !== themeFontColor) && <ResetStyle themeVar="--global-font-color" stateName="themeColors" />}
            </div>
            <SimpleColorPicker value={themeFontColor} action={{ type: 'global-font-color' }} />
          </div>
        </div>

        <div className={css(cls.divider)} />

        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500)}>Theme</span>
          <ThemeControl />
        </div>
        <div className={css(ut.flxcb)}>
          <span className={css(ut.fw500)}>Size</span>
          <select onChange={setSizes} name="" id="">
            <option value="small-2">Small-2</option>
            <option value="small-1">Small-1</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="large-1">Large-1</option>
          </select>
        </div>
        {[...Array(20).keys()].map((i) => <br key={`${i}-asd`} />)}
      </div>
    </div>
  )
}

// const MenuItem = ({ label, onClick, name }) => {
//   const { css } = useFela()
//   return <button onClick={onClick} name={name} className={css(cls.menuItem)} type="button">{label}</button>
// }

const cls = {
  title: { mt: 5, mb: 2 },
  breadcumbLink: { fs: 11, flxi: 'center', mr: 3, ':focus': { bs: 'none' } },
  l1: { cr: 'var(--white-0-61)', ':hover': { textDecoration: 'underline !important' } },
  l2: { cr: 'var(--white-0-21)' },
  wrp: { ml: 5, mt: 10, fs: 12 },
  mainWrapper: { bd: 'var(--white-100)' },
  subTitle: { mt: 10, mb: 5, fs: 15, cr: 'var(--white-0-31)' },
  subTitle2: { fs: 14, fw: 500, mt: 10 },
  divider: { bb: '1px solid var(--white-0-83)', mx: 3, my: 10 },
  container: { ml: 12, mr: 15 },
  btn: {
    b: 'none',
    oe: 'none',
    brs: 8,
    bc: 'var(--white-0-95)',
    cur: 'pointer',
  },
  pnt: { cur: 'not-allowed' },
  menuItem: {
    ws: 'nowrap',
    fs: 14,
    fw: 500,
    b: 'none',
    bd: 'transparent',
    curp: 1,
    py: 8,
    px: 15,
    brs: 20,
    pn: 'relative',
    ':hover:not([data-active="true"])': { bd: 'var(--b-79-96)' },
  },
  clrActive: {
    bd: 'var(--b-50)',
    cr: 'var(--white-100)',
  },
  con: { py: 10, bb: '0.5px solid var(--white-0-83)' },
}
