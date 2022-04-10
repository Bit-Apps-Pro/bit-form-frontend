/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
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
import { reCalculateFieldHeights } from '../../Utils/FormBuilderHelper'
import Grow from '../CompSettings/StyleCustomize/ChildComp/Grow'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import ResetStyle from './ResetStyle'
import { getNumFromStr, getStrFromStr, unitConverter } from './styleHelpers'

export default function LabelControlMenu() {
  const { css } = useFela()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [openVarPos, setOpenVarPos] = useState(false)

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
    if (fwDis === 'block') return 'top'
    if (fwDis === 'flex' && fwFdir === '') return 'inline'
    if (fwDis === 'flex' && fwFdir === 'row-reverse') return 'inline-rev'
  }

  const handleLabelPosition = (name) => {
    switch (name) {
      case 'top':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--fld-wrp-dis'] = 'block'
          drftStyle['--lbl-wrp-width'] = ''
          drftStyle['--inp-wrp-width'] = ''
          drftStyle['--lbl-wrp-sa'] = ''
        }))
        setOpenVarPos(false)
        reCalculateFieldHeights()
        break
      case 'inline':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--fld-wrp-dis'] = 'flex'
          drftStyle['--fld-wrp-fdir'] = ''
          drftStyle['--lbl-wrp-width'] ||= '40%'
          drftStyle['--inp-wrp-width'] = '100%'
        }))
        setOpenVarPos(true)
        reCalculateFieldHeights()
        break
      case 'inline-rev':
        setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle['--fld-wrp-dis'] = 'flex'
          drftStyle['--fld-wrp-fdir'] = 'row-reverse'
          drftStyle['--lbl-wrp-width'] ||= '40%'
          drftStyle['--inp-wrp-width'] = '60%'
        }))
        setOpenVarPos(true)
        reCalculateFieldHeights()
        break
      default:
        break
    }
  }

  const updateState = (varName, value = '') => {
    setThemeVars(prvStyle => produce(prvStyle, drftStyle => {
      drftStyle[varName] = value
    }))
  }

  const setLabelVerticalPos = (position) => updateState('--lbl-wrp-sa', position === 'top' ? '' : position)
  const setLabelAlign = (align) => updateState('--lbl-al', align === 'left' ? '' : align)
  const setSubLabelAlign = (align) => updateState('--sub-titl-al', align === 'left' ? '' : align)
  const setHelperTextAlign = (align) => updateState('--hlp-txt-al', align === 'left' ? '' : align)

  const fontSizeHandler = ({ v, u, varName }) => {
    const val = `${v}${u}`
    updateState(varName, val)
  }

  const lblWidthHandler = ({ value, unit }) => {
    const val = `${value}${unit}`
    updateState('--lbl-wrp-width', val)
  }

  const unitHandler = (unit, value, name) => {
    const preUnit = getStrFromStr(themeVars[name])
    const convetVal = unitConverter(unit, value, preUnit)
    const val = `${convetVal}${unit}`
    updateState(name, val)
  }

  return (
    <div style={{ marginTop: '3px' }}>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Label Font Size</span>
        <span className={css(ut.flxc)}>
          <ResetStyle propertyPath="--fld-lbl-fs" stateObjName="themeVars" />
          <SizeControl
            width="100px"
            value={Number(fldLblFsVal || 0)}
            unit={fldLblFsUnit}
            inputHandler={({ value, unit }) => fontSizeHandler({ v: value, u: unit, varName: '--fld-lbl-fs' })}
            sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--fld-lbl-fs')}
            options={['px', 'em', 'rem']}
          />
        </span>
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Subtitle Font Size</span>
        <span className={css(ut.flxc)}>

          <ResetStyle propertyPath="--sub-titl-fs" stateObjName="themeVars" />
          <SizeControl
            width="100px"
            value={Number(subTitleFsVal)}
            unit={subTitleFsUnit}
            inputHandler={({ value, unit }) => fontSizeHandler({ v: value, u: unit, varName: '--sub-titl-fs' })}
            sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--sub-titl-fs')}
            name="subTitle"
            options={['px', 'em', 'rem']}
          />
        </span>
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Helper Text Font Size</span>
        <span className={css(ut.flxc)}>

          <ResetStyle propertyPath="--hlp-txt-fs" stateObjName="themeVars" />
          <SizeControl
            width="100px"
            value={Number(heplrTxtFsVal)}
            unit={heplrTxtFsUnit}
            inputHandler={({ value, unit }) => fontSizeHandler({ v: value, u: unit, varName: '--hlp-txt-fs' })}
            sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--hlp-txt-fs')}
            name="heprTxt"
            options={['px', 'em', 'rem']}
          />
        </span>
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12)}>Label Wrapper Width</span>
        <span className={css(ut.flxc)}>
          <ResetStyle propertyPath="--lbl-wrp-width" stateObjName="themeVars" />
          <SizeControl
            width="100px"
            value={Number(lblWidthVal)}
            unit={lblWidthUnit}
            inputHandler={lblWidthHandler}
            sizeHandler={({ unitKey, unitValue }) => unitHandler(unitKey, unitValue, '--lbl-wrp-width')}
            options={['px', 'em', 'rem', '%']}
          />
        </span>

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
          width="100px"
        />
      </div>
      <Grow open={openVarPos} overflw="visible">
        <div className={css(ut.mb2, mainStyle.main)}>
          <span className={css(mainStyle.label)}>Label Postion Vertical</span>
          <ResetStyle propertyPath="--lbl-wrp-sa" stateObjName="themeVars" />
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
            width="100px"
          />
        </div>
      </Grow>
      <div className={css(ut.mb2, mainStyle.main)}>
        <span className={css(mainStyle.label)}>Label Alignment</span>
        <ResetStyle propertyPath="--lbl-al" stateObjName="themeVars" />
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
          width="100px"
        />
      </div>
      <div className={css(ut.mb2, mainStyle.main)}>
        <span className={css(mainStyle.label)}>Subtitle Alignment</span>
        <ResetStyle propertyPath="--sub-titl-al" stateObjName="themeVars" />
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
          width="100px"
        />
      </div>
      <div className={css(ut.mb2, mainStyle.main)}>
        <span className={css(mainStyle.label)}>Helpertext Alignment</span>
        <ResetStyle propertyPath="--hlp-txt-al" stateObjName="themeVars" />
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
          width="100px"
        />
      </div>
    </div>
  )
}
const mainStyle = {
  main: { flx: 'center-between' },
  label: { fs: 12 },
}
