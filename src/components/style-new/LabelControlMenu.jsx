/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHookStates, $styles } from '../../GlobalStates'
import LblPlacementInlineIcn from '../../Icons/LblPlacementInlineIcn'
import LblPlacementReverseIcn from '../../Icons/LblPlacementReverseIcn'
import LblPlacementTopIcn from '../../Icons/LblPlacementTopIcn'
import LblvarticalPlsmentCntrIcn from '../../Icons/LblvarticalPlsmentCntrIcn'
import LblvarticalPlsmntBottomIcon from '../../Icons/LblvarticalPlsmntBottomIcon'
import LblvertcalPlsmntTopIcn from '../../Icons/LblvertcalPlsmntTopIcn'
import TxtAlignCntrIcn from '../../Icons/TxtAlignCntrIcn'
import TxtAlignLeftIcn from '../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../Icons/TxtAlignRightIcn'
import ut from '../../styles/2.utilities'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'

export default function LabelControlMenu() {
  const { css } = useFela()
  const [styles, setStyles] = useRecoilState($styles)
  const setBuilderHookStates = useSetRecoilState($builderHookStates)
  const [openVarPos, setOpenVarPos] = useState(false)

  const { '--fl-fs': fldLblFs } = styles.themeVars
  const { '--st-fs': subTitleFs } = styles.themeVars
  const { '--ht-fs': heplrTxtFs } = styles.themeVars
  const { '--lw-width': lblwitdh } = styles.themeVars

  const getValue = (stringVal) => stringVal.match(/[-]?([0-9]*[.])?[0-9]+/gi)
  const getUnit = (stringVal) => stringVal.match(/([A-z]|%)+/gi)

  const [fldLblFsVal] = getValue(fldLblFs)
  const [fldLblFsUnit] = getUnit(fldLblFs)

  const [subTitleFsVal] = getValue(subTitleFs)
  const [subTitleFsUnit] = getUnit(subTitleFs)

  const [heplrTxtFsVal] = getValue(heplrTxtFs)
  const [heplrTxtFsUnit] = getUnit(heplrTxtFs)

  const [lblWidthVal] = getValue(lblwitdh)
  const [lblWidthUnit] = getUnit(lblwitdh)

  const activeLabelPosition = () => {
    if (styles.themeVars['--fw-dis'] === '') return 'top'
    if (styles.themeVars['--fw-dis'] === 'flex' && styles.themeVars['--fw-fdir'] === '') return 'inline'
    if (styles.themeVars['--fw-dis'] === 'flex' && styles.themeVars['--fw-fdir'] === 'row-reverse') return 'inline-rev'
  }

  const handleLabelPosition = (name) => {
    switch (name) {
      case 'top':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--fw-dis'] = ''
          drftStyle.themeVars['--lw-width'] = ''
          drftStyle.themeVars['--iw-width'] = ''
          drftStyle.themeVars['--lw-sa'] = ''
        }))
        setOpenVarPos(false)
        setBuilderHookStates(prv => ({ ...prv, reCalculateFieldHeights: prv.reCalculateFieldHeights + 1 }))
        break
      case 'inline':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--fw-dis'] = 'flex'
          drftStyle.themeVars['--fw-fdir'] = ''
          drftStyle.themeVars['--lw-width'] ||= '40%'
          drftStyle.themeVars['--iw-width'] = '100%'
        }))
        setOpenVarPos(true)
        setBuilderHookStates(prv => ({ ...prv, reCalculateFieldHeights: prv.reCalculateFieldHeights + 1 }))
        break
      case 'inline-rev':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--fw-dis'] = 'flex'
          drftStyle.themeVars['--fw-fdir'] = 'row-reverse'
          drftStyle.themeVars['--lw-width'] ||= '40%'
          drftStyle.themeVars['--iw-width'] = '100%'
        }))
        setOpenVarPos(true)
        setBuilderHookStates(prv => ({ ...prv, reCalculateFieldHeights: prv.reCalculateFieldHeights + 1 }))
        break
      default:
        break
    }
  }

  const setLabelVerticalPos = (name) => {
    switch (name) {
      case 'top':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--lw-sa'] = ''
        }))
        break
      case 'center':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--lw-sa'] = 'center'
        }))
        break
      case 'end':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--lw-sa'] = 'end'
        }))
        break
      default:
        break
    }
  }

  const setLabelAlign = (name) => setAlign(name, '--lbl-al')
  const setSubLabelAlign = (name) => setAlign(name, '--st-al')
  const setHelperTextAlign = (name) => setAlign(name, '--ht-al')

  const setAlign = (name, posVar) => {
    switch (name) {
      case 'left':
        setStyles(preStyle => produce(preStyle, drftStyle => {
          drftStyle.themeVars[posVar] = ''
        }))
        break
      case 'center':
        setStyles(preStyle => produce(preStyle, drftStyle => {
          drftStyle.themeVars[posVar] = 'center'
        }))
        break
      case 'right':
        setStyles(preStyle => produce(preStyle, drftStyle => {
          drftStyle.themeVars[posVar] = 'right'
        }))
        break
      default:
        break
    }
  }
  const mainStyle = {
    main: { flx: 'center-between' },
    label: { fs: 12 },
  }

  const fontSizeHandler = ({ value, unit }) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--fl-fs'] = `${value}${unit}`
    }))
  }

  const subTtlFontSizeHandler = ({ value, unit }) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--st-fs'] = `${value}${unit}`
    }))
  }

  const hlprTxtFontSizeHandler = ({ value, unit }) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--ht-fs'] = `${value}${unit}`
    }))
  }

  const lblWidthHandler = ({ value, unit }) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.themeVars['--lw-width'] = `${value}${unit}`
    }))
  }

  const unitConverter = (unit, value, name) => {
    const [preUnit] = getUnit(styles.themeVars[name])

    if (preUnit === unit) return value
    if (preUnit === 'px' && unit === 'em') return (value * 0.0714285714285714).toFixed(2)
    if (preUnit === 'px' && unit === 'rem') return value * 0.0625
    if (preUnit === 'em' && unit === 'px') return value * 14
    if (preUnit === 'em' && unit === 'rem') return value / 16
    if (preUnit === 'rem' && unit === 'em') return value / 14
    if (preUnit === 'rem' && unit === 'px') return value * 16
  }

  const unitHandler = (unit, value, name) => {
    if (value) {
      const convetVal = unitConverter(unit, value, name)
      setStyles(preStyle => produce(preStyle, drftStyle => {
        drftStyle.themeVars[name] = `${convetVal}${unit}`
      }))
    }
  }

  return (
    <div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Label Font Size</span>
        <SizeControl
          width="115px"
          value={Number(fldLblFsVal || 0)}
          unit={fldLblFsUnit}
          inputHandler={fontSizeHandler}
          sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--fl-fs')}
          options={['px', 'em', 'rem']}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Subtitle Font Size</span>
        <SizeControl
          width="115px"
          value={Number(subTitleFsVal)}
          unit={subTitleFsUnit}
          inputHandler={subTtlFontSizeHandler}
          sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--st-fs')}
          name="subTitle"
          options={['px', 'em', 'rem']}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Helper Text Font Size</span>
        <SizeControl
          width="115px"
          value={Number(heplrTxtFsVal)}
          unit={heplrTxtFsUnit}
          inputHandler={hlprTxtFontSizeHandler}
          sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--ht-fs')}
          name="heprTxt"
          options={['px', 'em', 'rem']}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Label Width</span>
        <SizeControl
          width="115px"
          value={Number(lblWidthVal)}
          unit={lblWidthUnit}
          inputHandler={lblWidthHandler}
          sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--lw-width')}
          options={['px', 'em', 'rem', '%']}
        />
      </div>

      <div className={css(ut.mb2, mainStyle.main)}>
        <span className={css(mainStyle.label)}>Label Postion</span>
        <StyleSegmentControl
          show={['icn']}
          tipPlace="bottom"
          options={[
            { icn: <LblPlacementTopIcn size="17" />, label: 'top', tip: 'Top' },
            { icn: <LblPlacementInlineIcn size="17" />, label: 'inline', tip: 'Inline' },
            { icn: <LblPlacementReverseIcn size="17" />, label: 'inline-rev', tip: 'Inline reverse' },
          ]}
          onChange={name => handleLabelPosition(name)}
          activeValue={activeLabelPosition}
        />
      </div>
      <Grow open={openVarPos}>
        <div className={css(ut.mb2, mainStyle.main)}>
          <span className={css(mainStyle.label)}>Label Postion Vertical</span>
          <StyleSegmentControl
            show={['icn']}
            tipPlace="bottom"
            options={[
              { icn: <LblvertcalPlsmntTopIcn size="17" />, label: 'top', tip: 'Top' },
              { icn: <LblvarticalPlsmentCntrIcn size="17" />, label: 'center', tip: 'Middle' },
              { icn: <LblvarticalPlsmntBottomIcon size="17" />, label: 'end', tip: 'Bottom' },
            ]}
            onChange={e => setLabelVerticalPos(e)}
            activeValue={styles.themeVars['--lw-sa']}
          />
        </div>
      </Grow>
      <div className={css(ut.mb2, mainStyle.main)}>
        <span className={css(mainStyle.label)}>Label Alignment</span>
        <StyleSegmentControl
          show={['icn']}
          tipPlace="bottom"
          options={[
            { icn: <TxtAlignLeftIcn size="17" />, label: 'left', tip: 'Left' },
            { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
            { icn: <TxtAlignRightIcn size="17" />, label: 'right', tip: 'Right' },
          ]}
          onChange={e => setLabelAlign(e)}
          activeValue={styles.themeVars['--lbl-al']}
        />
      </div>
      <div className={css(ut.mb2, mainStyle.main)}>
        <span className={css(mainStyle.label)}>Subtitle Alignment</span>
        <StyleSegmentControl
          show={['icn']}
          tipPlace="bottom"
          options={[
            { icn: <TxtAlignLeftIcn size="17" />, label: 'left', tip: 'Left' },
            { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
            { icn: <TxtAlignRightIcn size="17" />, label: 'right', tip: 'Right' },
          ]}
          onChange={e => setSubLabelAlign(e)}
          activeValue={styles.themeVars['--st-al']}
        />
      </div>
      <div className={css(ut.mb2, mainStyle.main)}>
        <span className={css(mainStyle.label)}>Helpertext Alignment</span>
        <StyleSegmentControl
          show={['icn']}
          tipPlace="bottom"
          options={[
            { icn: <TxtAlignLeftIcn size="17" />, label: 'left', tip: 'Left' },
            { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
            { icn: <TxtAlignRightIcn size="17" />, label: 'right', tip: 'Right' },
          ]}
          onChange={e => setHelperTextAlign(e)}
          activeValue={styles.themeVars['--ht-al']}
        />
      </div>
    </div>
  )
}
