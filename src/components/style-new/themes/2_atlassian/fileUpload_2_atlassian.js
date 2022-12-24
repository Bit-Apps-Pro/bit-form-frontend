/* eslint-disable camelcase */
import { mergeNestedObj } from '../../../../Utils/globalHelpers'
import fileUploadStyle_1_BitformDefault from '../1_bitformDefault/fileUpload_1_bitformDefault'

export default function fileUploadStyle_2_atlassian({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return mergeNestedObj(
      fileUploadStyle_1_BitformDefault({ fk, breakpoint, colorScheme }),
      {},
    )
  }
  return {}
}
