export default function multiStepStyles({ formId, breakpoint }) {
  return {
    [`._frm-b${formId}-step-wrapper`]: {
      display: 'grid',
      'border-style': 'dotted',
      'border-color': 'var(--global-fld-bdr-clr)',
      'border-radius': '4px',
      'border-width': '1px',
      padding: '3px',
    },
  }
}
