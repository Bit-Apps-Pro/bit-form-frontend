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
        visibility: 'hidden',
        opacity: 0,
        height: 0,
        width: 0,
      },

      [`.${fk}-rating-wrp`]: {
        display: 'flex',
        // 'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'start',
      },

      [`.${fk}-rating-lbl`]: {
        cursor: 'pointer',
      },

      [`.${fk}-rating-wrp:focus`]: {
        outline: 'none',
        'box-shadow': 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
        'border-radius': '5px',
      },

      [`.${fk}-rating-img`]: {
        width: '30px',
        height: '30px',
        // margin: '5px',
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
