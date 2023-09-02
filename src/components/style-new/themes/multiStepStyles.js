export default function multiStepStyles({ formId, breakpoint, direction }) {
  const bgClr = 'var(--btn-bg)'
  const clr = 'var(--btn-c)'
  const bdrClr = 'var(--btn-bdr-clr)'
  const bdrStl = 'var(--btn-bdr)'
  const bdrWdth = 'var(--btn-bdr-width)'
  return {
    [`._frm-b${formId}-stp-cntnr`]: {
    },
    [`._frm-b${formId}-stp-hdr-wrpr`]: {
      display: 'flex',
      'justify-content': 'space-around',
      'align-items': 'center',
      background: 'yellow',
    },
    [`._frm-b${formId}-stp-wrpr`]: {
      display: 'grid',
      'border-style': 'dotted',
      'border-color': 'var(--global-fld-bdr-clr)',
      'border-radius': '4px',
      'border-width': '1px',
      padding: '3px',
    },
    [`._frm_b${formId}-stp-hdr`]: {
      border: 'none',
      'border-radius': '0px',
      'border-bottom': '1px solid var(--global-fld-bdr-clr)',
    },
    [`._frm_b${formId}-stp-hdr-cntnt`]: {
      display: 'flex',
      'flex-direction': 'column',
    },
    [`._frm_b${formId}-stp-hdr-titl-wrpr`]: {
      display: 'flex',
      'flex-direction': 'column',
    },
    [`._frm_b${formId}-stp-hdr-icn`]: {
      width: '20px',
      height: '20px',
      margin: '0px 5px 0px 0px',
    },
    [`._frm-b${formId}-stp-btn-cntnt`]: {
      display: 'flex',
      'justify-content': 'space-between',
      'align-items': 'center',
    },
    [`._frm-b${formId}-bf-next-btn`]: {
      'font-size': 'var(--btn-fs)!important',
      padding: 'var(--btn-p)!important',
      // 'background-color': 'var(--btn-bgc)',
      background: bgClr,
      color: clr,
      'font-weight': 'var(--btn-fw)',
      'border-style': bdrStl,
      'border-color': bdrClr,
      'border-width': bdrWdth,
      'border-radius': 'var(--btn-bdr-rad) !important',
      'box-shadow': 'var(--btn-sh)',
      cursor: 'pointer',
      'font-family': 'inherit',
      'font-style': 'var(--btn-f-style)',
      'line-height': '1',
      margin: 'var(--btn-m)',
      outline: 'none',
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      transition: 'background-color 0.2s, transform 0.2s',
    },
    [`._frm-b${formId}-bf-next-btn:hover`]: {
      'background-color': 'hsl(var(--gah), var(--gas), calc(var(--gal) - 5%)) !important',
    },
    [`._frm-b${formId}-bf-next-btn:active`]: {
      transform: 'scale(0.95)',
    },
    [`._frm-b${formId}-bf-next-btn:focus-visible`]: {
      outline: '2px solid var(--global-accent-color)',
      'outline-offset': '2px',
      transition: 'outline-offset 0.2s ease',
    },
    [`._frm-b${formId}-bf-next-btn:active:focus-visible`]: {
      'outline-offset': 0,
    },
    [`._frm-b${formId}-bf-next-btn:disabled`]: {
      cursor: 'not-allowed',
      'pointer-events': 'none',
      opacity: '0.5',
    },
    [`._frm-b${formId}-bf-next-btn-pre-i`]: {
      width: '20px',
      height: '20px',
      ...direction !== 'rtl' && { margin: '0px 5px 0px 0px' },
      ...direction === 'rtl' && { margin: '0px 0px 0px 5px' },
    },
    [`._frm-b${formId}-bf-next-btn-suf-i`]: {
      width: '20px',
      height: '20px',
      ...direction !== 'rtl' && { margin: '0px 0px 0px 5px' },
      ...direction === 'rtl' && { margin: '0px 5px 0px 0px' },
    },

    // Previous Button
    [`._frm-b${formId}-bf-prev-btn`]: {
      'font-size': 'var(--btn-fs)!important',
      padding: 'var(--btn-p)!important',
      // 'background-color': 'var(--btn-bgc)',
      background: bgClr,
      color: clr,
      'font-weight': 'var(--btn-fw)',
      'border-style': bdrStl,
      'border-color': bdrClr,
      'border-width': bdrWdth,
      'border-radius': 'var(--btn-bdr-rad) !important',
      'box-shadow': 'var(--btn-sh)',
      cursor: 'pointer',
      'font-family': 'inherit',
      'font-style': 'var(--btn-f-style)',
      'line-height': '1',
      margin: 'var(--btn-m)',
      outline: 'none',
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      transition: 'background-color 0.2s, transform 0.2s',
    },
    [`._frm-b${formId}-bf-prev-btn:hover`]: {
      'background-color': 'hsl(var(--gah), var(--gas), calc(var(--gal) - 5%)) !important',
    },
    [`._frm-b${formId}-bf-prev-btn:active`]: {
      transform: 'scale(0.95)',
    },
    [`._frm-b${formId}-bf-prev-btn:focus-visible`]: {
      outline: '2px solid var(--global-accent-color)',
      'outline-offset': '2px',
      transition: 'outline-offset 0.2s ease',
    },
    [`._frm-b${formId}-bf-prev-btn:active:focus-visible`]: {
      'outline-offset': 0,
    },
    [`._frm-b${formId}-bf-prev-btn:disabled`]: {
      cursor: 'not-allowed',
      'pointer-events': 'none',
      opacity: '0.5',
    },
    [`._frm-b${formId}-bf-prev-btn-pre-i`]: {
      width: '20px',
      height: '20px',
      ...direction !== 'rtl' && { margin: '0px 5px 0px 0px' },
      ...direction === 'rtl' && { margin: '0px 0px 0px 5px' },
    },
    [`._frm-b${formId}-bf-prev-btn-suf-i`]: {
      width: '20px',
      height: '20px',
      ...direction !== 'rtl' && { margin: '0px 0px 0px 5px' },
      ...direction === 'rtl' && { margin: '0px 5px 0px 0px' },
    },
  }
}
