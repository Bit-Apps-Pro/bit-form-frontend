/* eslint-disable react/jsx-no-useless-fragment */
import 'ace-builds'
// modes
import 'ace-builds/src-min-noconflict/mode-css'
import 'ace-builds/src-min-noconflict/mode-javascript'
// snippets
import 'ace-builds/src-min-noconflict/snippets/css'
import 'ace-builds/src-min-noconflict/snippets/javascript'
// themes
import 'ace-builds/src-min-noconflict/theme-tomorrow'
import 'ace-builds/src-min-noconflict/theme-twilight'
// extensions
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import 'ace-builds/webpack-resolver'
import { useEffect, useRef, useState } from 'react'
import AceEditor from 'react-ace'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useRecoilState, } from 'recoil'
import { $customCodes } from '../../GlobalStates/GlobalStates'
import BdrDottedIcn from '../../Icons/BdrDottedIcn'
import ut from '../../styles/2.utilities'
import bitsFetch from '../../Utils/bitsFetch'
import { select } from '../../Utils/globalHelpers'
import { __ } from '../../Utils/i18nwrap'
import { cssPredefinedCodeList, jsPredefinedCodeList } from '../../Utils/StaticData/predefinedCodeList'
import CheckBoxMini from '../Utilities/CheckBoxMini'
import Downmenu from '../Utilities/Downmenu'
import ListGroup from '../Utilities/ListGroup'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import Grow from './StyleCustomize/ChildComp/Grow'
import Select from '../Utilities/Select'

function CustomCodeEditor() {
  const { css } = useFela()
  const { formType, formID } = useParams()
  const [editorTab, setEditorTab] = useState('JavaScript')
  const [theme, setTheme] = useState(localStorage.getItem('bf-editor-theme') || 'tomorrow')
  const [enableEditor, setEnableEditor] = useState(localStorage.getItem('bf-enable-editor') || 'on')
  const codeEditorRef = useRef({})
  const [customCodes, setCustomCodes] = useRecoilState($customCodes)
  const [editorOptions, setEditorOptions] = useState(options)
  const editorTabList = ['JavaScript', 'CSS']
  const themesList = [
    { label: 'Light Theme', value: 'tomorrow' },
    { label: 'Dark Theme', value: 'twilight' },
  ]

  const addToRefs = (el) => {
    if (el && !(el in codeEditorRef.current)) {
      codeEditorRef.current[editorTab] = el
    }
  }

  const handleEditorValue = value => {
    setCustomCodes(oldCodes => ({ ...oldCodes, [editorTab]: value }))
  }

  const handlePredefinedCode = val => {
    const editorRef = codeEditorRef.current[editorTab]
    // put the jsCode into the editor where the cursor is & store it in the state
    const { editor } = editorRef
    editor.session.insert(editor.getCursorPosition(), val)
    const newCode = editor.getValue()
    setCustomCodes(oldCodes => ({ ...oldCodes, [editorTab]: newCode }))

    // go to end of line if scroll to end is available
    if (editorRef.editor.renderer.scrollBarV.scrollTop !== editorRef.editor.renderer.scrollBarV.maxScrollTop) {
      editorRef.editor.gotoLine(editorRef.editor.session.getLength() + 1)
    }
  }

  const themeSetLocalStorage = value => {
    localStorage.setItem('bf-editor-theme', value)
    setTheme(value)
  }

  const editorHandler = (e) => {
    const { checked } = e.target
    if (checked) {
      setEnableEditor('on')
      localStorage.setItem('bf-enable-editor', 'on')
    } else {
      setEnableEditor('off')
      localStorage.setItem('bf-enable-editor', 'off')
    }
  }

  const saveCode = e => {
    if (formType === 'new') {
      select('#update-btn').click()
      return
    }
    const formData = {
      form_id: formID,
      customCodes,
    }
    const fetchProm = bitsFetch(formData, 'bitforms_add_custom_code')
      .then(response => response)

    toast.promise(fetchProm, {
      loading: __('Updating...', 'biform'),
      success: (res) => res?.data?.message || res?.data,
      error: __('Error occurred, Please try again.'),
    })
    e.preventDefault()
  }

  const getPredefinedCodeList = () => {
    if (editorTab === 'JavaScript') return jsPredefinedCodeList
    if (editorTab === 'CSS') return cssPredefinedCodeList
  }

  const editorProps = {
    mode: editorTab.toLowerCase(),
    theme,
    name: editorTab,
    value: customCodes[editorTab] || '',
    onChange: (newValue) => { handleEditorValue(newValue) },
    height: '330px',
    width: '99%',
    placeholder: 'Write your code here...',
    setOptions: editorOptions,
    ref: addToRefs,
  }

  useEffect(() => {
    if (formType === 'edit' && !(customCodes.JavaScript || customCodes.CSS)) {
      const formData = { form_id: formID }
      bitsFetch(formData, 'bitforms_get_custom_code')
        .then(response => {
          if (response?.data?.JavaScript || response?.data?.CSS) {
            setCustomCodes({ JavaScript: response?.data?.JavaScript, CSS: response?.data?.CSS })
          }
          return response
        })
    } else if (formType === 'new') {
      const formData = {
        form_id: formID,
        customCodes,
      }
      bitsFetch(formData, 'bitforms_add_custom_code')
        .then(response => response)
    }
  }, [])

  return (
    <div>

      <div className={css({ flx: 'between' })}>
        <div className={css(ut.w10, { flx: 'center', my: 2, ml: 27 })}>
          <StyleSegmentControl
            width={300}
            options={editorTabList.map(el => ({ label: el }))}
            onChange={lbl => setEditorTab(lbl)}
            defaultActive="JavaScript"
            actionValue={editorTab}
            wideTab
          />
        </div>
        <div className={css(ut.flxc)}>
          {/* <span>add snippets</span> */}
          <Downmenu place="bottom-end">
            <button
              data-testid="titl-mor-opt-btn"
              data-close
              type="button"
              className={css(style.btn)}
              unselectable="on"
              draggable="false"
              style={{ cursor: 'pointer' }}
              title={__('Snippets')}
            >
              <BdrDottedIcn size="16" />
            </button>
            <ListGroup
              options={getPredefinedCodeList()}
              action={handlePredefinedCode}
            />
          </Downmenu>
        </div>
      </div>

      <Grow open={editorTab === 'JavaScript'}>
        {enableEditor === 'on' ? (
          <AceEditor
            {...editorProps}
            onLoad={(editor) => {
              editor.session.$worker.send('changeOptions', [{ asi: true }])
            }}
          />
        ) : (
          <div>
            <textarea
              className={css(style.editor, { h: 330 })}
              onChange={(e) => handleEditorValue(e.target.value)}
              value={customCodes[editorTab] || ''}
              rows="18"
            />
          </div>
        )}
      </Grow>

      <Grow open={editorTab === 'CSS'}>
        {enableEditor === 'on' ? (
          <AceEditor
            {...editorProps}
          />
        ) : (
          <div>
            <textarea
              className={css(style.editor, { h: 330 })}
              onChange={(e) => handleEditorValue(e.target.value)}
              value={customCodes[editorTab] || ''}
              rows="18"
            />
          </div>
        )}
      </Grow>
      <div className={css(ut.flxb, ut.mt1, { jc: 'between' })}>
        <div className={css(ut.flxc, ut.w10, style.editorBtn)}>
          <CheckBoxMini title="Editor Mode" checked={enableEditor === 'on'} onChange={editorHandler} />
          {enableEditor === 'on' && (
            <>
              <Select
                onChange={themeSetLocalStorage}
                value={theme}
                options={themesList}
                size="sm"
                inputClass={css(style.selectInput)}
              />
              <CheckBoxMini className={css(ut.ml4)} title="Word Wrap" checked={editorOptions.wrap} onChange={() => setEditorOptions(oldOptions => ({ ...oldOptions, wrap: !oldOptions.wrap }))} />
            </>
          )}
        </div>
        <button onClick={saveCode} type="button" className={css(ut.btn, style.saveBtn)}>Save</button>
      </div>
    </div>
  )
}

const style = {
  editor: { w: '99%' },
  btn: {
    b: 0,
    brs: 5,
    curp: 1,
    flx: 'center-between',
  },
  theme: { dy: 'flex', jc: 'flex-end' },
  editorBtn: {
    fs: 12,
    pr: 5,
  },
  saveBtn: {
    bc: 'var(--b-50)',
    brs: 8,
    fs: 13,
    fw: 800,
    px: 15,
    py: 8,
    mr: 8,
    cr: 'var(--white-100)',
    ':hover': { bd: 'var(--b-36)' },
  },
}

const options = {
  autoScrollEditorIntoView: true,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  showLineNumbers: true,
  tabSize: 2,
  animatedScroll: true,
  showFoldWidgets: true,
  displayIndentGuides: true,
  enableEmmet: true,
  enableMultiselect: true,
  highlightSelectedWord: true,
  fontSize: 16,
  useSoftTabs: true,
  showPrintMargin: true,
  showGutter: true,
  highlightActiveLine: true,
  wrapEnabled: false,
}

export default CustomCodeEditor
