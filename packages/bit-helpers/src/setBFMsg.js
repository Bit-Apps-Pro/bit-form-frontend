export default function setBFMsg(msgObj) {
  let msgWrpr = bfSelect(`#bf-form-msg-wrp-${msgObj.contentId}`)

  msgWrpr.innerHTML = `<div class="form-msg deactive ${msgObj.type} scroll">${msgObj.msg}</div>`
  msgWrpr = bfSelect('.form-msg', msgWrpr)
  let duration = 5000
  if (msgObj.msgId) {
    msgWrpr = bfSelect(`.msg-content-${msgObj.msgId} .msg-content`, bfSelect(`#${msgObj.contentId}`))
    msgWrpr.innerHTML = msgObj.msg
    msgWrpr = bfSelect(`.msg-container-${msgObj.msgId}`, bfSelect(`#${msgObj.contentId}`))
    duration = msgObj.duration
  }
  if (msgWrpr) {
    msgWrpr.classList.replace('active', 'deactive')
  }
  if (msgWrpr.classList.contains('scroll')) {
    scrollToFld(msgWrpr)
  }
  if (!msgWrpr) { return }
  setTimeout(() => {
    msgWrpr.classList.replace('deactive', 'active')
  }, 100)
  if (duration) {
    setTimeout(() => {
      msgWrpr.classList.replace('active', 'deactive')
    }, duration)
  }
}
