export default async function isFormValidatedWithoutError(formContentId, handleFormValidationErrorMessages) {
  if (typeof validateForm !== 'undefined' && !validateForm({ form: formContentId })) {
    return new Promise((_, reject) => {
      reject(new Error('Form is not valid'))
    })
  }
  const formParent = document.getElementById(formContentId)
  formParent.classList.add('pos-rel', 'form-loading')
  const formData = new FormData(document.getElementById(`form-${formContentId}`))

  const bitFormsFront = window.bf_globals[formContentId]
  const { grecaptcha } = window
  if (bitFormsFront?.gRecaptchaVersion === 'v3' && bitFormsFront?.gRecaptchaSiteKey) {
    const token = await grecaptcha.execute(bitFormsFront?.gRecaptchaSiteKey, { action: 'submit' })
    formData.append('g-recaptcha-response', token)
  }
  const uri = new URL(bitFormsFront.ajaxURL)
  uri.searchParams.append('action', 'bitforms_before_submit_validate')
  const res = await fetch(
    uri,
    {
      method: 'POST',
      body: formData,
    },
  )
  const data = await res.json()

  formParent.classList.remove('pos-rel', 'form-loading')

  if (!data.success) {
    handleFormValidationErrorMessages(data, formContentId)
    return new Promise((_, reject) => {
      reject(new Error('Form is not valid'))
    })
  }
  return new Promise((resolve) => {
    resolve(true)
  })
}
