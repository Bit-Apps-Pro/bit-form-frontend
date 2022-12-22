/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import dividerStyle_1_bitformDefault from '../1_bitformDefault/dividerStyle_1_bitformDefault'

export default function dividerStyle_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      dividerStyle_1_bitformDefault({ fk, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
