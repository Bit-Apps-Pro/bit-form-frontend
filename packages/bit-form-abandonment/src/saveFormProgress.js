export default function saveFormProgress(formContentId) {
  const contentIds = formContentId ? [formContentId] : Object.keys(window?.bf_globals || {})
  contentIds.forEach(async (contentId) => {
    const formId = `form-${contentId}`
    const form = document.getElementById(formId)
    const props = window?.bf_globals?.[contentId]
    if (form) {
      const uri = new URL(props?.ajaxURL)
      const route = 'bitforms_save_partial_form_progress'
      uri.searchParams.append('action', route)
      if (props?.entryId) {
        uri.searchParams.append('_ajax_nonce', props.nonce || '')
        uri.searchParams.append('entryID', props.entryId)
        uri.searchParams.append('formID', props.formId)
      }
      const formData = new FormData(form)
      const formSaveResponse = await fetch(uri, {
        method: 'POST',
        body: formData,
        keepalive: true,
      })
      const data = await formSaveResponse.json()
      if (data?.success) {
        if ('user_id' in data?.data && !data?.data?.user_id) {
          // set local storage for partial form data by form id
          const partialFormData = data.data.fields
          partialFormData.entryId = data.data.entry_id
          localStorage.setItem(`bitform-partial-form-${props.formId}`, JSON.stringify(partialFormData))
        }
        setHiddenFld({ name: 'entryID', value: data.data.entry_id, type: 'number' }, form)
        bf_globals[contentId].entryId = data.data.entry_id
      }
    }
  })
}
