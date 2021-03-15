import { useEffect, useRef, useState } from 'react'
import { __ } from '../../Utils/i18nwrap'
import bitsFetch from '../../Utils/bitsFetch'
import LoaderSm from '../Loaders/LoaderSm'

export default function NoteForm({ formID, entryID, allLabels, showForm, setShowForm, setSnackbar, setFetchData, data, setData }) {
  const editMode = Boolean(data.noteID)
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef(null)
  const [noteTitle, setNoteTitle] = useState(data.title)
  const [noteContent, setNoteContent] = useState(data.content)

  const timyMceInit = () => {
    if (typeof tinymce !== 'undefined' && allLabels.length > 0) {
      // eslint-disable-next-line no-undef
      tinymce.init({
        selector: '#body-content',
        plugins: 'link hr lists wpview wpemoji',
        theme: 'modern',
        menubar: false,
        branding: false,
        resize: 'verticle',
        min_width: 300,
        toolbar: 'formatselect bold italic | alignleft aligncenter alignright | outdent indent | link | undo redo | hr | addFormField | toggleCode',
        setup(editor) {
          editor.on('Paste Change input Undo Redo', () => {
            handleNoteContent(editor.getContent())
          })

          editor.addButton('addFormField', {
            text: __('Form Fields ', 'bitform'),
            tooltip: __('Add Form Field Value in Message', 'bitform'),
            type: 'menubutton',
            icon: false,
            menu: allLabels.map(i => !i.type.match(/^(file-up|recaptcha)$/) && ({ text: i.adminLbl, onClick() { editor.insertContent(`\${${i.key}}`) } })),
          })

          editor.addButton('toogleCode', {
            text: '</>',
            tooltip: __('Toggle preview', 'bitform'),
            icon: false,
            onclick(e) {
              // eslint-disable-next-line no-undef
              const $ = tinymce.dom.DomQuery
              const myTextarea = $('textarea')
              const myIframe = $(editor.iframeElement)
              myTextarea.value = editor.getContent({
                source_view: true,
              });
              myIframe.toggleClass('hidden')
              myTextarea.toggleClass('visible')
              if ($('iframe.hidden').length > 0) {
                myTextarea.prependTo('.mce-edit-area')
              } else {
                myIframe.value = myTextarea.value
                myTextarea.appendTo('body')
              }
            },
          })
        },
      })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.tinymce && tinymce.remove()
  }, [])

  useEffect(() => {
    timyMceInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLabels, showForm])

  const handleNoteTitle = val => {
    setNoteTitle(val)
  }

  const handleNoteContent = val => {
    setNoteContent(val)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!noteContent) {
      // eslint-disable-next-line no-undef
      tinymce.get('body-content').focus()
      return
    }
    setIsLoading(true)

    const formData = new FormData(formRef.current)

    if (editMode) {
      const queryParam = { noteID: data.noteID, formID, entryID }
      bitsFetch(formData, 'bitforms_form_entry_update_note', 'multipart/form-data', queryParam)
        .then(response => {
          if (response !== undefined && response.success) {
            setSnackbar({ show: true, msg: __('Note Updated Successfully', 'bitform') })
            cancelEditMode()
            setFetchData(true)
          }
          setIsLoading(false)
        })
    } else {
      const queryParam = { formID, entryID }

      bitsFetch(formData, 'bitforms_form_entry_create_note', 'multipart/form-data', queryParam)
        .then(response => {
          if (response !== undefined && response.success) {
            setSnackbar({ show: true, msg: __('Note Added Successfully', 'bitform') })
            setNoteTitle('')
            // eslint-disable-next-line no-undef
            tinymce.get('body-content').setContent('')
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
        {editMode ? __('Edit Note ', 'bitform') : __('Create New Note ', 'bitform')}
        <button type="button" className="btn" onClick={() => (editMode ? cancelEditMode() : setShowForm(false))} style={{ fontSize: 16 }}>x</button>
      </b>
      <br />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <form
        ref={formRef}
        method="POST"
        onSubmit={handleSubmit}
        onKeyDown={e => {
          e.key === 'Enter'
            && e.target.tagName !== 'TEXTAREA'
            && e.preventDefault()
        }}
      >
        <input type="text" name="title" className="btcd-paper-inp mt-2" placeholder="Note Title" value={noteTitle} onChange={e => handleNoteTitle(e.target.value)} />
        <textarea rows="5" name="content" id="body-content" className="btcd-paper-inp mt-2" placeholder="Note Content" defaultValue={noteContent} />
        {editMode && (
          <button type="button" className="btn btn-md mr-2" onClick={cancelEditMode}>
            {__('Cancel', 'bitform')}
          </button>
        )}
        <button type="submit" className="btn btn-md blue" disabled={isLoading}>
          {editMode ? __('Edit', 'bitform') : __('Add', 'bitform')}
          {' '}
          {__('Note', 'bitform')}
          {isLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
        </button>
      </form>
    </div>
  )
}
