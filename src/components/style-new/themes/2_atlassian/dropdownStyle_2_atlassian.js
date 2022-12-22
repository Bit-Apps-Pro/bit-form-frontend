/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import dropdownStyle_1_BitformDefault from '../1_bitformDefault/dropdownStyle_1_bitformDefault'

export default function dropdownStyle_2_atlassian({ fk, direction, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      dropdownStyle_1_BitformDefault({ fk, direction, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
