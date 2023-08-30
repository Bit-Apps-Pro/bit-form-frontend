/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import imageSelectStyle_1_bitformDefault from '../1_bitformDefault/imageSelectStyle_1_bitformDefault'

/* eslint-disable camelcase */
export default function imageSelectStyle_2_atlassian({ fk, type, direction, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      imageSelectStyle_1_bitformDefault({ fk, type, direction, breakpoint, colorScheme }),
      {
        [`.${fk}-check-box`]: {
          background: 'var(--global-accent-color)',
          'border-style': 'var(--global-fld-bdr) !important',
          'border-color': 'hsla(var(--gfh), var(--gfs), var(--gfl), 0.3)',
          'border-width': '3px',
          position: 'absolute',
          top: '10px',
          left: '10px',
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',

          'z-index': 1,
          width: '30px',
          height: '30px',
          'border-radius': '50%',
          opacity: '0%',
          transition: 'opacity calc(0.15s * 1.2) linear',
        },

        [`.${fk}-img-inp:hover~.${fk}-img-wrp .${fk}-img-card-wrp`]: {
          outline: 'none',
          'box-shadow': '0 0 0 2px hsla(209, 100%, 50%, 100%)',
          transition: 'all 0.2s',
          'border-color': 'hsla(var(--gfh), var(--gfs), var(--gfl), 0.4)',
        },

        // [`.${fk}-img-inp:focus~.${fk}-img-wrp .${fk}-img-card-wrp`]: {
        //   'box-shadow': '',
        //   outline: '2px solid var(--global-accent-color)',
        //   'outline-offset': '2px',
        //   transition: 'outline-offset 0.2s ease',
        // },
        [`.${fk}-img-card-wrp`]: {
          'border-radius': '3px',
        },

        [`.${fk}-select-img`]: {
          'border-radius': '4px',
        },

      },
    )
  }
  return {}
}
