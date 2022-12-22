/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import checkboxNradioStyle_1_bitformDefault from '../1_bitformDefault/checkboxNradioStyle_1_bitformDefault'

/* eslint-disable camelcase */
export default function checkboxNradioStyle_2_atlassian({ fk, type, direction, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      checkboxNradioStyle_1_bitformDefault({ fk, type, direction, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
