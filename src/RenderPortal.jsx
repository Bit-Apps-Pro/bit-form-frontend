/* eslint-disable no-unused-expressions */
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { searchKey } from './components/style-new/styleHelpers'

// eslint-disable-next-line import/prefer-default-export
export const RenderPortal = ({ children, title, ...props }) => {
  const [contentRef, setContentRef] = useState(null)
  const mountNode = contentRef?.contentWindow?.document?.body

  contentRef && contentRef.contentWindow.addEventListener('keydown', searchKey)
  return (
    <iframe title={title} {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}
