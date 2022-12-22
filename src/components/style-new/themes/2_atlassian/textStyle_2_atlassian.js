/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import textStyle_1_bitformDefault from '../1_bitformDefault/textStyle_1_bitformDefault'

export default function textStyle_2_atlassian({ fk, type, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      textStyle_1_bitformDefault({ fk, type, breakpoint, colorScheme }),
      {
        [`.${fk}-fld`]: {
          'background-color': 'red !important',
        },
      },
    )
  }
  return {}
}
