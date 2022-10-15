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
      bitformId.value = `bitforms_${props.formId}`
      form.appendChild(bitformId)
    }

    const uri = new URL(props.ajaxURL)
    uri.searchParams.append('action', 'bitforms_nonce_expire_check')
    const body = { nonce: currentNonce.value, formId: props.formId }
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
            const honeyPotFld1 = document.createElement('input')
            honeyPotFld1.type = 'text'
            honeyPotFld1.name = 'b_h_t'
            honeyPotFld1.value = honeypotFldName
            honeyPotFld1.style.display = 'none'
            form.appendChild(honeyPotFld1)

            const honeyPotFld2 = document.createElement('input')
            honeyPotFld2.type = 'text'
            honeyPotFld2.name = honeypotFldName
            honeyPotFld2.value = ''
            honeyPotFld2.style.display = 'none'
            honeyPotFld2.required = true
            form.appendChild(honeyPotFld2)
          }
        }
      })
  }
}
