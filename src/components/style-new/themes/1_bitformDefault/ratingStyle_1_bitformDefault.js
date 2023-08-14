/* eslint-disable object-curly-newline */
import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function ratingStyle_1_bitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      ...inputWrapperClasses(fk),

      [`.${fk}-inp-fld-wrp`]: {
        // position: 'relative',
        margin: 'var(--fld-m, 0)',
        height: '50px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'start',
        gap: '10px',
      },

      [`.${fk}-rating-msg`]: {
        // text color
        'font-size': 'var(--fld-fs) !important',
        color: 'var(--global-font-color) !important',
        'font-family': 'inherit',
      },

      [`.${fk}-rating-input`]: {
        display: 'none',
      },

      [`.${fk}-rating-wrp`]: {
        display: 'flex',
        // 'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'start',
      },

      [`.${fk}-rating-img`]: {
        width: '30px',
        height: '30px',
        margin: '5px',
        filter: 'invert(95%) sepia(12%) saturate(155%) hue-rotate(6deg) brightness(85%) contrast(84%);',
      },

      [`.${fk}-rating-img.${fk}-rating-hover`]: {
        filter: 'invert(73%) sepia(30%) saturate(3712%) hue-rotate(3deg) brightness(108%) contrast(96%)!important',
      },

      [`.${fk}-rating-img.${fk}-rating-selected`]: {
        filter: 'invert(73%) sepia(30%) saturate(3712%) hue-rotate(3deg) brightness(108%) contrast(96%)',
      },

      [`.${fk}-rating-img.${fk}-rating-scale`]: {
        transform: 'scale(1.2)',
        transition: '0.3s ease-in-out',
      },
    }
  }
  return {}
}
