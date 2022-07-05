import modalCssStyles from './modal_css_styles'
import snackbarCssStyles from './snackbar_css_styles'

export default function confirmMsgCssStyles(formID, msgType, position, animation, { width, background, borderWidth, borderType, borderColor, borderRadius, boxShadow, closeBackground, closeHover, closeIconColor, closeIconHover }) {
  if (msgType === 'modal') return modalCssStyles(formID, position, animation, width, background, borderWidth, borderType, borderColor, borderRadius, boxShadow, closeBackground, closeHover, closeIconColor, closeIconHover)
  if (msgType === 'snackbar') return snackbarCssStyles(formID, position, animation, width, background, borderWidth, borderType, borderColor, borderRadius, boxShadow, closeBackground, closeHover, closeIconColor, closeIconHover)
}
