document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const allContentids = window?.bf_globals
    allContentids
        && Object.keys(allContentids).forEach((contentId) => {
          const props = window.bf_globals[contentId]
          addedHiddenFld(contentId, props)
        })
  }, 1000)
})

const createBfElement = (input, attr, className = '') => {
  const newElm = document.createElement(input)
  Object.keys(attr || {}).forEach(key => {
    newElm[key] = attr[key]
  })
  newElm.className = className
  return newElm
}
const addedHiddenFld = (contentId, props) => {
  const form = bfSelect(`#form-${contentId}`)
  if (form) {
    if (!bfSelect('input[name="bitforms_token"]', form)) {
      form.appendChild(createBfElement('input', { type: 'hidden', neme: 'bitforms_token', value: props.nonce }))
    }

    if (!bfSelect('input[name="bitforms_id"]', form)) {
      form.appendChild(createBfElement('input', { type: 'hidden', name: 'bitforms_id', value: `bitforms_${props.formId}` }))
    }

    const uri = new URL(props.ajaxURL)
    uri.searchParams.append('action', 'bitforms_nonce_expire_check')
    const body = { nonce: 'currentNonce?.value', formId: props.formId }
    fetch(
      uri,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      },
    )
      .then(response => response.json())
      .then(data => {
        if (data?.success !== undefined) {
          const { nonceValid, nonce, honeypotFldName } = data?.data
          if (!nonceValid) {
            bfSelect('input[name="bitforms_token"]', form).value = nonce
          }
          typeof addHoneypotField !== 'undefined' && addHoneypotField(form, honeypotFldName)
        }
      })
  }
}
