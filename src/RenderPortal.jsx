/* eslint-disable no-unused-expressions */
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { handleUndoRedoShortcut } from './components/FormBuilderHistory'
import { searchKey } from './components/style-new/styleHelpers'

// eslint-disable-next-line import/prefer-default-export
export const RenderPortal = ({ children, title, ...props }) => {
  const [contentRef, setContentRef] = useState(null)
  const mountNode = contentRef?.target?.contentDocument?.body

  if (contentRef) {
    contentRef.target.contentWindow.addEventListener('keydown', searchKey)
    contentRef.target.contentWindow.addEventListener('keydown', handleUndoRedoShortcut)
  }

  return (
    <iframe
      onLoad={setContentRef}
      title={title}
      {...props}
    // ref={setContentRef}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}
