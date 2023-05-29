/* eslint-disable camelcase */
import inputWrapperClasses_0_noStyle from '../common/inputWrapperClasses_0_noStyle'

export default function stripeStyle_0_noStyle({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      [`.${fk}-fld-wrp`]: {
        ...inputWrapperClasses_0_noStyle(fk)[`.${fk}-fld-wrp`],
        display: 'flex',
      },

      [`.${fk}-inp-wrp`]: {
        ...inputWrapperClasses_0_noStyle(fk)[`.${fk}-inp-wrp`],
      },

      [`.${fk}-stripe-btn`]: {
        'font-family': 'inherit',
        'justify-content': 'center',
        'align-items': 'center',
      },

      [`.${fk}-stripe-btn:hover`]: {},

      [`.${fk}-stripe-btn:active`]: {},

      [`.${fk}-stripe-btn:focus-visible`]: {},

      [`.${fk}-stripe-btn:active:focus-visible`]: {},

      [`.${fk}-stripe-icn`]: {
        height: '18px',
        width: '18px',
      },
      [`.${fk}-stripe-fld`]: {
        margin: '10px 0px',
      },
      [`.${fk}-stripe-fld .strip-pay-btn`]: {
        width: '100%',
        'font-size': 'var(--btn-fs)!important',
        padding: '10px !important',
        // 'background-color': 'var(--btn-bgc)',
        background: 'var(--btn-bg)',
        color: 'var(--btn-c)',
        'font-weight': 'var(--btn-fw)',
        'border-style': 'var(--btn-bdr)',
        'border-color': 'var(--btn-bdr-clr)',
        'border-width': 'var(--btn-bdr-width)',
        'border-radius': '20px !important',
        'box-shadow': 'var(--btn-sh)',
        cursor: 'pointer',
        'font-family': 'inherit',
        'font-style': 'var(--btn-f-style)',
        'line-height': '1',
        'margin-top': '15px',
        outline: 'none',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        transition: 'background-color 0.2s, transform 0.2s',
      },
      [`.${fk}-stripe-fld .strip-pay-btn:hover`]: {
        'background-color': 'hsl(var(--gah), var(--gas), calc(var(--gal) - 5%)) !important',
      },
      [`.${fk}-stripe-fld .strip-pay-btn:active`]: {
        transform: 'scale(0.95)',
      },
      [`.${fk}-stripe-fld .strip-pay-btn:focus-visible`]: {
        outline: '2px solid var(--global-accent-color)',
        'outline-offset': '2px',
        transition: 'outline-offset 0.2s ease',
      },
      [`.${fk}-stripe-fld .strip-pay-btn:active:focus-visible`]: {
        'outline-offset': 0,
      },
    }
  }
  return {}
}
