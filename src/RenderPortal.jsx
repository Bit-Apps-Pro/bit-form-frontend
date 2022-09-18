/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { handleUndoRedoShortcut } from './components/FormBuilderHistory'
import { searchKey } from './components/style-new/styleHelpers'
import { isFirefox } from './Utils/Helpers'

// eslint-disable-next-line import/prefer-default-export
export const RenderPortal = ({ children, title, ...props }) => {
  const [contentRef, setContentRef] = useState(null)
  const mountNode = contentRef?.contentWindow?.document?.body

  if (contentRef) {
    contentRef.contentWindow.addEventListener('keydown', searchKey)
    contentRef.contentWindow.addEventListener('keydown', handleUndoRedoShortcut)
  }

  return (
    <iframe
      title={title}
      {...props}
      {...isFirefox() && { onLoad: e => setContentRef(e.target) }}
      {...!isFirefox() && { ref: setContentRef }}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}
