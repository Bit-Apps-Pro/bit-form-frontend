/* eslint-disable object-curly-newline */
import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function imageSelectStyle_1_bitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      ...inputWrapperClasses(fk),

      [`.${fk}-ic`]: {
        display: 'grid',
        'grid-template-columns': 'repeat(4, 1fr)',
        'grid-gap': '2rem',
        'margin-top': '10px',
        width: '100%',
        height: '230px',
      },

      [`.${fk}-img-inp`]: {
        opacity: 0,
        position: 'absolute',
      },

      [`.${fk}-img-wrp`]: {
        position: 'absolute',
        border: '1px solid hsla(0, 0%, 87%, 100%)',
        'border-radius': '5px',
        overflow: 'hidden',
        'box-shadow': '0 0 10px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        transition: '0.2s',
      },

      [`.${fk}-img-card-wrp`]: {
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center',
        padding: '10px',
      },

      [`.${fk}-select-img`]: {
        width: '100%',
        height: '100%',
        'object-fit': 'cover',
        transition: '0.3s',
      },

      [`.${fk}-tc`]: {
        padding: '10px',
      },

      [`.${fk}-img-title`]: {
        'font-size': '1.5rem',
        'font-weight': 500,
        margin: '0.5rem 0',
        color: 'var(--global-font-color)',
      },

      [`.${fk}-check-box`]: {
        background: 'hsla(209, 100%, 50%, 100%)',
        'border-color': 'hsla(0, 0%, 100%, 100%)',
        'border-style': 'solid',
        'border-width': '2px',
        position: 'absolute',
        top: '10px',
        left: '10px',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',

        /* tick position top center half element */
        /* top: -15px,
    left: 50%,
    transform: translateX(-50%), */

        /* tick position top right */
        /* right: 10px,
    top: 10px, */

        /* tick position bottom left */
        /* bottom: 10px,
    left: 10px, */

        /* tick position bottom right */
        /* bottom: 10px,
    right: 10px, */

        /* tick position center */
        /* top: 50%,
    left: 50%,
    transform: translate(-50%, -50%), */

        /* tick position top center */
        /* top: 10px,
    left: 50%,
    transform: translateX(-50%), */

        /* tick position bottom center */
        /* bottom: 10px,
    left: 50%,
    transform: translateX(-50%), */
        'z-index': 1,
        width: '30px',
        height: '30px',
        'border-radius': '50%',
        opacity: 0,
        transition: 'transform 0.15s, opacity calc(0.15s * 1.2) linear, -webkit-transform 0.15s ease',
      },

      [`.${fk}-img-inp:hover~.${fk}-img-wrp`]: {
        outline: 'none',
        'box-shadow': '0 0 0 2px hsla(209, 100%, 50%, 100%)',
        transition: 'all 0.2s',
        'border-color': 'var(--global-accent-color)',
      },

      [`.${fk}-check-img`]: {
        width: '13px',
        height: '11px',
        transition: '0.15s ease',
        filter: 'invert(91%) sepia(0%) saturate(7500%) hue-rotate(343deg) brightness(112%) contrast(101%)',
      },

      [`.${fk}-img-inp:checked~.${fk}-img-wrp .${fk}-check-box`]: {
        opacity: 1,
      },

      [`.${fk}-img-inp:checked~.${fk}-img-wrp`]: {
        'box-shadow': '0 0 0 2px hsla(209, 100%, 50%, 51%)',
        'border-color': 'var(--global-accent-color)',
      },

      [`.${fk}-img-inp:focus~.${fk}-img-wrp`]: {
        // outline: 'none',
        'box-shadow': '0 0 0 2px hsla(209, 100%, 50%, 100%)',
        outline: '2px solid var(--global-accent-color)',
        'outline-offset': '2px',
        transition: 'outline-offset 0.2s ease',
      },

      [`.${fk}-img-inp:checked:focus~.${fk}-img-wrp`]: {
        outline: 'none',
        'box-shadow': '0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px hsla(223, 92%, 85%, 100%)',
      },

      [`.${fk}-inp-opt`]: {
        position: 'relative',
      },

    }
  }
  return {}
}
