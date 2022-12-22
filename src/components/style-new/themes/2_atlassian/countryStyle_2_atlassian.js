/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */

import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import countryStyle_1_BitformDefault from '../1_bitformDefault/countryStyle_1_bitformDefault'

export default function countryStyle_2_atlassian({ fk, direction, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      countryStyle_1_BitformDefault({ fk, direction, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
