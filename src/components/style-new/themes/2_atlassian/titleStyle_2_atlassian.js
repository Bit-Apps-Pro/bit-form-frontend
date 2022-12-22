/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import titleStyle_1_bitformDefault from '../1_bitformDefault/titleStyle_1_bitformDefault'

export default function titleStyle_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      titleStyle_1_bitformDefault({ fk, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
