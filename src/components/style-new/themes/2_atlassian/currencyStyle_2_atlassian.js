/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import currencyStyle_1_BitformDefault from '../1_bitformDefault/currencyStyle_1_bitformDefault'

export default function currencyStyle_2_atlassian({ fk, direction, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      currencyStyle_1_BitformDefault({ fk, direction, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
