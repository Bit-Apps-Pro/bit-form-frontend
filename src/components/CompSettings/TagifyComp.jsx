import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css'
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
// import { $fieldsArr } from '../../../GlobalStates'
import {  $fieldsArr } from '../../GlobalStates/GlobalStates'

import { SmartTagField } from '../../Utils/StaticData/SmartTagField'

export default function TagifyComp({ children, selector, actionId, onChange, value, fFields = true, ph = null, ptrn = null }) {
  const formFields = useRecoilValue($fieldsArr)
  const fields = []
  const tagifyRef = useRef(null)
  const smartTags = []
  if (fFields) {
    formFields.map(item => item.lbl !== undefined && fields.push({ name: item.key, value: item.lbl }))
  }
  SmartTagField.map((item) => {
    smartTags.push({ name: item.name, value: item.label })
  })

  const modifyTagifyData = val => {
    const matchedBraces = val.match(/({[^{]*?)(?=\})}/g)
    let replacedData = val
    matchedBraces?.forEach(t => {
      if (t[1] === '"') {
        const parseData = JSON.parse(t)
        replacedData = replacedData.replace(t, parseData.name)
      }
    })
    onChange(replacedData)
  }

  const onInput = (e, tagifyIns) => {
    const { prefix } = e.detail
    if (prefix) {
      tagifyIns.dropdown.show.call(tagifyIns, e.detail.value)
      if (prefix === '@' && fFields) { tagifyIns.whitelist = fields }

      if (prefix === '#') { tagifyIns.whitelist = smartTags }

      if (e.detail.value.length > 1) { tagifyIns.dropdown.show.call(tagifyIns, e.detail.value) }
    }
    modifyTagifyData(tagifyIns.DOM.originalInput.value)
  }

  const onAddTag = tagifyValue => {
    modifyTagifyData(tagifyValue)
  }

  const onRemoveTag = tagifyValue => {
    modifyTagifyData(tagifyValue)
  }

  const tagifySettings = {
    mixTagsInterpolator: ['${', '}'],
    delimiters: ',| ',
    mode: 'mix', // <--  Enable mixed-content
    mixMode: { insertAfterTag: '' },
    pattern: ptrn || /#|@/,
    placeholder: ph || 'Type here...#Smart-tags',
    tagTextProp: 'text',
    duplicates: true,
    enforceWhitelist: true,
    trim: true,
    editTags: false,

    whitelist: fields.concat(smartTags).map((item) => (typeof item == 'string' ? { value: item } : item)),

    dropdown: {
      enabled: 1,
      position: 'text',
      mapValueTo: 'value',
      // highlightFirst: true,
      maxItems: smartTags.length,
      searchKeys: ['name', 'value'],
      closeOnSelect: false 
    },
    callbacks: {
      add: () => {
        modifyTagifyData(tagifyRef.current.DOM.originalInput.value)
      },
      remove: () => {
        modifyTagifyData(tagifyRef.current.DOM.originalInput.value)
      },
    },
  }

  useEffect(() => {
    const input = document.querySelector(`input[name=${selector}]`)
    if (tagifyRef.current) {
      tagifyRef.current.DOM.originalInput.value = value
      tagifyRef.current.destroy()
    }
    console.log('actionID', actionId)
    tagifyRef.current = new Tagify(input, tagifySettings)

    tagifyRef.current.DOM.originalInput.value = value
    tagifyRef.current.on('input', (e) => onInput(e, tagifyRef.current))
      .on('add', onAddTag(tagifyRef.current.DOM.originalInput.value))
      .on('remove', onRemoveTag(tagifyRef.current.DOM.originalInput.value))
  }, [actionId])

  return (
    <div>
      { children }
    </div>
  )
}
