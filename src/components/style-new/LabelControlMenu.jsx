/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $builderHookStates, $tempStyles, $themeVars } from '../../GlobalStates'
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
import { getNumFromStr, getStrFromStr, unitConverter } from './styleHelpers'

export default function LabelControlMenu() {
  const { css } = useFela()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const setBuilderHookStates = useSetRecoilState($builderHookStates)
  const [openVarPos, setOpenVarPos] = useState(false)
  const tempStyles = useRecoilValue($tempStyles)
  const tempThemeVars = tempStyles.themeVars


  const { '--fld-lbl-fs': fldLblFs,
    '--sub-titl-fs': subTitleFs,
    '--hlp-txt-fs': heplrTxtFs,
    '--lbl-wrp-width': lblWidth,
    '--fld-wrp-dis': fwDis,
    '--fld-wrp-fdir': fwFdir,
    '--lbl-wrp-sa': lwSa,
    '--lbl-al': lblAl,
    '--sub-titl-al': stAl,
    '--hlp-txt-al': htAl } = themeVars

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
          drftStyle['--fld-wrp-dis'] = ''
          drftStyle['--lbl-wrp-width'] = ''
          drftStyle['--inp-wrp-width'] = ''
          drftStyle['--lbl-wrp-sa'] = ''
        }))
        setOpenVarPos(false)
        setBuilderHookStates(prv => ({ ...prv, reCalculateFieldHeights: prv.reCalculateFieldHeights + 1 }))
        break
      case 'inline':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--fld-wrp-dis'] = 'flex'
          drftStyle['--fld-wrp-fdir'] = ''
          drftStyle['--lbl-wrp-width'] ||= '40%'
          drftStyle['--inp-wrp-width'] = '100%'
        }))
        setOpenVarPos(true)
        setBuilderHookStates(prv => ({ ...prv, reCalculateFieldHeights: prv.reCalculateFieldHeights + 1 }))
        break
      case 'inline-rev':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--fld-wrp-dis'] = 'flex'
          drftStyle['--fld-wrp-fdir'] = 'row-reverse'
          drftStyle['--lbl-wrp-width'] ||= '40%'
          drftStyle['--inp-wrp-width'] = '60%'
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
          drftStyle['--lbl-wrp-sa'] = ''
        }))
        break
      case 'center':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--lbl-wrp-sa'] = 'center'
        }))
        break
      case 'end':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--lbl-wrp-sa'] = 'end'
        }))
        break
      default:
        break
    }
  }

  const setLabelAlign = (align) => setAlign(align, '--lbl-al')
  const setSubLabelAlign = (align) => setAlign(align, '--sub-titl-al')
  const setHelperTextAlign = (align) => setAlign(align, '--hlp-txt-al')

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
      drftStyle['--fld-lbl-fs'] = `${value}${unit}`
    }))
  }

  const subTtlFontSizeHandler = ({ value, unit }) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--sub-titl-fs'] = `${value}${unit}`
    }))
  }

  const hlprTxtFontSizeHandler = ({ value, unit }) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--hlp-txt-fs'] = `${value}${unit}`
    }))
  }

  const lblWidthHandler = ({ value, unit }) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--lbl-wrp-width'] = `${value}${unit}`
    }))
  }

  const unitHandler = (unit, value, name) => {
    if (value) {
      const preUnit = getStrFromStr(themeVars[name])
      const convetVal = unitConverter(unit, value, preUnit)
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
        <button type="button" disabled={!tempThemeVars['--fld-lbl-fs']} onClick={() => undoHandler('--fld-lbl-fs')}>
          <UndoIcon size="18" />
        </button>
        <SizeControl
          width="105px"
          value={Number(fldLblFsVal || 0)}
          unit={fldLblFsUnit}
          inputHandler={fontSizeHandler}
          sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--fld-lbl-fs')}
          options={['px', 'em', 'rem']}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Subtitle Font Size</span>
        <button disabled={!tempThemeVars['--sub-titl-fs']} type="button" onClick={() => undoHandler('--sub-titl-fs')}>
          <UndoIcon size="18" />
        </button>
        <SizeControl
          width="105px"
          value={Number(subTitleFsVal)}
          unit={subTitleFsUnit}
          inputHandler={subTtlFontSizeHandler}
          sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--sub-titl-fs')}
          name="subTitle"
          options={['px', 'em', 'rem']}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Helper Text Font Size</span>
        <button disabled={!tempThemeVars['--hlp-txt-fs']} type="button" onClick={() => undoHandler('--hlp-txt-fs')}>
          <UndoIcon size="18" />
        </button>
        <SizeControl
          width="105px"
          value={Number(heplrTxtFsVal)}
          unit={heplrTxtFsUnit}
          inputHandler={hlprTxtFontSizeHandler}
          sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--hlp-txt-fs')}
          name="heprTxt"
          options={['px', 'em', 'rem']}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Label Width</span>
        <button disabled={!tempThemeVars['--lbl-wrp-width']} type="button" onClick={() => undoHandler('--lbl-wrp-width')}>
          <UndoIcon size="18" />
        </button>
        <SizeControl
          width="105px"
          value={Number(lblWidthVal)}
          unit={lblWidthUnit}
          inputHandler={lblWidthHandler}
          sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--lbl-wrp-width')}
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
            tempThemeVars['--lbl-wrp-sa'] && (
              <button type="button" onClick={() => undoAlignHandler('--lbl-wrp-sa')}>
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
          tempThemeVars['--sub-titl-al'] && (
            <button type="button" onClick={() => undoAlignHandler('--sub-titl-al')}>
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
          tempThemeVars['--hlp-txt-al'] && (
            <button type="button" onClick={() => undoAlignHandler('--hlp-txt-al')}>
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
