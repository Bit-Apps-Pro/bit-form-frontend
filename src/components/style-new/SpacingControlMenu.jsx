/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $themeVars } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'

export default function SpacingControlMenu() {
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const { css } = useFela()
  const { '--lw-m': lblWrpMargin,
    '--lw-p': lblWrpPadding,
    '--fl-m': fldLblMargin,
    '--fl-p': fldLblPadding,
    '--st-m': subTitleMargin,
    '--st-p': subTitlePadding,
    '--ht-m': hlpTxtMargin,
    '--ht-p': hlpTxtPadding,
    '--fld-m': fldMargin,
    '--fld-p': fldPadding } = themeVars

  const lblWrpMarginHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--lw-m'] = `${v}`
    }))
  }

  const lblWrpPaddingHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--lw-p'] = `${v}`
    }))
  }

  const fldLblMarginHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fl-m'] = `${v}`
    }))
  }

  const fldLblPaddingHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fl-p'] = `${v}`
    }))
  }
  const subTitleMarginHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--st-m'] = `${v}`
    }))
  }
  const subTitlePaddingHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--st-p'] = `${v}`
    }))
  }
  const HlpTxtMarginHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--ht-m'] = `${v}`
    }))
  }
  const HlpTxtPaddingHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--ht-p'] = `${v}`
    }))
  }
  const FldMarginHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fld-m'] = `${v}`
    }))
  }
  const FldPaddingHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fld-p'] = `${v}`
    }))
  }

  return (
    <>
      <SpaceControl value={lblWrpMargin} title="Label Wrapper Margin" onChange={val => lblWrpMarginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <SpaceControl value={lblWrpPadding} title="Label Wrapper Padding" onChange={val => lblWrpPaddingHandler(val)} unitOption={['px', 'em', 'rem']} className={css(ut.mt4)} />
      <SpaceControl value={fldLblMargin} title="Field Label Margin" onChange={val => fldLblMarginHandler(val)} unitOption={['px', 'em', 'rem']} className={css(ut.mt4)} />
      <SpaceControl value={fldLblPadding} title="Field Label Padding" onChange={val => fldLblPaddingHandler(val)} unitOption={['px', 'em', 'rem']} className={css(ut.mt4)} />
      <SpaceControl value={subTitleMargin} title="Sub Title Margin" onChange={val => subTitleMarginHandler(val)} unitOption={['px', 'em', 'rem']} className={css(ut.mt4)} />
      <SpaceControl value={subTitlePadding} title="Sub Title Padding" onChange={val => subTitlePaddingHandler(val)} unitOption={['px', 'em', 'rem']} className={css(ut.mt4)} />
      <SpaceControl value={hlpTxtMargin} title="Helper Text Margin" onChange={val => HlpTxtMarginHandler(val)} unitOption={['px', 'em', 'rem']} className={css(ut.mt4)} />
      <SpaceControl value={hlpTxtPadding} title="Helper TextPadding" onChange={val => HlpTxtPaddingHandler(val)} unitOption={['px', 'em', 'rem']} className={css(ut.mt4)} />
      <SpaceControl value={fldMargin} title="Field Margin" onChange={val => FldMarginHandler(val)} unitOption={['px', 'em', 'rem']} className={css(ut.mt4)} />
      <SpaceControl value={fldPadding} title="Field Padding" onChange={val => FldPaddingHandler(val)} unitOption={['px', 'em', 'rem']} className={css(ut.mt4)} />
    </>
  )
}
