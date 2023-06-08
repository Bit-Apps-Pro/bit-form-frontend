export default function bitformInit(contentId = null) {
  if (typeof hidden_token_field !== 'undefined') hidden_token_field(contentId)
  if (typeof initAllCustomFlds !== 'undefined') initAllCustomFlds(contentId)
  if (typeof initAddOtherOpt !== 'undefined') initAddOtherOpt(contentId)
  if (typeof initCheckDisableOnMax !== 'undefined') initCheckDisableOnMax(contentId)
  if (typeof validate_focus !== 'undefined') validate_focus(contentId)
  if (typeof submit_form !== 'undefined') submit_form(contentId)
}

document.addEventListener('DOMContentLoaded', () => {
  bitformInit()
})
