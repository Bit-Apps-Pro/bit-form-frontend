/* eslint-disable object-curly-newline */
import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function ratingStyle_1_bitformDefault({ fk, type, direction, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    const rating_input_cls = `.${fk}.rating-input:not(:checked) ~ lbl:hover,.${fk}-rating-input:not(:checked) ~ label:hover ~ label img`

    const img = `.${fk}-rating-input:checked ~ label img`

    return {
      ...inputWrapperClasses(fk),

      [`.${fk}-inp-fld-wrp`]: {
        // position: 'relative',
        margin: 'var(--fld-m, 0)',
        height: 'var(--fld-h, auto)',
      },

      [`.${fk}-rating-input`]: {
        display: 'none',
      },

      [`.${fk}-rating-wrp`]: {
        float: 'left',
        // height: '200px',
      },
      [`.${fk}-rating-lbl`]: {
        float: 'right',
      },

      [rating_input_cls]: {
        filter: 'invert(66%) sepia(76%) saturate(1641%) hue-rotate(4deg) brightness(111%) contrast(102%)',
      },

      [img]: {
        filter: 'invert(66%) sepia(76%) saturate(1641%) hue-rotate(4deg) brightness(111%) contrast(102%)',
      },
    }
  }
  return {}
}
