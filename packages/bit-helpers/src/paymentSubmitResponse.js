export default function paymentSubmitResponse(reference, resp, contentId, formData) {
  return new Promise(resolve => {
    resp
      .then(
        (response) => new Promise((resolve2, reject) => {
          if (response.staus > 400) {
            const errorEvent = new CustomEvent('bf-form-submit-error', {
              detail: { formId: contentId, errors: result.data },
            })
            bfSelect(`#form-${contentId}`).dispatchEvent(errorEvent)
            response.staus === 500
              ? reject(new Error('Mayebe Internal Server Error'))
              : reject(response.json())
          } else resolve2(response.json())
        }),
      )
      .then((result) => {
        const successEvent = new CustomEvent('bf-form-submit-success', {
          detail: { formId: contentId, entryId: result.entryId, formData },
        })
        bfSelect(`#form-${contentId}`).dispatchEvent(successEvent)
        reference.responseData = result.data
        if (result !== undefined && result.success) {
          localStorage.setItem('bf-entry-id', result.data.entry_id)
          resolve(true)
          return
        }
        const errorEvent = new CustomEvent('bf-form-submit-error', {
          detail: { formId: contentId, errors: result.data },
        })
        bfSelect(`#form-${contentId}`).dispatchEvent(errorEvent)
        bfValidationErrMsg(result, contentId)
        resolve(false)
      })
      .catch((error) => {
        const err = error?.message ? error.message : 'Unknown Error'
        setBFMsg({
          contentId,
          msg: err,
          show: true,
          type: 'error',
          error: true,
        })
        resolve(false)
      })
  })
}
