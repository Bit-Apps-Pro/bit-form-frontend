/* eslint-disable camelcase */
export default function checkboxNradioStyle_2_material({ fk, type, direction }) {
  return {
    // checkbox symbol
    [`.${fk}-cks`]: {
      position: 'absolute',
      width: 0,
      height: 0,
      'pointer-events': 'none',
      'user-select': 'none',
    },
    [`.${fk}-fld-wrp`]: {
      height: '100%',
      'text-align': 'start',
      width: '100%',
      padding: '10px',
    },
    [`.${fk}-lbl`]: {
      display: 'block',
      overflow: 'hidden',
      margin: 0,
      'font-weight': 500,
      'font-size': '16px',
      color: 'hsla(233, 40%, 28%, 100%) !important',
      'line-height': '1.4!important',
    },
    // checkbox container
    [`.${fk}-cc`]: {
      display: 'flex',
      'flex-wrap': 'wrap',
      'margin-top': '8px',
    },
    // checkbox wrapper
    [`.${fk}-cw`]: { 'margin-right': '10px' },
    // checkbox label
    [`.${fk}-cl`]: {
      cursor: 'pointer',
      display: 'flex',
      'align-items': 'center',
      color: 'var(--global-font-color)',
    },
    [`.${fk}-ct`]: { 'line-height': 'initial' },
    [`.${fk}-bx`]: {
      position: 'relative',
      height: '18px',
      width: '18px',
      border: '2px solid gray',
      display: 'inline-flex',
      ...direction === 'rtl' && { 'margin-left': '10px' },
      ...direction !== 'rtl' && { 'margin-right': '10px' },
      transition: 'all 0.2s',
      'justify-content': 'center',
      'align-items': 'center',
      'border-radius': type === 'check' ? '3px' : '50%',
    },
    [`.${fk}-bx::before`]: {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      'box-shadow': '0 0 0 0 transparent',
      'border-radius': '50%',
      transition: 'box-shadow 0.2s, background 0.2s',
    },
    [`.${fk}-bx:hover::before`]: {
      background: 'hsla(var(--gah), var(--gas), var(--gal), 0.2)',
      'box-shadow': '0 0 0 12px hsla(var(--gah), var(--gas), var(--gal), 0.2)',
    },
    [`.${fk}-ci:focus ~ label[data-cl] span[data-bx]::before`]: {
      background: 'hsla(var(--gah), var(--gas), var(--gal), 0.2)',
      'box-shadow': '0 0 0 12px hsla(var(--gah), var(--gas), var(--gal), 0.2)',
    },
    [`.${fk}-bx:active::before`]: {
      background: 'hsla(var(--gah), var(--gas), var(--gal), 0.2)',
      'box-shadow': '0 0 0 12px hsla(var(--gah), var(--gas), var(--gal), 0.3)',
    },
    // checkbox input
    [`.${fk}-ci`]: {
      position: 'absolute',
      opacity: '0!important',
    },
    [`.${fk}-ci:checked ~ label[data-cl] span[data-bx]`]: {
      background: 'var(--global-accent-color)',
      'border-color': 'var(--global-accent-color)',
    },
    // [`.${fk}-ci:focus ~ .${fk}-cl .${fk}-bx`]: { 'box-shadow': '0 0 0 3px hsla(var(--gah), var(--gas), var(--gal), 0.3)' },
    // [`.${fk}-ci:focus-visible ~ .${fk}-cl .${fk}-bx`]: { 'box-shadow': '0 0 0 2px var(--global-fld-bg-color),0 0 0 4px var(--global-accent-color)' },
    [`.${fk}-ci:active ~ label[data-cl] span[data-bx]`]: { transform: 'scale(0.9)' },
    [`.${fk}-ci:disabled ~ label[data-cl]`]: {
      opacity: 0.6,
      'pointer-events': 'none',
      cursor: 'not-allowed',
    },

    ...type === 'check' && {
      [`.${fk}-svgwrp`]: {
        height: '12px',
        width: '10px',
        filter: 'drop-shadow(0px 1.5px .5px hsl(var(--gah), var(--gas), 13%))',
      },
      [`.${fk}-ck-icn`]: {
        'stroke-dashoffset': '16px',
        transition: 'stroke-dashoffset 0.3s',
      },
      [`.${fk}-ck-svgline`]: {
        stroke: 'white',
        fill: 'none',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '3px',
        'stroke-dasharray': '16px',
      },
      [`.${fk}-ci:checked ~ label[data-cl] use[data-ck-icn]`]: { 'stroke-dashoffset': 0 },
    },

    ...type === 'radio' && {
      [`.${fk}-bx::after`]: {
        content: '""',
        position: 'absolute',
        'border-radius': '50%',
        // transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.59, 1.82)',
        transition: 'all 0.3s',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        background: 'var(--global-fld-bg-color)',
        'box-shadow': '0 1px 3px 0px hsl(var(--gah), var(--gas), 13%)',
        transform: 'translate(-50%, -50%)',
      },
      [`.${fk}-ci:checked ~ label[data-cl] span[data-bx]::after`]: {
        width: '60%',
        height: '60%',
      },
    },

  }
}
