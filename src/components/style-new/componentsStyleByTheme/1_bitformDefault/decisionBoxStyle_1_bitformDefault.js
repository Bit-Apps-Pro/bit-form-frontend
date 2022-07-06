import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function decisionBoxStyle_1_bitformDefault({ fk, direction }) {
  return {
    ...inputWrapperClasses(fk),

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
      'margin-top': '8px',
    },
    // checkbox wrapper
    [`.${fk}-cw`]: { margin: '0px 10px 0px 0px' },
    // checkbox label
    [`.${fk}-cl`]: {
      cursor: 'pointer',
      display: 'flex',
      'align-items': 'center',
      color: 'var(--global-font-color)',
      padding: '5px',
    },
    [`.${fk}-ct`]: { 'line-height': 'initial' },
    // checkbox input
    [`.${fk}-ci`]: {
      position: 'absolute',
      opacity: '0!important',
    },
    [`.${fk}-ci:checked ~ .${fk}-cl .${fk}-bx`]: {
      background: 'var(--global-accent-color)',
      'border-color': 'var(--global-accent-color)',
    },
    [`.${fk}-ci:focus ~ .${fk}-cl .${fk}-bx`]: { 'box-shadow': '0 0 0 3px hsla(var(--gah), var(--gas), var(--gal), 0.3)' },
    [`.${fk}-ci:focus-visible ~ .${fk}-cl .${fk}-bx`]: { 'box-shadow': '0 0 0 2px var(--global-fld-bg-color),0 0 0 4px var(--global-accent-color)' },
    [`.${fk}-ci:active ~ .${fk}-cl .${fk}-bx`]: { transform: 'scale(0.9)' },
    [`.${fk}-ci:disabled ~ .${fk}-cl`]: {
      opacity: 0.6,
      'pointer-events': 'none',
      cursor: 'not-allowed',
    },
    [`.${fk}-bx`]: {
      position: 'relative',
      height: '18px',
      width: '18px',
      border: 'solid hsl(0, 0%, 50%, 100)',
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
    [`.${fk}-ci:checked ~ .${fk}-cl .${fk}-ck-icn`]: { 'stroke-dashoffset': 0 },

  }
}
