/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import buttonStyle_1_bitformDefault from '../1_bitformDefault/buttonStyle_1_bitformDefault'

/* eslint-disable camelcase */
export default function buttonStyle_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      buttonStyle_1_bitformDefault({ fk, breakpoint, colorScheme }),
      {
        [`.${fk}-btn`]: {
          transition: '',
        },
        [`.${fk}-btn:active`]: {
          transform: '',
        },
      },
    )
  }
  return {}
}
