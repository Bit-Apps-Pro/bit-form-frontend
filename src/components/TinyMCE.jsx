import { useEffect } from 'react'

export default function TinyMCE({ formFields, value, onChangeHandler, toolbarMnu }) {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.tinymce && tinymce.remove()
  }, [])

  useEffect(() => {
    timyMceInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFields])

  const timyMceInit = () => {
    if (typeof tinymce !== 'undefined' && (!formFields || formFields?.length > 0)) {
      const s = document.querySelectorAll('.form-fields-em')
      for (let i = 0; i < s.length; i += 1) {
        s[i].style.display = 'none'
      }
      // eslint-disable-next-line no-undef
      tinymce.init({
        selector: '#body-content',
        plugins: 'link hr lists wpview wpemoji',
        theme: 'modern',
        menubar: false,
        branding: false,
        resize: 'verticle',
        min_width: 300,
        toolbar: toolbarMnu || 'formatselect fontsizeselect bold italic | alignleft aligncenter alignright | outdent indent | link | undo redo | hr | addFormField ',
        default_link_target: '_blank',
        setup(editor) {
          editor.on('Paste Change input Undo Redo', () => {
            onChangeHandler(editor.getContent())
          })

          formFields && editor.addButton('addFormField', {
            text: 'Form Fields ',
            tooltip: 'Add Form Field Value in Message',
            type: 'menubutton',
            icon: false,
            menu: formFields?.map(i => !i.type.match(/^(file-up|recaptcha)$/) && ({ text: i.name, onClick() { editor.insertContent(`\${${i.key}}`) } })),
          })
        },
      })
    }
  }

  return (
    <textarea
      id="body-content"
      className="btcd-paper-inp mt-1"
      rows="5"
      value={value}
      onChange={onChangeHandler}
    />
  )
}
