/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import htmlStyle_1_bitformDefault from '../1_bitformDefault/htmlStyle_1_bitformDefault'

export default function htmlStyle_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      htmlStyle_1_bitformDefault({ fk, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
