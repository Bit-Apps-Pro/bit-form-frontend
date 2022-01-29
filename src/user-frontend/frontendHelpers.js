import validateForm from './validation'

// eslint-disable-next-line import/prefer-default-export
export async function isFormValidatedWithoutError(formContentId, handleFormValidationErrorMessages) {
  if (!validateForm({ form: formContentId })) {
    return new Promise((_, reject) => {
      reject(new Error('Form is not valid'))
    })
  }
  const formData = new FormData(document.getElementById(`form-${formContentId}`))

  const { bitFormsFront, grecaptcha } = window
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
  if (!data.success) {
    handleFormValidationErrorMessages(data)
    return new Promise((_, reject) => {
      reject(new Error('Form is not valid'))
    })
  }

  return new Promise((resolve) => {
    resolve(true)
  })
}
