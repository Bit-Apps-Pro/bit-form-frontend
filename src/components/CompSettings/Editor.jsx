import { useState } from 'react'
import { useFela } from 'react-fela'
import AceEditor from 'react-ace'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import Grow from './StyleCustomize/ChildComp/Grow'
import TableCheckBox from '../Utilities/TableCheckBox'
import { __ } from '../../Utils/i18nwrap'
import 'brace/mode/javascript'
import 'brace/mode/css'
import 'brace/snippets/javascript'
import 'brace/theme/tomorrow'
import 'brace/theme/twilight'
import 'brace/ext/language_tools'

function Editor() {
  const { css } = useFela()
  const [editorTab, setEditorTab] = useState('JS')
  const [tab, setTab] = useState('Custom Code')
  const [theme, setTheme] = useState(localStorage.getItem('bf-editor-theme') || 'twilight')
  const [jsCode, setJsCode] = useState('')
  const [cssCode, setCssCode] = useState('')
  const [enableEditor, setEnableEditor] = useState(localStorage.getItem('bf-enable-editor') || 'on')

  const options = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    tabSize: 2,
  }

  const themeSetLocalStorage = (e) => {
    const { value } = e.target
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

  return (
    <div>
      <StyleSegmentControl
        options={[{ label: 'Custom Code' }, { label: 'Other' }]}
        onChange={lbl => setTab(lbl)}
        defaultActive="Custom Code"
        actionValue={tab}
        wideTab
      />
      <br />

      <Grow open={tab === 'Custom Code'}>
        <>
          <StyleSegmentControl
            options={[{ label: 'JS' }, { label: 'CSS' }]}
            onChange={lbl => setEditorTab(lbl)}
            defaultActive="JS"
            actionValue={editorTab}
            wideTab
          />
          <br />
          <TableCheckBox
            name="js"
            onChange={editorHandler}
            title={__(' Enable Editor', 'bitform')}
            checked={enableEditor === 'on'}
          />
          <Grow open={editorTab === 'JS'}>
            <>
              {enableEditor === 'on' ? (
                <AceEditor
                  placeholder=""
                  mode="javascript"
                  theme={theme}
                  onChange={(newValue) => setJsCode(newValue)}
                  fontSize={14}
                  showPrintMargin
                  showGutter
                  highlightActiveLine
                  className={css(style.editor)}
                  value={jsCode}
                  setOptions={options}
                />
              ) : (
                <div>
                  <textarea className={css(style.editor)} onChange={(e) => setJsCode(e.target.value)} value={jsCode} />
                </div>
              )}
            </>
          </Grow>

          <Grow open={editorTab === 'CSS'}>
            <>
              {enableEditor === 'on' ? (
                <AceEditor
                  placeholder=""
                  mode="css"
                  theme={theme}
                  className={css(style.editor)}
                  onChange={(newValue) => setCssCode(newValue)}
                  fontSize={14}
                  showPrintMargin
                  showGutter
                  highlightActiveLine
                  value={cssCode}
                  setOptions={options}
                />
              ) : (
                <div>
                  <textarea className={css(style.editor)} onChange={(e) => setCssCode(e.target.value)} value={cssCode} />
                </div>
              )}
            </>
          </Grow>
          <br />
          {enableEditor === 'on' && (
            <div className={css(style.theme)}>
              <select onChange={themeSetLocalStorage} value={theme}>
                <option>Theme Select</option>
                <option value="twilight">twilight</option>
                <option value="tomorrow">tomorrow</option>
              </select>
            </div>
          )}
        </>
      </Grow>
    </div>
  )
}

const style = {
  editor: {
    brs: 8,
    h: '320px !important',
    mt: 6,
    w: '662px !important',
  },
  theme: { dy: 'flex', jc: 'flex-end' },

}

export default Editor
