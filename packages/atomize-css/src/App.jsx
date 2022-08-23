/* eslint-disable no-eval */
import { Allotment } from 'allotment'
import './App.css'
import 'allotment/dist/style.css'
import { useState } from 'react'
import cssbeautify from 'cssbeautify'
import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { css } from '@codemirror/lang-css'
import beautify from 'json-beautify'
import optimizeAndDefineCssClassProps from './atomize-css/helpers/optimizeAndDefineCssClassProps'
import objectToCssText from './atomize-css/helpers/objectToCssText'
import { atomizeCss } from './atomize-css/atomize-css'
import combineSelectors from './atomize-css/helpers/combineSelectors'
import expressAndCleanCssVars from './atomize-css/helpers/expressAndCleanCssVars'

const beautifyConfig = {
  indent: ' ',
  autosemicolon: true,
  openbrace: 'end-of-line',
}

function App() {
  const [cssVars, setCssVars] = useState('')
  const [styleObj, setStyleObj] = useState('')
  const [styleText, setStyleText] = useState('')
  const [styleClassMap, setStyleClassMap] = useState('')

  const generateAtomicStyle = () => {
    console.clear()
    const normalizedCssVars = expressAndCleanCssVars(eval(`(${cssVars || '{}'})`))
    const normalizedCssClassesAndValues = optimizeAndDefineCssClassProps(eval(`(${styleObj || '{}'})`), normalizedCssVars, {
      ignoreWithFallbackValues: {
        position: 'unset',
        right: 'unset',
        left: 'unset',
        'justify-content': 'initial',
      },
    })

    console.log(JSON.parse(styleObj))
    console.log(normalizedCssClassesAndValues)
    const { atomicClasses, classMaps } = atomizeCss(normalizedCssClassesAndValues, {})
    const optimizedAtomicSelectors = combineSelectors(atomicClasses)
    const styleTxt = objectToCssText(optimizedAtomicSelectors)
    console.log('style clas count', Object.keys(eval(`(${styleObj || '{}'})`)).length, 'atomic count', Object.keys(classMaps).length)
    // setStyleText(styleText)
    setStyleText(cssbeautify(styleTxt), beautifyConfig)
    setStyleClassMap(beautify((classMaps), null, 2, 100))
    // setStyleClassMap(cssbeautify(`.a{display:flex}.b{background-color:#fff}.c{padding:10px}.d{margin:0}.e{position:relative}.f{box-shadow:none}.g{border:none}.h{border-width:0}.i{border-radius:0}.bw,.j.fld-hide:after{position:absolute}.k.fld-hide:after{top:0}.l.fld-hide:after{left:0}.m.fld-hide:after{content:""}.n.fld-hide:after,.y{width:100%}.o.fld-hide:after{height:100%}.p.fld-hide:after{background-color:#0003}.q{font-weight:700}.r{align-items:center}.cn.readonly,.s:disabled{cursor:not-allowed}.cn.readonly,.t:disabled{pointer-events:none}.u{width:20px}.v{height:20px}.w{display:block}.x{flex-direction:row}.z{align-self:auto}.aa{padding:0}.ab{background-color:none}.ac{color:inherit}.ad{font-size:1rem}.ae{color:red}.af{line-height:12px}.ag{font-size:12px}.ah{padding:3px 0}.ai{font-weight:500}.aj{font-weight:400}.ak{margin:0 5px 0 0}.al{border-radius:8px}.am{filter:invert(8%) sepia(8%) saturate(13%) hue-rotate(349deg) brightness(94%) contrast(84%)}.an{margin:5px}.ao{background-color:#f9c3c3}.ap{color:#961d1d}.aq{text-align:init}.ar{padding:5px}.as{margin:1px}.at{box-shadow:0 2px 8px 0 #636363}.au{border:solid #c8a7a7}.av{border-width:1px}.aw{display:inline-block!important}.ax{direction:inherit!important}.ay{font-family:inherit}.az{width:100%!important}.ba{outline:none!important}.bb,.bo:disabled,.bs:read-only{background-color:#fff!important}.bc{border:solid #ababab!important}.bd{border-radius:11px!important}.be{border-width:1px!important}.bf{font-size:1rem!important}.bg{color:#242424!important}.bh{padding:10px 40px!important}.bi{line-height:1.4!important}.bj{height:40px}.bk:focus{box-shadow:0 0 0 3px #0062ff4d!important}.bl:focus,.bm:hover{border-color:#0062ff!important}.bn:disabled,.br:read-only{cursor:default}.bp:disabled,.bt:read-only{color:#8a8a8a!important}.bq:disabled,.bu:read-only{border-color:#dedede!important}.bv::placeholder{color:#24242466!important}.bx{left:3px}.by{top:50%}.bz{padding:7px}.ca{transform:translateY(-50%)}.cb{width:40px}.cc{right:3px}.cd{width:15px}.ce{height:15px}.cf{align-items:start;flex-direction:column}.cg{background-color:#0083f5;border:none;border-radius:5px;box-shadow:2px 2px 4px -2px #0006;color:#fff;cursor:pointer;font-family:1rem;font-size:16px;justify-content:center;line-height:1;margin:10px 0;outline:none;padding:11px 20px}.ch:disabled{opacity:.5}.ci{margin:0 5px 0 0}.cj{margin:0 0 0 5px}.ck{resize:vertical}.cl{filter:invert(15%) sepia(92%) saturate(2882%) hue-rotate(351deg) brightness(81%) contrast(88%)}.cm{min-height:40px;padding:10px 8px!important}.cn.readonly{color:#545454}.cn.readonly,.co:disabled{background-color:#f0f0f04d!important}.co:disabled{border-color:#7575754d!important;color:#545454!important}.cp{margin-right:5px}.cq{margin-left:5px}`), beautifyConfig)
  }

  return (
    <div className="app">
      <style>
        {'.cm-theme{height:100%}'}
      </style>
      <Allotment>
        <Allotment.Pane className="pane1">
          <Allotment vertical>
            <Allotment.Pane preferredSize={300}>
              <div><b>CSS Variables object</b></div>
              <ReactCodeMirror
                value={cssVars}
                height="90%"
                width="97%"
                theme={dracula}
                extensions={[javascript()]}
                onChange={val => setCssVars(val)}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <div><b>Style object</b></div>
              <ReactCodeMirror
                value={styleObj}
                height="90%"
                width="97%"
                theme={dracula}
                extensions={[javascript()]}
                onChange={val => setStyleObj(val)}
              />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>

        <Allotment.Pane className="pane2">
          <Allotment vertical>
            <Allotment.Pane preferredSize={600}>
              <div>
                <b>Generated Style</b>
                <button onClick={generateAtomicStyle}>Generate</button>

              </div>
              <ReactCodeMirror
                value={styleText}
                height="90%"
                width="97%"
                theme={dracula}
                // onChange={val => setStyleObj(val)}
                extensions={[css()]}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <div><b>Style class maps</b></div>
              <ReactCodeMirror
                value={styleClassMap}
                height="90%"
                width="97%"
                theme={dracula}
                readOnly
                // onChange={val => setStyleObj(val)}
                extensions={[javascript()]}
              />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>

      </Allotment>
    </div>
  )
}

export default App
