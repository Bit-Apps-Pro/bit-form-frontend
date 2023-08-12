/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import ratingStyle_1_bitformDefault from '../1_bitformDefault/ratingStyle_1_bitformDefault'

/* eslint-disable camelcase */
export default function ratingStyle_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      ratingStyle_1_bitformDefault({ fk, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
