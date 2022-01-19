/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react'
import { useFela } from 'react-fela'
import AceEditor from 'react-ace'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import Grow from './StyleCustomize/ChildComp/Grow'
import SingleToggle from '../Utilities/SingleToggle'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'

import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/mode-javascript'
import 'ace-builds/src-min-noconflict/snippets/javascript'
import 'ace-builds/src-min-noconflict/mode-css'
import 'ace-builds/src-min-noconflict/snippets/css'
import 'ace-builds/src-min-noconflict/theme-tomorrow'
import 'ace-builds/src-min-noconflict/theme-twilight'

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

  const themeSetLocalStorage = ({ target: { value } }) => {
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
          <div className={css({ flx: 'between' })}>
            <StyleSegmentControl
              className={css(ut.w5)}
              options={[{ label: 'JS' }, { label: 'CSS' }]}
              onChange={lbl => setEditorTab(lbl)}
              defaultActive="JS"
              actionValue={editorTab}
              wideTab
            />
            <div className={css(ut.flxc, ut.w10, style.editorBtn)}>
              {enableEditor === 'on' && (
                <>
                  <span className={css(ut.mr1)}>{__(' Editor Theme', 'bitform')}</span>
                  <div className={css(style.theme)}>
                    <select className={css(style.select)} onChange={themeSetLocalStorage} value={theme}>
                      <option>Theme Select</option>
                      <option value="twilight">Twilight</option>
                      <option value="tomorrow">Tomorrow</option>
                    </select>
                  </div>
                </>
              )}
              <span className={css(ut.mr1, ut.ml2)}>{__(' Enable Editor', 'bitform')}</span>
              <SingleToggle
                isChecked={enableEditor === 'on'}
                action={editorHandler}
              />
            </div>
          </div>

          <Grow open={editorTab === 'JS'}>
            {enableEditor === 'on' ? (
              <AceEditor
                height="330px"
                width="99%"
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
                <textarea
                  className={css(style.editor, { h: 330 })}
                  onChange={(e) => setJsCode(e.target.value)}
                  value={jsCode}
                  rows="18"
                />
              </div>
            )}
          </Grow>

          <Grow open={editorTab === 'CSS'}>
            {enableEditor === 'on' ? (
              <AceEditor
                height="330px"
                width="99%"
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
                <textarea
                  className={css(style.editor, { h: 330 })}
                  onChange={(e) => setCssCode(e.target.value)}
                  value={cssCode}
                  rows="18"
                />
              </div>
            )}
          </Grow>
        </>
      </Grow>
      <div className={css(ut.flxb, ut.mt1, { jc: 'end' })}>
        <button type="button" className={css(ut.btn, style.saveBtn)}>Save</button>
      </div>
    </div>
  )
}

const style = {
  editor: {
    brs: 8,
    mt: 6,
    w: '99%',
  },
  theme: { dy: 'flex', jc: 'flex-end' },
  select: {
    fs: 14,
    fw: 500,
    w: '96%',
    bd: 'var(--b-79-96) !important',

    oe: 'none !important',
    ae: 'auto !important',
    mx: 'auto',
    dy: 'block',
    lh: '2 !important',
    px: 8,
    p: '0 !important',
    mb: 3,
    bs: 'none !important',
    b: 'none !important',
    brs: '8px !important',
    '::placeholder': { cr: 'hsl(215deg 16% 57%)', fs: 12 },
    ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
  },
  editorBtn: {
    jc: 'end',
    fs: 12,
    pr: 5,
  },
  saveBtn: {
    bc: 'var(--b-50)',
    brs: 8,
    fs: 12,
    px: 15,
    py: 5,
    mr: 8,
    cr: 'var(--white-100)',
    ':hover': { bd: 'var(--b-36)' },
  },
}

export default Editor
