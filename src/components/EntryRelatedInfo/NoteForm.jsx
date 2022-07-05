import { useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import app from '../../styles/app.style'
import bitsFetch from '../../Utils/bitsFetch'
import { __ } from '../../Utils/i18nwrap'
import LoaderSm from '../Loaders/LoaderSm'
import TinyMCE from '../Utilities/TinyMCE'

export default function NoteForm({ formID, entryID, allLabels, showForm, setShowForm, setFetchData, data, setData }) {
  const editMode = Boolean(data.noteID)
  const { css } = useFela()
  const [isLoading, setIsLoading] = useState(false)
  const [noteTitle, setNoteTitle] = useState(data.title)
  const [noteContent, setNoteContent] = useState(data.content)

  const handleNoteTitle = val => {
    setNoteTitle(val)
  }

  const handleNoteContent = val => {
    setNoteContent(val)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!noteContent) {
      return
    }
    setIsLoading(true)

    if (editMode) {
      const queryParam = { noteID: data.noteID, formID, entryID, title: noteTitle, content: noteContent }
      bitsFetch({}, 'bitforms_form_entry_update_note', 'multipart/form-data', queryParam)
        .then(response => {
          if (response !== undefined && response.success) {
            toast.success(__('Note Updated Successfully'))
            cancelEditMode()
            setFetchData(true)
          }
          setIsLoading(false)
        })
    } else {
      const queryParam = { formID, entryID, title: noteTitle, content: noteContent }

      bitsFetch({}, 'bitforms_form_entry_create_note', 'multipart/form-data', queryParam)
        .then(response => {
          if (response !== undefined && response.success) {
            toast.success(__('Note Added Successfully'))
            cancelEditMode()
            setFetchData(true)
          }
          setIsLoading(false)
        })
    }
  }

  const cancelEditMode = () => {
    setShowForm(false)
    setData({ title: '', content: '' })
  }

  return (
    <div className="mt-2 w-7">
      <b>
        {editMode ? __('Edit Note ') : __('Create New Note ')}
        <button type="button" className={css(app.btn)} onClick={() => (editMode ? cancelEditMode() : setShowForm(false))} style={{ fontSize: 16 }}>x</button>
      </b>
      <br />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <form
        method="POST"
        onSubmit={handleSubmit}
        onKeyDown={e => {
          e.key === 'Enter'
            && e.target.tagName !== 'TEXTAREA'
            && e.preventDefault()
        }}
      >
        <input type="text" name="title" className="btcd-paper-inp mt-2" placeholder="Note Title" value={noteTitle} onChange={e => handleNoteTitle(e.target.value)} />
        <TinyMCE
          id="body-content"
          value={noteContent}
          onChangeHandler={handleNoteContent}
        />
        {editMode && (
          <button type="button" className={`${css(app.btn)} btn-md mr-2`} onClick={cancelEditMode}>
            {__('Cancel')}
          </button>
        )}
        <button type="submit" className={`${css(app.btn)} btn-md blue`} disabled={isLoading}>
          {editMode ? __('Edit') : __('Add')}
          {' '}
          {__('Note')}
          {isLoading && <LoaderSm size={20} clr="#fff" className="ml-2" />}
        </button>
      </form>
    </div>
  )
}
