/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import paypalStyle_1_BitformDefault from '../1_bitformDefault/paypalStyle_1_BitformDefault'

export default function paypalStyle_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      paypalStyle_1_BitformDefault({ fk, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
