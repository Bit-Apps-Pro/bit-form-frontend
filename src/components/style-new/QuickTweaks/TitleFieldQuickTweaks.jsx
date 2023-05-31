/* eslint-disable no-param-reassign */
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom } from 'recoil'
import { $styles } from '../../../GlobalStates/StylesState'
import DirectionIcn from '../../../Icons/DirectionIcn'
import TxtAlignCntrIcn from '../../../Icons/TxtAlignCntrIcn'
import TxtAlignLeftIcn from '../../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../../Icons/TxtAlignRightIcn'
import style from '../../../styles/FieldSettingTitle.style'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../../Utils/FormBuilderHelper'
import StyleSegmentControl from '../../Utilities/StyleSegmentControl'
import ThemeStylePropertyBlock from '../ThemeStylePropertyBlock'

export default function TitleFieldQuickTweaks() {
  const { css } = useFela()
  const { element, fieldKey } = useParams()
  const [styles, setStyles] = useAtom($styles)
  const fldStyleObj = styles?.fields?.[fieldKey]
  const { classes } = fldStyleObj
  const wrpCLass = `.${fieldKey}-fld-wrp`
  const { 'align-items': position, 'flex-direction': flex } = classes[wrpCLass] || ''

  const flexDirectionHandle = (val, type) => {
    setStyles(preStyle => create(preStyle, drftStyle => {
      drftStyle.fields[fieldKey].classes[wrpCLass][type] = val
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'flex-direction', val, { styles: getLatestState('styles') }))
  }

  const positionHandle = (val, type) => {
    let justifyContent = 'left'
    if (val === 'center') justifyContent = 'center'
    else if (val === 'flex-end') justifyContent = 'right'

    setStyles(preStyle => create(preStyle, drftStyle => {
      drftStyle.fields[fieldKey].classes[wrpCLass][type] = val
      drftStyle.fields[fieldKey].classes[wrpCLass]['justify-content'] = justifyContent
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Alignment', val, { styles: getLatestState('styles') }))
  }

  return (
    <>
      <ThemeStylePropertyBlock label="Label Alignment">
        <StyleSegmentControl
          show={['icn']}
          tipPlace="bottom"
          className={css(style.segment)}
          options={[
            { icn: <TxtAlignLeftIcn size="17" />, label: 'flex-start', tip: 'Left' },
            { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
            { icn: <TxtAlignRightIcn size="17" />, label: 'flex-end', tip: 'Right' },
          ]}
          onChange={val => positionHandle(val, 'align-items')}
          defaultActive={position}
        />
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Layout Direction">
        <StyleSegmentControl
          show={['icn']}
          tipPlace="bottom"
          className={css(style.segment)}
          options={[
            { icn: <DirectionIcn size="17" dir="down" />, label: 'column', tip: 'Vertical' },
            { icn: <DirectionIcn size="17" dir="up" />, label: 'column-reverse', tip: 'Vertical  Reverse' },
            { icn: <DirectionIcn size="17" dir="right" />, label: 'row', tip: 'Horizontal' },
            { icn: <DirectionIcn size="17" dir="left" />, label: 'row-reverse', tip: 'Horizontal Reverse' },
          ]}
          onChange={val => flexDirectionHandle(val, 'flex-direction')}
          defaultActive={flex}
        />
      </ThemeStylePropertyBlock>
    </>
  )
}
