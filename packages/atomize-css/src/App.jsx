/* eslint-disable no-restricted-syntax */
/* eslint-disable no-eval */
import { Allotment } from 'allotment'
import sortJson from 'sort-json'
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
  const [atomicCssCombined, setAtomicCssCombined] = useState('')

  const generateAtomicStyle = () => {
    console.clear()
    const normalizedCssVars = expressAndCleanCssVars(cssVars)
    const normalizedCssClassesAndValues = optimizeAndDefineCssClassProps(styleObj, normalizedCssVars, {
      ignoreWithFallbackValues: {
        position: 'unset',
        right: 'unset',
        left: 'unset',
        'justify-content': 'initial',
        'border-style': 'medium',
        'border-width': '0',
        'background-color': 'transparent',
        'border-radius': '0',
        border: 'medium none',
        'box-shadow': 'none',
        margin: '0',
        padding: '0',
        'text-align': 'init',
        color: 'inherit',
        display: 'block',
        'flex-direction': 'row',
        'align-self': 'auto',
        width: 'auto',
      },
    })

    const { atomicClasses, classMaps } = atomizeCss(normalizedCssClassesAndValues, {})
    const optimizedAtomicSelectors = combineSelectors(atomicClasses)
    const styleTxt = objectToCssText(optimizedAtomicSelectors)
    const atomicClassesCom = extractCssFromAtomicClasses(atomicClasses, classMaps)
    setAtomicCssCombined(atomicClassesCom)
    setStyleText(cssbeautify(styleTxt), beautifyConfig)
    setStyleClassMap(classMaps)
  }

  const handleStyleObjChange = (value) => {
    setStyleObj(JSON.parse(value))
  }
  const handleCssVarsChange = (value) => {
    setCssVars(JSON.parse(value))
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
                value={sortAndBeautifyJson(cssVars)}
                height="90%"
                width="97%"
                theme={dracula}
                extensions={[javascript()]}
                onChange={handleCssVarsChange}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <div><b>Style object</b></div>
              <ReactCodeMirror
                value={sortAndBeautifyJson(styleObj)}
                height="90%"
                width="97%"
                theme={dracula}
                extensions={[javascript()]}
                onChange={handleStyleObjChange}
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
                value={beautify(styleClassMap, null, 2, 100)}
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
      <br />
      <div><b>Atomic Style combined</b></div>
      <ReactCodeMirror
        value={sortAndBeautifyJson(atomicCssCombined)}
        height="90%"
        width="97%"
        theme={dracula}
        readOnly
        // onChange={val => setStyleObj(val)}
        extensions={[javascript()]}
      />
    </div>
  )
}

export default App

function sortAndBeautifyJson(obj) {
  if (!obj) return obj
  const o = typeof obj === 'string' ? JSON.parse(obj) : obj
  const sorted = sortJson(o)
  const j = JSON.stringify(sorted, null, 2)
  return j
}

function combineStylesFromAtomicClasses(atomicClasses, classes) {
  let declarations = {}
  const pseudoDeclarations = {}
  classes.forEach((cls) => {
    for (const className in atomicClasses) {
      if (Object.prototype.hasOwnProperty.call(atomicClasses, className)) {
        const aClsDeclarations = atomicClasses[className]
        const splitedClassAndPseudo = className.split(/[^A-z]/g)
        const mainClassName = splitedClassAndPseudo[1]

        if (mainClassName === cls && splitedClassAndPseudo.length === 2) {
          declarations = { ...declarations, ...aClsDeclarations }
        }
        if (mainClassName === cls && splitedClassAndPseudo.length > 2) {
          const pseudoClass = className.replace(new RegExp(`^.${cls}`), '')
          pseudoDeclarations[pseudoClass] = { ...pseudoDeclarations[pseudoClass], aClsDeclarations }
        }
      }
    }
  })
  // console.log({ declarations, pseudoDeclarations })
  return { declarations, pseudoDeclarations }
}

function extractCssFromAtomicClasses(atomicClasses, classMap) {
  let extractStyles = {}
  for (const className in classMap) {
    if (Object.prototype.hasOwnProperty.call(classMap, className)) {
      const atomicClassList = classMap[className]
      const { declarations, pseudoDeclarations } = combineStylesFromAtomicClasses(atomicClasses, atomicClassList)
      const prefixedPseudo = {}
      for (const pseudo in pseudoDeclarations) {
        if (Object.prototype.hasOwnProperty.call(pseudoDeclarations, pseudo)) {
          prefixedPseudo[className + pseudo] = pseudoDeclarations[pseudo]
        }
      }
      extractStyles = {
        ...extractStyles,
        [className]: declarations,
        ...prefixedPseudo,
      }
    }
  }

  return extractStyles
}
