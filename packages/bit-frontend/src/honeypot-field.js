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
const addedHiddenFld = (contentId, props) => {
  const form = document.getElementById(`form-${contentId}`)
  if (form) {
    let currentNonce = form.querySelector('input[name="bitforms_token"]')
    let bitformId = form.querySelector('input[name="bitforms_id"]')
    if (!currentNonce) {
      currentNonce = document.createElement('input')
      currentNonce.type = 'hidden'
      currentNonce.name = 'bitforms_token'
      currentNonce.value = props.nonce
      form.appendChild(currentNonce)
    }

    if (!bitformId) {
      bitformId = document.createElement('input')
      bitformId.type = 'hidden'
      bitformId.name = 'bitforms_id'
      bitformId.value = `bitforms_${props.formID}`
      form.appendChild(bitformId)
    }

    const uri = new URL(props.ajaxURL)
    uri.searchParams.append('action', 'bitforms_nonce_expire_check')
    const body = { nonce: currentNonce.value, formId: props.formID }
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
            form.querySelector('input[name="bitforms_token"]').value = nonce
          }

          if (honeypotFldName) {
            const honepotFld = document.createElement('input')
            honepotFld.type = 'text'
            honepotFld.name = honeypotFldName
            honepotFld.value = ''
            form.appendChild(honepotFld)
          }
        }
      })
  }
}
