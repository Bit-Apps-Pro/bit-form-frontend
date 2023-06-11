const addedHiddenFld = (contentId, props) => {
  const form = bfSelect(`#form-${contentId}`)
  if (form) {
    const uri = new URL(props.ajaxURL)
    uri.searchParams.append('action', 'bitforms_onload_added_field')
    const body = { formId: props.formId }
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
          data?.data?.hidden_fields?.map(hdnFld => {
            setHiddenFld(hdnFld, form)
          })
        }
      })
  }
}

export default function setAllHiddenTokenFld(formContentId = null) {
  const contentIds = formContentId ? [formContentId] : Object.keys(window?.bf_globals || {})
  contentIds.forEach((contentId) => {
    const props = window.bf_globals[contentId]
    addedHiddenFld(contentId, props)
  })
}
