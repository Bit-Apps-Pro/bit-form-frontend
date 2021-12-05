export default function inputWrapperClasses(fk) {
  return {
    [`.${fk}-fld-wrp`]: {
      display: 'var(--fld-wrp-dis, block)',
      'flex-direction': 'var(--fld-wrp-fdir, row)',
      background: 'var(--fld-wrp-bg, transparent)',
      width: '100%',
      padding: 'var(--fld-wrp-p, 0)',
      margin: 'var(--fld-wrp-m, 0)',
      position: 'relative',
    },
    [`.${fk}-lbl-wrp`]: { width: 'var(--lbl-wrp-width, auto)', 'align-self': 'var(--lbl-wrp-sa, auto)', margin: 'var(--lbl-wrp-m, 0)', padding: 'var(--lbl-wrp-p, 0)' },
    [`.${fk}-lbl`]: { 'font-size': 'var(--fld-lbl-fs)', display: 'flex', 'align-items': 'center', 'text-align': 'var(--lbl-al, initial)', margin: 'var(--fld-lbl-m, 0)', padding: 'var(--fld-lbl-p, 0)' },
    [`.${fk}-sub-titl`]: { 'font-size': 'var(--sub-titl-fs)', display: 'flex', 'align-items': 'center', 'text-align': 'var(--sub-titl-al, initial)', padding: 'var(--sub-titl-p, 0)', margin: 'var(--sub-titl-m, 0)' },
    [`.${fk}-hlp-txt`]: { 'font-size': 'var(--hlp-txt-fs)', display: 'flex', 'align-items': 'center', 'text-align': 'var(--hlp-txt-al, init)', padding: 'var(--hlp-txt-p, 0)', margin: 'var(--hlp-txt-m, 0)' },
    [`.${fk}-inp-wrp`]: { width: 'var(--inp-wrp-width, auto)' },
    [`.${fk}-lbl-pre-i`]: {
      width: '15px',
      height: '15px',
    },
    [`.${fk}-sub-titl-icn`]: {
      width: '11px',
      height: '11px',
    },
    [`.${fk}-hlp-txt-icn`]: {
      width: '11px',
      height: '11px',
    },
  }
}
