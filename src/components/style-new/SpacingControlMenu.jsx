import produce from 'immer'
import { useRecoilState } from 'recoil'
import { $styles } from '../../GlobalStates'
import LabelSpaceControl from '../CompSettings/StyleCustomize/ChildComp/LabelSpaceControl'

export default function SpacingControlMenu() {
  const [styles, setStyles] = useRecoilState($styles)

  const { '--lw-m': lblWrpMargin } = styles.themeVars
  const { '--lw-p': lblWrpPadding } = styles.themeVars
  const { '--fl-m': fldLblMargin } = styles.themeVars
  const { '--fl-p': fldLblPadding } = styles.themeVars
  const { '--st-m': subTitleMargin } = styles.themeVars
  const { '--st-p': subTitlePadding } = styles.themeVars
  const { '--ht-m': hlpTxtMargin } = styles.themeVars
  const { '--ht-p': hlpTxtPadding } = styles.themeVars
  const { '--fld-m': fldMargin } = styles.themeVars
  const { '--fld-p': fldPadding } = styles.themeVars

  const lblWrpMarginHandler = (v) => {
    console.log(v)
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--lw-m'] = `${v}`
    }))
  }

  const lblWrpPaddingHandler = (v) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--lw-p'] = `${v}`
    }))
  }

  const fldLblMarginHandler = (v) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--fl-m'] = `${v}`
    }))
  }

  const fldLblPaddingHandler = (v) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--fl-p'] = `${v}`
    }))
  }
  const subTitleMarginHandler = (v) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--st-m'] = `${v}`
    }))
  }
  const subTitlePaddingHandler = (v) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--st-p'] = `${v}`
    }))
  }
  const HlpTxtMarginHandler = (v) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--ht-m'] = `${v}`
    }))
  }
  const HlpTxtPaddingHandler = (v) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--ht-p'] = `${v}`
    }))
  }
  const FldMarginHandler = (v) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--fld-m'] = `${v}`
    }))
  }
  const FldPaddingHandler = (v) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--fld-p'] = `${v}`
    }))
  }

  return (
    <>
      <LabelSpaceControl value={lblWrpMargin} title="Label Wrapper Margin" onChange={val => lblWrpMarginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <LabelSpaceControl value={lblWrpPadding} title="Label Wrapper Padding" onChange={val => lblWrpPaddingHandler(val)} unitOption={['px', 'em', 'rem']} />
      <LabelSpaceControl value={fldLblMargin} title="Field Label Margin" onChange={val => fldLblMarginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <LabelSpaceControl value={fldLblPadding} title="Field Label Padding" onChange={val => fldLblPaddingHandler(val)} unitOption={['px', 'em', 'rem']} />
      <LabelSpaceControl value={subTitleMargin} title="Sub Title Margin" onChange={val => subTitleMarginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <LabelSpaceControl value={subTitlePadding} title="Sub Title Padding" onChange={val => subTitlePaddingHandler(val)} unitOption={['px', 'em', 'rem']} />
      <LabelSpaceControl value={hlpTxtMargin} title="Helper Text Margin" onChange={val => HlpTxtMarginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <LabelSpaceControl value={hlpTxtPadding} title="Helper TextPadding" onChange={val => HlpTxtPaddingHandler(val)} unitOption={['px', 'em', 'rem']} />
      <LabelSpaceControl value={fldMargin} title="Field Margin" onChange={val => FldMarginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <LabelSpaceControl value={fldPadding} title="Field Padding" onChange={val => FldPaddingHandler(val)} unitOption={['px', 'em', 'rem']} />
    </>
  )
}
