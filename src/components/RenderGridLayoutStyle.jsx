/* eslint-disable camelcase */
import { useRecoilValue } from 'recoil'
import { $breakpoint, $layouts } from '../GlobalStates'

export default function RenderGridLayoutStyle() {
  const layouts = useRecoilValue($layouts)
  const breakpoint = useRecoilValue($breakpoint)

  const lay_row_height = 2

  const mdWidth = 600
  const smWidth = 400
  let lgStyles = ''
  let mdStyles = ''
  let smStyles = ''

  // for large screen
  for (let i = 0; i < layouts.lg.length; i += 1) {
    // for large screen
    const lgFld = layouts.lg[i]
    const lgClsName = lgFld.i

    const lg_g_r_s = lgFld.y + 1
    const lg_g_c_s = lgFld.x + 1
    const lg_g_r_e = lgFld.y !== 1 ? lgFld.h + (lgFld.y + 1) : 1
    const lg_g_c_e = (lgFld.x + 1) + lgFld.w
    const lg_g_r_span = lg_g_r_e - lg_g_r_s
    const lg_g_c_span = lg_g_c_e - lg_g_c_s
    const lg_min_height = `${lgFld.h * lay_row_height}px;`

    lgStyles += `.${lgClsName} { grid-area: ${lg_g_r_s} / ${lg_g_c_s} / ${lg_g_r_e} / ${lg_g_c_e} ; -ms-grid-row: ${lg_g_r_s}; -ms-grid-row-span: ${lg_g_r_span}; -ms-grid-column: ${lg_g_c_s}; -ms-grid-column-span: ${lg_g_c_span};  min-height: ${lg_min_height} }`

    // for medium screen
    const mdFld = layouts.md[i]
    const mdClsName = mdFld.i

    const md_g_r_s = mdFld.y + 1
    const md_g_c_s = mdFld.x + 1
    const md_g_r_e = mdFld.y !== 1 ? mdFld.h + (mdFld.y + 1) : 1
    const md_g_c_e = (mdFld.x + 1) + mdFld.w
    const md_g_r_span = md_g_r_e - md_g_r_s
    const md_g_c_span = md_g_c_e - md_g_c_s
    const md_min_height = `${mdFld.h * lay_row_height}px;`

    mdStyles += `.${mdClsName} { grid-area: ${md_g_r_s} / ${md_g_c_s} / ${md_g_r_e} / ${md_g_c_e} ; -ms-grid-row: ${md_g_r_s}; -ms-grid-row-span: ${md_g_r_span}; -ms-grid-column: ${md_g_c_s}; -ms-grid-column-span: ${md_g_c_span};  min-height: ${md_min_height} }`

    // for small screen
    const smFld = layouts.sm[i]
    const smClsName = smFld.i

    const sm_g_r_s = smFld.y + 1
    const sm_g_c_s = smFld.x + 1
    const sm_g_r_e = smFld.y !== 1 ? smFld.h + (smFld.y + 1) : 1
    const sm_g_c_e = (smFld.x + 1) + smFld.w
    const sm_g_r_span = sm_g_r_e - sm_g_r_s
    const sm_g_c_span = sm_g_c_e - sm_g_c_s
    const sm_min_height = `${smFld.h * lay_row_height}px;`

    smStyles += `.${smClsName} { grid-area: ${sm_g_r_s} / ${sm_g_c_s} / ${sm_g_r_e} / ${sm_g_c_e} ; -ms-grid-row: ${sm_g_r_s}; -ms-grid-row-span: ${sm_g_r_span}; -ms-grid-column: ${sm_g_c_s}; -ms-grid-column-span: ${sm_g_c_span};  min-height: ${sm_min_height} }`
  }

  let colRepeat = 60
  if (breakpoint === 'md') colRepeat = 40
  if (breakpoint === 'sm') colRepeat = 20

  const formStyle = `
  ._frm-g * {transition: transform 0s !important;}
  ._frm-g{
      display: grid;
      display: -ms-grid;
      grid-template-columns: repeat( ${colRepeat} , minmax( 1px , 1fr ));
      -ms-grid-columns: minmax( 1px , 1fr ) minmax( 1px , 1fr ) minmax( 1px , 1fr ) minmax( 1px , 1fr ) minmax( 1px , 1fr ) minmax( 1px , 1fr );
      }
      ${breakpoint === 'lg' ? lgStyles : ''}
      ${breakpoint === 'md' ? mdStyles : ''}
      ${breakpoint === 'sm' ? smStyles : ''}
      `
  return (
    <style>{formStyle}</style>
  )
}
