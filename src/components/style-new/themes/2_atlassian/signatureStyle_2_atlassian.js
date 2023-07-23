/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import signatureStyle_1_bitformDefault from '../1_bitformDefault/signatureStyle_1_bitformDefault'

/* eslint-disable camelcase */
export default function signatureStyle_2_atlassian({
  fk, breakpoint, colorScheme, align, txtAlign, btnTyp, fulW,
}) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      signatureStyle_1_bitformDefault({
        fk, breakpoint, colorScheme, align, txtAlign, btnTyp, fulW,
      }),
      {
        [`.${fk}-clr-btn`]: {
          transition: '',
        },
        [`.${fk}-clr-btn:active`]: {
          transform: '',
        },
        [`.${fk}-undo-btn`]: {
          transition: '',
        },
        [`.${fk}-undo-btn:active`]: {
          transform: '',
        },
      },
    )
  }
  return {}
}
