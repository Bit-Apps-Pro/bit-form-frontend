/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import decisionBoxStyle_1_bitformDefault from '../1_bitformDefault/decisionBoxStyle_1_bitformDefault'

export default function decisionBoxStyle_2_atlassian({ fk, direction, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      decisionBoxStyle_1_bitformDefault({ fk, direction, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
