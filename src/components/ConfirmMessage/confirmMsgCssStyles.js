import belowOfFormCssStyles from './below_of_form_css_styles'
import modalCssStyles from './modal_css_styles'
import snackbarCssStyles from './snackbar_css_styles'

export default function confirmMsgCssStyles(formID, msgId, msgType, position, animation, { padding, width, background, color, borderWidth, borderType, borderColor, borderRadius, boxShadow, closeBackground, closeHover, closeIconColor, closeIconHover }) {
  if (msgType === 'modal') return modalCssStyles(formID, msgId, position, animation, padding, width, background, color, borderWidth, borderType, borderColor, borderRadius, boxShadow, closeBackground, closeHover, closeIconColor, closeIconHover)
  if (msgType === 'snackbar') return snackbarCssStyles(formID, msgId, position, animation, padding, width, background, color, borderWidth, borderType, borderColor, borderRadius, boxShadow, closeBackground, closeHover, closeIconColor, closeIconHover)
  if (msgType === 'below') return belowOfFormCssStyles(formID, msgId, position, animation, padding, width, background, color, borderWidth, borderType, borderColor, borderRadius, boxShadow, closeBackground, closeHover, closeIconColor, closeIconHover)
}
