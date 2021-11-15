/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHookStates, $tempThemeVars, $themeVars } from '../../GlobalStates'
import LblPlacementInlineIcn from '../../Icons/LblPlacementInlineIcn'
import LblPlacementReverseIcn from '../../Icons/LblPlacementReverseIcn'
import LblPlacementTopIcn from '../../Icons/LblPlacementTopIcn'
import LblvarticalPlsmentCntrIcn from '../../Icons/LblvarticalPlsmentCntrIcn'
import LblvarticalPlsmntBottomIcon from '../../Icons/LblvarticalPlsmntBottomIcon'
import LblvertcalPlsmntTopIcn from '../../Icons/LblvertcalPlsmntTopIcn'
import TxtAlignCntrIcn from '../../Icons/TxtAlignCntrIcn'
import TxtAlignLeftIcn from '../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../Icons/TxtAlignRightIcn'
import UndoIcon from '../../Icons/UndoIcon'
import ut from '../../styles/2.utilities'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import { getNumFromStr, getStrFromStr, unitConverterHelper } from './styleHelpers'

export default function LabelControlMenu() {
  const { css } = useFela()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const setBuilderHookStates = useSetRecoilState($builderHookStates)
  const [openVarPos, setOpenVarPos] = useState(false)
  const tempThemeVars = useRecoilValue($tempThemeVars)

  const { '--fl-fs': fldLblFs,
    '--st-fs': subTitleFs,
    '--ht-fs': heplrTxtFs,
    '--lw-width': lblWidth,
    '--fw-dis': fwDis,
    '--fw-fdir': fwFdir,
    '--lw-sa': lwSa,
    '--lbl-al': lblAl,
    '--st-al': stAl,
    '--ht-al': htAl } = themeVars

  const fldLblFsVal = getNumFromStr(fldLblFs)
  const fldLblFsUnit = getStrFromStr(fldLblFs)

  const subTitleFsVal = getNumFromStr(subTitleFs)
  const subTitleFsUnit = getStrFromStr(subTitleFs)

  const heplrTxtFsVal = getNumFromStr(heplrTxtFs)
  const heplrTxtFsUnit = getStrFromStr(heplrTxtFs)

  const lblWidthVal = getNumFromStr(lblWidth)
  const lblWidthUnit = getStrFromStr(lblWidth)

  const activeLabelPosition = () => {
    if (fwDis === '') return 'top'
    if (fwDis === 'flex' && fwFdir === '') return 'inline'
    if (fwDis === 'flex' && fwFdir === 'row-reverse') return 'inline-rev'
  }

  const handleLabelPosition = (name) => {
    switch (name) {
      case 'top':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--fw-dis'] = ''
          drftStyle['--lw-width'] = ''
          drftStyle['--iw-width'] = ''
          drftStyle['--lw-sa'] = ''
        }))
        setOpenVarPos(false)
        setBuilderHookStates(prv => ({ ...prv, reCalculateFieldHeights: prv.reCalculateFieldHeights + 1 }))
        break
      case 'inline':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--fw-dis'] = 'flex'
          drftStyle['--fw-fdir'] = ''
          drftStyle['--lw-width'] ||= '40%'
          drftStyle['--iw-width'] = '100%'
        }))
        setOpenVarPos(true)
        setBuilderHookStates(prv => ({ ...prv, reCalculateFieldHeights: prv.reCalculateFieldHeights + 1 }))
        break
      case 'inline-rev':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--fw-dis'] = 'flex'
          drftStyle['--fw-fdir'] = 'row-reverse'
          drftStyle['--lw-width'] ||= '40%'
          drftStyle['--iw-width'] = '100%'
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
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--lw-sa'] = ''
        }))
        break
      case 'center':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--lw-sa'] = 'center'
        }))
        break
      case 'end':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--lw-sa'] = 'end'
        }))
        break
      default:
        break
    }
  }

  const setLabelAlign = (align) => setAlign(align, '--lbl-al')
  const setSubLabelAlign = (align) => setAlign(align, '--st-al')
  const setHelperTextAlign = (align) => setAlign(align, '--ht-al')

  const setAlign = (align, posVar) => {
    switch (align) {
      case 'left':
        setThemeVars(preStyle => produce(preStyle, drftStyle => {
          drftStyle[posVar] = ''
        }))
        break
      case 'center':
        setThemeVars(preStyle => produce(preStyle, drftStyle => {
          drftStyle[posVar] = 'center'
        }))
        break
      case 'right':
        setThemeVars(preStyle => produce(preStyle, drftStyle => {
          drftStyle[posVar] = 'right'
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
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fl-fs'] = `${value}${unit}`
    }))
  }

  const subTtlFontSizeHandler = ({ value, unit }) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--st-fs'] = `${value}${unit}`
    }))
  }

  const hlprTxtFontSizeHandler = ({ value, unit }) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--ht-fs'] = `${value}${unit}`
    }))
  }

  const lblWidthHandler = ({ value, unit }) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--lw-width'] = `${value}${unit}`
    }))
  }

  const unitHandler = (unit, value, name) => {
    if (value) {
      const preUnit = getStrFromStr(themeVars[name])
      const convetVal = unitConverterHelper(unit, value, preUnit)
      setThemeVars(preStyle => produce(preStyle, drftStyle => {
        drftStyle[name] = `${convetVal}${unit}`
      }))
    }
  }
  const undoHandler = (value) => {
    if (!tempThemeVars[value]) return
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle[value] = tempThemeVars[value] || '0px'
    }))
  }
  const undoAlignHandler = (value) => {
    if (!tempThemeVars[value]) return
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle[value] = tempThemeVars[value] || ''
    }))
  }

  return (
    <div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Label Font Size</span>
        <button type="button" disabled={!tempThemeVars['--fl-fs']} onClick={() => undoHandler('--fl-fs')}>
          <UndoIcon size="18" />
        </button>
        <SizeControl
          width="105px"
          value={Number(fldLblFsVal || 0)}
          unit={fldLblFsUnit}
          inputHandler={fontSizeHandler}
          sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--fl-fs')}
          options={['px', 'em', 'rem']}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Subtitle Font Size</span>
        <button disabled={!tempThemeVars['--st-fs']} type="button" onClick={() => undoHandler('--st-fs')}>
          <UndoIcon size="18" />
        </button>
        <SizeControl
          width="105px"
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
        <button disabled={!tempThemeVars['--ht-fs']} type="button" onClick={() => undoHandler('--ht-fs')}>
          <UndoIcon size="18" />
        </button>
        <SizeControl
          width="105px"
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
        <button disabled={!tempThemeVars['--lw-width']} type="button" onClick={() => undoHandler('--lw-width')}>
          <UndoIcon size="18" />
        </button>
        <SizeControl
          width="105px"
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
          {
            tempThemeVars['--lw-sa'] && (
              <button type="button" onClick={() => undoAlignHandler('--lw-sa')}>
                <UndoIcon size="18" />
              </button>
            )
          }
          <StyleSegmentControl
            show={['icn']}
            tipPlace="bottom"
            options={[
              { icn: <LblvertcalPlsmntTopIcn size="17" />, label: 'top', tip: 'Top' },
              { icn: <LblvarticalPlsmentCntrIcn size="17" />, label: 'center', tip: 'Middle' },
              { icn: <LblvarticalPlsmntBottomIcon size="17" />, label: 'end', tip: 'Bottom' },
            ]}
            onChange={e => setLabelVerticalPos(e)}
            activeValue={lwSa}
          />
        </div>
      </Grow>
      <div className={css(ut.mb2, mainStyle.main)}>
        <span className={css(mainStyle.label)}>Label Alignment</span>
        {
          tempThemeVars['--lbl-al'] && (

            <button type="button" onClick={() => undoAlignHandler('--lbl-al')}>
              <UndoIcon size="18" />
            </button>
          )
        }
        <StyleSegmentControl
          show={['icn']}
          tipPlace="bottom"
          options={[
            { icn: <TxtAlignLeftIcn size="17" />, label: 'left', tip: 'Left' },
            { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
            { icn: <TxtAlignRightIcn size="17" />, label: 'right', tip: 'Right' },
          ]}
          onChange={e => setLabelAlign(e)}
          activeValue={lblAl}
        />
      </div>
      <div className={css(ut.mb2, mainStyle.main)}>
        <span className={css(mainStyle.label)}>Subtitle Alignment</span>
        {
          tempThemeVars['--st-al'] && (

            <button type="button" onClick={() => undoAlignHandler('--st-al')}>
              <UndoIcon size="18" />
            </button>
          )
        }
        <StyleSegmentControl
          show={['icn']}
          tipPlace="bottom"
          options={[
            { icn: <TxtAlignLeftIcn size="17" />, label: 'left', tip: 'Left' },
            { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
            { icn: <TxtAlignRightIcn size="17" />, label: 'right', tip: 'Right' },
          ]}
          onChange={e => setSubLabelAlign(e)}
          activeValue={stAl}
        />
      </div>
      <div className={css(ut.mb2, mainStyle.main)}>
        <span className={css(mainStyle.label)}>Helpertext Alignment</span>
        {
          tempThemeVars['--ht-al'] && (
            <button type="button" onClick={() => undoAlignHandler('--ht-al')}>
              <UndoIcon size="18" />
            </button>
          )
        }
        <StyleSegmentControl
          show={['icn']}
          tipPlace="bottom"
          options={[
            { icn: <TxtAlignLeftIcn size="17" />, label: 'left', tip: 'Left' },
            { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
            { icn: <TxtAlignRightIcn size="17" />, label: 'right', tip: 'Right' },
          ]}
          onChange={e => setHelperTextAlign(e)}
          activeValue={htAl}
        />
      </div>
    </div>
  )
}
