/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useSetRecoilState } from 'recoil'
import { $builderHookStates, $styles } from '../../GlobalStates'

export default function LabelControlMenu() {
  const setStyles = useSetRecoilState($styles)
  const setBuilderHookStates = useSetRecoilState($builderHookStates)
  const handleLabelPosition = ({ target: { name } }) => {
    switch (name) {
      case 'top':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--fw-dis'] = ''
          drftStyle.themeVars['--lw-width'] = ''
          drftStyle.themeVars['--iw-width'] = ''
          drftStyle.themeVars['--lw-sa'] = ''
        }))
        setBuilderHookStates(prv => ({ ...prv, reCalculateFieldHeights: prv.reCalculateFieldHeights + 1 }))
        break
      case 'inline':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--fw-dis'] = 'flex'
          drftStyle.themeVars['--lw-width'] ||= '40%'
          drftStyle.themeVars['--fw-fdir'] = ''
          drftStyle.themeVars['--iw-width'] = '100%'
        }))
        setBuilderHookStates(prv => ({ ...prv, reCalculateFieldHeights: prv.reCalculateFieldHeights + 1 }))
        break
      case 'inline-rev':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--fw-dis'] = 'flex'
          drftStyle.themeVars['--fw-fdir'] = 'row-reverse'
          drftStyle.themeVars['--lw-width'] ||= '40%'
          drftStyle.themeVars['--iw-width'] = '100%'
        }))
        setBuilderHookStates(prv => ({ ...prv, reCalculateFieldHeights: prv.reCalculateFieldHeights + 1 }))
        break
      default:
        break
    }
  }

  const setLabelVerticalPos = ({ target: { name } }) => {
    switch (name) {
      case 'top':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--lw-sa'] = ''
        }))
        break
      case 'middle':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--lw-sa'] = 'center'
        }))
        break
      case 'bottom':
        setStyles(prvStyle => produce(prvStyle, drftStyle => {
          drftStyle.themeVars['--lw-sa'] = 'end'
        }))
        break
      default:
        break
    }
  }

  return (
    <div>
      Label Postion
      <button onClick={handleLabelPosition} name="top">T</button>
      <button onClick={handleLabelPosition} name="inline">I</button>
      <button onClick={handleLabelPosition} name="inline-rev">I</button>
      <br />
      Label Postion vertical
      <button onClick={setLabelVerticalPos} name="top">T</button>
      <button onClick={setLabelVerticalPos} name="middle">I</button>
      <button onClick={setLabelVerticalPos} name="bottom">I</button>
      <br />

      Label Alignment
      <button name="left">L</button>
      <button name="center">C</button>
      <button name="right">R</button>

      <br />
      Subtitle Alignment
      <button name="left">L</button>
      <button name="center">C</button>
      <button name="right">R</button>

      <br />
      helpertext Alignment
      <button name="left">L</button>
      <button name="center">C</button>
      <button name="right">R</button>
    </div>
  )
}
