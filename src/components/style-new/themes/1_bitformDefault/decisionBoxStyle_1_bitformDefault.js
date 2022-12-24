import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function decisionBoxStyle_1_bitformDefault({ fk, direction, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      [`.${fk}-fld-wrp`]: { ...inputWrapperClasses(fk)[`.${fk}-fld-wrp`] },
      [`.${fk}-inp-wrp`]: { ...inputWrapperClasses(fk)[`.${fk}-inp-wrp`] },
      [`.${fk}-err-msg`]: { ...inputWrapperClasses(fk)[`.${fk}-err-msg`] },

      // checkbox symbol
      [`.${fk}-cks`]: {
        position: 'absolute',
        width: 0,
        height: 0,
        'pointer-events': 'none',
        'user-select': 'none',
      },
      // checkbox container
      [`.${fk}-cc`]: {
        display: 'flex',
        'flex-wrap': 'wrap',
      },
      // checkbox wrapper
      [`.${fk}-cw`]: { margin: '0px 10px 0px 0px' },
      // checkbox label
      [`.${fk}-cl`]: {
        cursor: 'pointer',
        display: 'flex',
        'align-items': 'center',
        color: 'var(--global-font-color)',
        padding: '3px',
      },
      [`.${fk}-ct`]: { 'line-height': 'initial' },
      // checkbox input
      [`.${fk}-ci`]: {
        position: 'absolute',
        opacity: '0 !important',
      },
      [`.${fk}-ci:checked ~ [data-cl] [data-bx]`]: {
        background: 'var(--global-accent-color)',
        'border-color': 'var(--global-accent-color)',
      },
      [`.${fk}-ci:focus ~ [data-cl] [data-bx]`]: { 'box-shadow': '0 0 0 3px hsla(var(--gah), var(--gas), var(--gal), 0.3)' },
      [`.${fk}-ci:focus-visible ~ [data-cl] [data-bx]`]: { 'box-shadow': '0 0 0 2px var(--global-fld-bg-color),0 0 0 4px var(--global-accent-color)' },
      [`.${fk}-ci:active ~ [data-cl] [data-bx]`]: { transform: 'scale(0.9)' },
      [`.${fk}-ci:disabled ~ [data-cl]`]: {
        opacity: 0.6,
        'pointer-events': 'none',
        cursor: 'not-allowed',
      },
      [`.${fk}-bx`]: {
        position: 'relative',
        height: '18px',
        width: '18px',
        border: 'solid var(--global-font-color)',
        'border-width': '2px',
        display: 'inline-flex',
        ...direction === 'rtl' && { 'margin-left': '10px' },
        ...direction !== 'rtl' && { 'margin-right': '10px' },
        transition: 'all 0.2s',
        'justify-content': 'center',
        'align-items': 'center',
      },
      [`.${fk}-ck`]: { 'border-radius': '5px' },
      [`.${fk}-svgwrp`]: {
        height: '12px',
        width: '10px',
        filter: 'drop-shadow(0px 1px 1px hsl(var(--gah), var(--gas), 13%))',
      },
      [`.${fk}-ck-icn`]: { 'stroke-dashoffset': '16px' },
      [`.${fk}-ck-svgline`]: {
        stroke: 'white',
        fill: 'none',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2px',
        'stroke-dasharray': '16px',
      },
      [`.${fk}-ci:checked ~ [data-cl] [data-ck-icn]`]: { 'stroke-dashoffset': 0 },

    }
  }
  return {}
}
