/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import selectStyle_1_BitformDefault from '../1_bitformDefault/selectStyle_1_bitformDefault'

export default function selectStyle_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      selectStyle_1_BitformDefault({ fk, breakpoint, colorScheme }),
      {
        [`.${fk}-fld:focus`]: {
          'box-shadow': '',
        },
      },
    )
  }
  return {}
}
