/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import phoneNumberStyle_1_bitformDefault from '../1_bitformDefault/phoneNumberStyle_1_bitformDefault'

export default function phoneNumberStyle_2_atlassian({ fk, direction, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      phoneNumberStyle_1_bitformDefault({ fk, direction, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
