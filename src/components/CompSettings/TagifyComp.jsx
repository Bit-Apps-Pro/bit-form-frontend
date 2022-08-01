import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css'
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { $fieldsArr } from '../../GlobalStates/GlobalStates'
import { SmartTagField } from '../../Utils/StaticData/SmartTagField'

export default function TagifyComp({ children, selector, actionId, onChange, value, fFields = true, ph = null, ptrn = null }) {
  const formFields = useRecoilValue($fieldsArr)
  const fields = fFields ? formFields.filter(itm => itm.lbl !== undefined).map(item => ({ name: item.key, value: item.lbl })) : []
  const smartTags = SmartTagField.map((item) => ({ name: item.name, value: item.label }))
  const tagifyRef = useRef(null)

  useEffect(() => {
    const input = document.querySelector(`input[name=${selector}]`)
    input.value = value
    input.setAttribute('value', value)
    if (tagifyRef.current) {
      tagifyRef.current.destroy()
    }
    tagifyRef.current = new Tagify(input, tagifySettings)
    tagifyRef.current.DOM.originalInput.value = value

    tagifyRef.current.on('input', (e) => onInput(e))
      .on('add', onAddTag(tagifyRef.current.DOM.originalInput.value))
      .on('remove', onRemoveTag(tagifyRef.current.DOM.originalInput.value))
  }, [actionId])

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

  const onInput = (e) => {
    const { prefix, textContent } = e.detail
    const lastChar = textContent.slice(-1)
    const isLastCharPrefix = (lastChar === '@' || lastChar === '#')
    const pref = isLastCharPrefix ? lastChar : prefix
    if (pref) {
      if (pref === '@' && fFields) {
        tagifyRef.current.whitelist = fields
      } else if (pref === '#') {
        tagifyRef.current.whitelist = smartTags
      }
      tagifyRef.current.dropdown.show()
    }
    modifyTagifyData(tagifyRef.current.DOM.originalInput.value)
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
    tagTextProp: 'value',
    duplicates: true,
    whitelist: [...fields, ...smartTags],
    enforceWhitelist: true,
    trim: true,
    editTags: false,
    dropdown: {
      enabled: 0,
      position: 'text',
      mapValueTo: 'value',
      highlightFirst: true,
      maxItems: smartTags.length,
      searchKeys: ['name', 'value'],
      closeOnSelect: true,
      placeAbove: false,
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

  return (
    <div>
      {children}
    </div>
  )
}
