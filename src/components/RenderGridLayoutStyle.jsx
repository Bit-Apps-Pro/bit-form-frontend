/* eslint-disable camelcase */
import { useRecoilValue } from 'recoil'
import { $breakpoint, $layouts } from '../GlobalStates/GlobalStates'
import { generateLayoutStyle } from '../Utils/atomicStyleGenarate'
import { cols } from '../Utils/FormBuilderHelper'

export default function RenderGridLayoutStyle() {
  const layouts = useRecoilValue($layouts)
  const breakpoint = useRecoilValue($breakpoint)
  // const layoutRowHeight = 2

  const { lgLayoutStyleText, mdLayoutStyleText, smLayoutStyleText } = generateLayoutStyle(layouts)

  let colRepeat = cols.lg
  if (breakpoint === 'md') colRepeat = cols.md
  if (breakpoint === 'sm') colRepeat = cols.sm

  const formStyle = `
  ._frm-g{
      display: grid;
      grid-template-columns: repeat( ${colRepeat} , minmax( 1px , 1fr ));
      }
      ${breakpoint === 'lg' ? lgLayoutStyleText : ''}
      ${breakpoint === 'md' ? mdLayoutStyleText : ''}
      ${breakpoint === 'sm' ? smLayoutStyleText : ''}
      `
  return (
    <style>{formStyle}</style>
  )
}
