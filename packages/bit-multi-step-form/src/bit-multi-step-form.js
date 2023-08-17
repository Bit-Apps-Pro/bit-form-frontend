import BitMultiStepForm from './class-multi-step-form'

export default function initMultiStepForm(formContentId = null) {
  const contentIds = formContentId ? [formContentId] : Object.keys(window?.bf_globals || {})
  contentIds.forEach(contentId => {
    const props = window.bf_globals[contentId]
    if (props.multiStepForm) {
      const { formId } = props
      const form = bfSelect(`#form-${contentId}`)
      const container = bfSelect(`._frm-b${formId}-step-container`, form)
      props.inits.multi_step_form = new BitMultiStepForm(container, { contentId })
    }
  })
}
