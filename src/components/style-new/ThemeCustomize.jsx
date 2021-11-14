/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { useFela } from 'react-fela'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $styles, $tempThemeVars, $themeVars } from '../../GlobalStates'
import ChevronLeft from '../../Icons/ChevronLeft'
import UndoIcon from '../../Icons/UndoIcon'
import ut from '../../styles/2.utilities'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SingleToggle from '../Utilities/SingleToggle'
import FieldMarginControl from './FieldMarginControl'
import FieldWrapperControl from './FieldWrapperControl'
import FontPicker from './FontPicker'
import LabelControl from './LabelControl'
import LabelSpacingControl from './LabelSpacingControl'
import SimpleColorPicker from './SimpleColorPicker'
import { changeFormDir, unitConverterHelper } from './styleHelpers'

export default function ThemeCustomize() {
  const { css } = useFela()
  const { formType, formID } = useParams()
  const setStyles = useSetRecoilState($styles)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const tempThemeVars = useRecoilValue($tempThemeVars)

  const { '--global-primary-color': globalPrimaryColor,
    '--dir': direction,
    '--global-font-color': globalFontColor,
    '--global-bg-color': globalBgColor,
    '--g-bdr-rad': globalBorderRad,
    '--global-fld-bdr-clr': globalFldBdrClr,
    '--global-fld-bg-color': globalFldBgClr,
    '--fld-fs': fldFs } = themeVars

  const globalBdrRadValue = globalBorderRad.match(/[-]?([0-9]*[.])?[0-9]+/gi)[0]
  const globalBdrRadUnit = globalBorderRad.match(/([A-z]|%)+/gi)[0]

  const fldFSValue = fldFs?.match(/[-]?([0-9]*[.])?[0-9]+/gi)[0]
  const fldFSUnit = fldFs?.match(/([A-z]|%)+/gi)[0]
  // const [h,s,l/]
  // const globalPrimaryColor = ['--global-primary-color']
  // const direction = styles.themeVars['--dir']
  // console.log()

  const handleDir = ({ target: { checked } }) => {
    const dir = checked ? 'rtl' : 'ltr'
    setStyles(prv => changeFormDir(prv, dir))
    setThemeVars(prv => produce(prv, drft => { drft['--dir'] = dir }))
  }

  const borderRadHandler = ({ value, unit }) => {
    const convertvalue = unitConverterHelper(unit, value, globalBdrRadUnit)
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      drft['--g-bdr-rad'] = `${convertvalue}${unit || globalBdrRadUnit}`
    }))
  }
  const fldFsSizeHandler = ({ value, unit }) => {
    const convertvalue = unitConverterHelper(unit, value, fldFSUnit)
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      drft['--fld-fs'] = `${convertvalue}${unit || fldFSUnit}`
    }))
  }
  const undoColor = (value) => {
    setThemeVars(prvStyle => produce(prvStyle, drft => {
      drft[value] = tempThemeVars[value]
    }))
  }

  const undoHandler = (value) => {
    setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle[value] = tempThemeVars[value] || '0px'
    }))
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
        <h4 className={css(cls.subTitle)}>Quick Tweaks</h4>
        <br />
        <div className={css(cls.container)}>
          <div className={css(ut.flxcb)}>
            <div className={css(ut.flxb)}>
              <span className={css(ut.fw500)}>Background Color</span>
              <button onClick={() => undoColor('--global-bg-color')} className={css(cls.btn, ut.mr1)} type="button">
                <UndoIcon size="20" />
              </button>
            </div>
            <SimpleColorPicker value={globalBgColor} action={{ type: 'global-bg-color' }} subtitle="Background color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Primary Color</span>
              <button onClick={() => undoColor('--global-primary-color')} className={css(cls.btn, ut.mr1)} type="button">
                <UndoIcon size="20" />
              </button>
            </div>
            <SimpleColorPicker value={globalPrimaryColor} action={{ type: 'global-primary-color' }} subtitle="Primary color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Font Color</span>
              <button onClick={() => undoColor('--global-font-color')} className={css(cls.btn, ut.mr1)} type="button">
                <UndoIcon size="20" />
              </button>
            </div>
            <SimpleColorPicker value={globalFontColor} action={{ type: 'global-font-color' }} />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Border Color</span>
              <button onClick={() => undoColor('--global-fld-bdr-color')} className={css(cls.btn, ut.mr1)} type="button">
                <UndoIcon size="20" />
              </button>
            </div>
            <SimpleColorPicker value={globalFldBdrClr} action={{ type: 'global-fld-bdr-color' }} subtitle="Border Color" />
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <div className={css(ut.flxcb)}>
              <span className={css(ut.fw500)}>Field Background Color</span>
              <button onClick={() => undoColor('--global-fld-bg-color')} className={css(cls.btn, ut.mr1)} type="button">
                <UndoIcon size="20" />
              </button>
            </div>
            <SimpleColorPicker value={globalFldBgClr} action={{ type: 'global-fld-bg-color' }} subtitle="Field Background Color" />
          </div>
        </div>

        <div className={css(cls.divider)} />

        <div className={css({ mr: 15 })}>
          <div className={css(ut.flxcb, ut.mb2)}>
            <span className={css(ut.fw500)}>Font Family</span>
            <FontPicker />
          </div>

          <div className={css(ut.flxcb, ut.mb2)}>
            <span className={css(ut.fw500)}>Direction Right To Left (RTL)</span>
            <SingleToggle isChecked={direction === 'rtl'} action={handleDir} />
          </div>

          <div className={css(ut.flxcb, ut.mb2)}>
            <span className={css(ut.fw500)}>Label Alignment</span>
            <LabelControl />
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Label Spacing</span>
            <LabelSpacingControl />
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Field Margin</span>
            <FieldMarginControl />
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Field Wrapper Control</span>
            <FieldWrapperControl />
          </div>

          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Border Radius</span>
            <button onClick={() => undoHandler('--g-bdr-rad')} className={css(cls.btn, ut.mr1)} type="button">
              <UndoIcon size="20" />
            </button>
            <SizeControl
              inputHandler={borderRadHandler}
              sizeHandler={({ unitKey, unitValue }) => borderRadHandler({ unit: unitKey, value: unitValue })}
              value={globalBdrRadValue}
              unit={globalBdrRadUnit}
              width="110px"
              options={['px', 'em', 'rem']}
            />
          </div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500)}>Field Font Size</span>
            <button onClick={() => undoHandler('--fld-fs')} className={css(cls.btn, ut.mr1)} type="button">
              <UndoIcon size="20" />
            </button>
            <SizeControl
              inputHandler={fldFsSizeHandler}
              sizeHandler={({ unitKey, unitValue }) => fldFsSizeHandler({ unit: unitKey, value: unitValue })}
              value={fldFSValue}
              unit={fldFSUnit}
              width="110px"
              options={['px', 'em', 'rem']}
            />
          </div>

          {[...Array(20).keys()].map(() => <br />)}
        </div>
      </div>
    </div>
  )
}

const cls = {
  title: { mt: 5, mb: 2 },
  breadcumbLink: { fs: 11, flxi: 'center', mr: 3, ':focus': { bs: 'none' } },
  l1: { cr: 'var(--white-0-61)', ':hover': { textDecoration: 'underline !important' } },
  l2: { cr: 'var(--white-0-21)' },
  wrp: { ml: 5, mt: 10, fs: 14 },
  mainWrapper: { bd: 'var(--white-100)' },
  subTitle: { mt: 10, mb: 5, fs: 15, cr: 'var(--white-0-31)' },
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
}
