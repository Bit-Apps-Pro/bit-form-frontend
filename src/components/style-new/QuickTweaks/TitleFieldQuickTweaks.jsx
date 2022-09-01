/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $styles } from '../../../GlobalStates/StylesState'
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
  const [styles, setStyles] = useRecoilState($styles)
  const fldStyleObj = styles?.fields?.[fieldKey]
  const { classes } = fldStyleObj
  const wrpCLass = `.${fieldKey}-fld-wrp`
  const { 'align-items': position, 'flex-direction': flex } = classes[wrpCLass] || ''

  const flexDirectionHandle = (val, type) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fieldKey].classes[wrpCLass][type] = val
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'flex-direction', val, { styles: getLatestState('styles') }))
  }

  const positionHandle = (val, type) => {
    let justifyContent = 'left'
    if (val === 'center') justifyContent = 'center'
    else if (val === 'flex-end') justifyContent = 'right'

    setStyles(preStyle => produce(preStyle, drftStyle => {
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
      <ThemeStylePropertyBlock label="Flex Direction">
        <StyleSegmentControl
          show={['icn']}
          tipPlace="bottom"
          className={css(style.segment)}
          options={[
            { icn: <TxtAlignLeftIcn size="17" />, label: 'column', tip: 'Vertical' },
            { icn: <TxtAlignCntrIcn size="17" />, label: 'column-reverse', tip: 'Vertical  Reverse' },
            { icn: <TxtAlignRightIcn size="17" />, label: 'row', tip: 'Horizontal' },
            { icn: <TxtAlignRightIcn size="17" />, label: 'row-reverse', tip: 'Horizontal Reverse' },
          ]}
          onChange={val => flexDirectionHandle(val, 'flex-direction')}
          defaultActive={flex}
        />
      </ThemeStylePropertyBlock>
    </>
  )
}
