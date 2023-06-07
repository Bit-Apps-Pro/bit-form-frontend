window.addEventListener('elementor/popup/show', (e) => {
  const elementorModal = bfSelect(`#elementor-popup-modal-${e.detail.id}`)
  const allForms = Array.from(elementorModal.querySelectorAll('form'))
  const bfForms = allForms.filter((form) => form.id?.startsWith('form-bitforms'))

  if (bfForms.length) {
    bfForms.forEach((form) => {
      const contentId = form.id.replace('form-', '')
      bitform_init(contentId)
    })
  }
})
