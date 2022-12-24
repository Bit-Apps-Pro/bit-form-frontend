/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import advancedFileUp_1_bitformDefault from '../1_bitformDefault/advancedFileUp_1_bitformDefault'

/* eslint-disable camelcase */
export default function advancedFileUp_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      advancedFileUp_1_bitformDefault({ fk, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
