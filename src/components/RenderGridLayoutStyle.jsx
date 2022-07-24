/* eslint-disable camelcase */
import { useRecoilValue } from 'recoil'
import { $breakpoint, $layouts } from '../GlobalStates/GlobalStates'
import { generateLayoutStyle } from '../Utils/atomicStyleGenarate'

export default function RenderGridLayoutStyle() {
  const layouts = useRecoilValue($layouts)
  const breakpoint = useRecoilValue($breakpoint)
  const lay_row_height = 2

  const { lgLayoutStyleText, mdLayoutStyleText, smLayoutStyleText } = generateLayoutStyle(layouts, lay_row_height)

  let colRepeat = 60
  if (breakpoint === 'md') colRepeat = 40
  if (breakpoint === 'sm') colRepeat = 20

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
