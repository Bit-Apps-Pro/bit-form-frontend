/* eslint-disable camelcase */
import { useAtomValue } from 'jotai'
import { $breakpoint, $layouts, $nestedLayouts } from '../GlobalStates/GlobalStates'
import { cols } from '../Utils/FormBuilderHelper'
import { generateLayoutStyle } from '../Utils/atomicStyleGenarate'

export default function RenderGridLayoutStyle() {
  const layouts = useAtomValue($layouts)
  const nestedLayouts = useAtomValue($nestedLayouts)
  const breakpoint = useAtomValue($breakpoint)
  // const layoutRowHeight = 2

  let { lgLayoutStyleText, mdLayoutStyleText, smLayoutStyleText } = generateLayoutStyle(layouts)

  Object.values(nestedLayouts).forEach((lay) => {
    const { lgLayoutStyleText: nsLgStyleTxt, mdLayoutStyleText: nsMdStyleTxt, smLayoutStyleText: nsSmStyleTxt } = generateLayoutStyle(lay)
    lgLayoutStyleText += nsLgStyleTxt
    mdLayoutStyleText += nsMdStyleTxt
    smLayoutStyleText += nsSmStyleTxt
  })

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
