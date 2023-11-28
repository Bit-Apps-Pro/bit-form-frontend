/* eslint-disable object-shorthand */

/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import { SmartTagField } from '../../Utils/StaticData/SmartTagField'
import { filterFieldTypesForTinyMce } from '../../Utils/StaticData/allStaticArrays'
import { loadScript } from '../../Utils/globalHelpers'
import '../../resource/css/tinymce.css'

export default function TinyMCE({
  id,
  value,
  formFields,
  smartTags = true,
  onChangeHandler,
  toolbarMnu,
  menubar,
  height,
  width,
  disabled,
  plugins
}: TinyMCEProps) {
  const editorId = `${id}-settings`
  const CDN_SOURCE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.11'
  const [isLoaded, setIsLoaded] = useState(typeof window.tinymce !== 'undefined')
  const editorLoadedFromCDN = isLoaded && window.tinymce.baseURI.source === CDN_SOURCE_URL
  const loadTinyMceScript = async () => {
    const res = await loadScript({
      src: CDN_SOURCE_URL + '/tinymce.min.js',
      integrity: 'sha256-SnRzknLClR3GaNw9oN4offMGFiPbXQTP7q0yFLPPwgY=',
      id: 'tinymceCDN'
    })
    if (!res) {
      console.warn('Is your internet working properly to load script?')
    }
    const tinyIntervalId = setInterval(() => {
      if (typeof window.tinymce !== 'undefined') {
        clearInterval(tinyIntervalId)
        setIsLoaded(true)
      }
    }, 100)
  }

  useEffect(() => {
    if (!isLoaded) loadTinyMceScript()
    timyMceInit()
    return () => {
      const activeEditor = window.tinymce?.get(editorId) || null
      if (activeEditor) activeEditor.remove()
    }
  }, [isLoaded])

  const insertFieldKey = (fld: FieldType) => {
    if (fld.type === 'signature') {
      return `<img width="250" src="\${${fld.key}}" alt="${fld.key}" />`
    }
    return `\${${fld.key}}`
  }

  const timyMceInit = () => {
    if (window && window.tinymce) {
      window.tinymce.init({
        selector: `textarea#${editorId}`,
        menubar,
        height: height || 150,
        width: width || '100%',
        branding: false,
        resize: 'verticle',
        convert_urls: false,
        theme: 'modern',
        plugins:
          plugins ||
          `directionality fullscreen image link media charmap hr lists textcolor colorpicker ${!editorLoadedFromCDN ? 'wordpress' : ''
          }`,
        toolbar:
          toolbarMnu ||
          'formatselect | fontsizeselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat toogleCode wp_code | addFormField | addSmartField',
        image_advtab: true,
        default_link_target: '_blank',
        setup(editor: any) {
          editor.on('Paste Change input Undo Redo', () => {
            onChangeHandler(editor.getContent())
          })
          formFields && editor.addButton('addFormField', {
            text: 'Form Fields ',
            tooltip: 'Add Form Field Value in Message',
            type: 'menubutton',
            icon: false,
            menu: formFields?.map(i => !filterFieldTypesForTinyMce.includes(i.type) && ({ text: i.name, onClick() { editor.insertContent(insertFieldKey(i)) } })),
          })
          smartTags && editor.addButton('addSmartField', {
            text: 'Smart Tag Fields',
            tooltip: 'Add Smart Tag Field Value in Message',
            type: 'menubutton',
            icon: false,
            menu: SmartTagField?.map(i => ({ text: i.label, onClick() { editor.insertContent(`\${${i.name}}`) } })),
          })
          editor.addButton('toogleCode', {
            text: '</>',
            tooltip: 'Toggle preview',
            icon: false,
            onclick(e: any) {
              const { $ } = e.control
              const myTextarea = $(`#${editorId}`)
              const myIframe = $(editor.iframeElement)
              myTextarea.value = editor.getContent({ source_view: true })
              myIframe.toggleClass('btcd-mce-tinymce-hidden')
              myTextarea.toggleClass('btcd-mce-tinymce-visible')
              console.log('clicked', myTextarea, myIframe)
              if ($('iframe.btcd-mce-tinymce-hidden').length > 0) {
                myTextarea.prependTo('.mce-edit-area')
              } else {
                const el = document.getElementById(editorId)
                if (el instanceof HTMLTextAreaElement) {
                  editor.setContent(el.value)
                }
              }
            }
          })
        }
      })
    }
  }

  return (
    <textarea
      id={editorId}
      className="btcd-paper-inp mt-1 w-10"
      rows={5}
      value={value}
      onChange={ev => onChangeHandler(ev.target.value)}
      style={{ width: '95.5%', height: 'auto' }}
      disabled={disabled}
    />
  )
}

type FieldType = { key: string, type: string, name: string }
type SmartTagType = { label: string, name: string }

type TinyMCEProps = {
  id: string
  value: string
  formFields?: FieldType[]
  smartTags?: boolean
  onChangeHandler: (e: any) => void
  toolbarMnu?: string
  menubar?: string
  height?: string | number
  width?: string | number
  disabled?: boolean
  plugins?: string
  init?: any
  get?: any
  remove?: any
}

declare global {
  interface Window {
    tinymce: {
      init: ({ }) => void
      baseURI: {
        source: string
      }
      get: (id: string) => {
        remove: () => void
      }
    }
  }
}
