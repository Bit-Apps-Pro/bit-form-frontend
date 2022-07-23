/* eslint-disable no-param-reassign */
import merge from 'deepmerge-alt'
import produce from 'immer'
import { createRef, memo, useCallback, useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bar, Container, Section } from 'react-simple-resizer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { getRecoil } from 'recoil-nexus'
import useSWRImmutable from 'swr/immutable'
import BuilderRightPanel from '../components/CompSettings/BuilderRightPanel'
import DraggableModal from '../components/CompSettings/StyleCustomize/ChildComp/DraggableModal'
import { defaultTheme } from '../components/CompSettings/StyleCustomize/ThemeProvider_Old'
import GridLayout from '../components/GridLayout'
import StyleLayers from '../components/LeftBars/StyleLayers'
import ToolBar from '../components/LeftBars/Toolbar'
import GridLayoutLoader from '../components/Loaders/GridLayoutLoader'
import OptionToolBar from '../components/OptionToolBar'
import RenderCssInPortal from '../components/RenderCssInPortal'
import RenderThemeVarsAndFormCSS from '../components/style-new/RenderThemeVarsAndFormCSS'
import ConfirmModal from '../components/Utilities/ConfirmModal'
import { $bits, $breakpoint, $breakpointSize, $builderHistory, $builderHookStates, $flags, $isNewThemeStyleLoaded, $newFormId } from '../GlobalStates/GlobalStates'
import { $styles, $tempStyles } from '../GlobalStates/StylesState'
import { $darkThemeColors, $lightThemeColors } from '../GlobalStates/ThemeColorsState'
import { $themeVars } from '../GlobalStates/ThemeVarsState'
import { RenderPortal } from '../RenderPortal'
import bitsFetch from '../Utils/bitsFetch'
import css2json from '../Utils/css2json'
import { addToBuilderHistory, generateHistoryData, propertyValueSumX } from '../Utils/FormBuilderHelper'
import { bitCipher, isObjectEmpty, multiAssign } from '../Utils/Helpers'
import j2c from '../Utils/j2c.es6'

const styleReducer = (style, action) => {
  if (action.brkPoint === 'lg') {
    multiAssign(style, action.apply)
    sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(style)))
    return { ...style }
  }
  if (action.brkPoint === 'md') {
    const st = style['@media only screen and (max-width:600px)'] || style['@media only screen and (max-width: 600px)']
    multiAssign(st, action.apply)
    sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(style)))
    return { ...style }
  }
  if (action.brkPoint === 'sm') {
    const st = style['@media only screen and (max-width:400px)'] || style['@media only screen and (max-width: 400px)']
    multiAssign(st, action.apply)
    sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(style)))
    return { ...style }
  }
  if (action.type === 'init') {
    return action.style
  }
  return style
}

const FormBuilder = memo(({ formType, formID: pramsFormId, isLoading }) => {
  const newFormId = useRecoilValue($newFormId)
  const isNewForm = formType === 'new'
  const { element, fieldKey } = useParams()
  const formID = isNewForm ? newFormId : pramsFormId
  const { toolbarOff } = JSON.parse(localStorage.getItem('bit-form-config') || '{}')
  const [tolbarSiz, setTolbarSiz] = useState(toolbarOff)
  const [gridWidth, setGridWidth] = useState(window.innerWidth - 468)
  const [newData, setNewData] = useState(null)
  const [brkPoint, setbrkPoint] = useRecoilState($breakpoint)
  const [isNewThemeStyleLoaded, setIsNewThemeStyleLoaded] = useRecoilState($isNewThemeStyleLoaded)
  const builderHookStates = useRecoilValue($builderHookStates)
  const { styleMode } = useRecoilValue($flags)
  const [style, styleDispatch] = useReducer(styleReducer, defaultTheme(formID))
  const [styleSheet, setStyleSheet] = useState(j2c.sheet(style))
  const [styleLoading, setstyleLoading] = useState(true)
  const [debounce, setDebounce] = useState(null)
  const bits = useRecoilValue($bits)
  const [showToolBar, setShowToolbar] = useState(false)
  const [builderPointerEventNone, setBuilderPointerEventNone] = useState(false)
  const conRef = createRef(null)
  const notIE = !window.document.documentMode
  const setBreakpointSize = useSetRecoilState($breakpointSize)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const setTempStyles = useSetRecoilState($tempStyles)
  const [styles, setStyle] = useRecoilState($styles)
  const [lightThemeColors, setLightThemeColors] = useRecoilState($lightThemeColors)
  const [darkThemeColors, setDarkThemeColors] = useRecoilState($darkThemeColors)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const [alertMdl, setAlertMdl] = useState({ show: false, msg: '' })

  // eslint-disable-next-line no-console
  console.log('render formbuilder')
  const { forceBuilderWidthToLG } = builderHookStates

  // useEffect(() => {
  // if (formType === 'new') {
  // sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(defaultTheme(formID))))
  // setstyleLoading(false)
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const { data: fetchedBuilderHelperStates } = useSWRImmutable(!isNewForm ? 'bitforms_form_helpers_state' : null, (uri) => bitsFetch({ formID }, uri)
    .then(({ data: [response] }) => response?.builder_helper_state))

  useEffect(() => {
    if (fetchedBuilderHelperStates) {
      const parseStyle = JSON.parse(fetchedBuilderHelperStates || '{}')
      setStyle(parseStyle.style)
      setBreakpointSize(parseStyle.breakpointSize)
      const allStyleStates = {
        themeVars: parseStyle.themeVars,
        lightThemeColors: parseStyle.themeColors?.lightThemeColors,
        darkThemeColors: parseStyle.themeColors?.darkThemeColors,
        styles: parseStyle.styles,
      }
      setTempStyles(allStyleStates)
      setBuilderHistory(prevHistory => produce(prevHistory, drft => {
        const { state } = drft.histories[0]
        drft.histories[0].state = {
          ...state,
          ...allStyleStates,
        }
      }))
      setThemeVars(parseStyle.themeVars)
      if (parseStyle.themeColors?.lightThemeColors) setLightThemeColors(parseStyle.themeColors.lightThemeColors)
      if (parseStyle.themeColors?.darkThemeColors) setDarkThemeColors(parseStyle.themeColors.darkThemeColors)

      // declare new theme exist , no need old theme functions
      if (!isObjectEmpty(parseStyle)) setIsNewThemeStyleLoaded(true)
    } else {
      setOldExistingStyle()
      const allStyleStates = {
        themeVars: { ...themeVars },
        lightThemeColors: { ...lightThemeColors },
        darkThemeColors: { ...darkThemeColors },
        themeColors: merge(lightThemeColors, darkThemeColors),
        styles: { ...styles },
      }
      setTempStyles(allStyleStates)
      setBuilderHistory(prevHistory => produce(prevHistory, drft => {
        const { state } = drft.histories[0]
        drft.histories[0].state = {
          ...state,
          ...allStyleStates,
        }
      }))
    }
    // setGridWidth(863)
  }, [fetchedBuilderHelperStates])

  useEffect(() => {
    if (!isNewThemeStyleLoaded) {
      if (brkPoint === 'md') {
        const st = style['@media only screen and (max-width:600px)'] || style['@media only screen and (max-width: 600px)']
        setStyleSheet(j2c.sheet(merge(style, st)))
      } else if (brkPoint === 'sm') {
        const st = style['@media only screen and (max-width:400px)'] || style['@media only screen and (max-width: 400px)']
        setStyleSheet(j2c.sheet(merge(style, st)))
      } else if (brkPoint === 'lg') {
        setStyleSheet(j2c.sheet(style))
      }
    }
  }, [brkPoint, style])

  useEffect(() => { setResponsiveView('lg') }, [forceBuilderWidthToLG])

  const styleProvider = () => {
    if (!isNewThemeStyleLoaded) {
      if (brkPoint === 'md') {
        const st = style['@media only screen and (max-width:600px)'] || style['@media only screen and (max-width: 600px)']
        return merge(style, st)
      }
      if (brkPoint === 'sm') {
        const st = style['@media only screen and (max-width:400px)'] || style['@media only screen and (max-width: 400px)']
        return merge(style, st)
      }
    }
    return style
  }

  function setOldExistingStyle() {
    const headers = new Headers()
    headers.append('pragma', 'no-cache')
    headers.append('cache-control', 'no-cache')
    const styleUrl = new URL(bits.styleURL)
    if (styleUrl.protocol !== window.location.protocol) {
      styleUrl.protocol = window.location.protocol
    }

    const latestTimefetch = new Date().getTime()
    fetch(`${styleUrl}/bitform-${formID}.css?ver=${latestTimefetch}`, { cache: 'no-store', headers })
      .then(response => {
        if (response.ok) {
          return response.text()
        }
        setstyleLoading(false)
        return Promise.reject(response.statusText)
      })
      .then(oldStyleText => {
        const oldStyle = css2json(oldStyleText)
        styleDispatch({ type: 'init', style: oldStyle })
        setstyleLoading(false)
        recheckStyleById(oldStyleText)
      })
      .catch(() => {
        const dfThm = defaultTheme(formID)
        styleDispatch({ type: 'init', style: dfThm })
        sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(dfThm)))
      })
  }

  function recheckStyleById(oldStyleText) {
    if (!new RegExp(`._frm-bg-${formID}|._frm-${formID}`, 'g').test(oldStyleText)
      || oldStyleText.match(/._frm-bg-\d+/g)?.[0] !== `._frm-bg-${formID}`) {
      let replaceId
      if (/._frm-bg-Blank/gi.test(oldStyleText)) {
        replaceId = 'Blank'
      } else {
        replaceId = oldStyleText.match(/._frm-bg-\d+/g)?.[0].replace(/._frm-bg-/g, '')
      }
      if (replaceId !== undefined) {
        oldStyleText = oldStyleText.replaceAll(new RegExp(`-${replaceId}`, 'g'), `-${formID}`)
      }
    }
    const modifiedStyle = css2json(oldStyleText)
    styleDispatch({ type: 'init', style: modifiedStyle })
    sessionStorage.setItem('btcd-fs', bitCipher(oldStyleText))
  }

  const toggleToolBar = useCallback(() => {
    const res = conRef.current.getResizer()
    if (res.getSectionSize(0) >= 160) {
      res.resizeSection(0, { toSize: 0 })
      setTolbarSiz(true)
      setShowToolbar(true)
      localStorage.setItem('bit-form-config', JSON.stringify({ toolbarOff: true }))
    } else {
      res.resizeSection(0, { toSize: 160 })
      setTolbarSiz(false)
      setShowToolbar(false)
      localStorage.setItem('bit-form-config', JSON.stringify({ toolbarOff: false }))
    }
    conRef.current.applyResizer(res)
  }, [conRef])

  const addNewData = useCallback(ndata => {
    setNewData(ndata)
  }, [])

  const onResize = useCallback(resizer => {
    if (resizer.isBarActivated(1)) {
      resizer.resizeSection(0, { toSize: resizer.getSectionSize(2) - 135 })
    }
  }, [])

  const onResizeActivate = useCallback(() => {
    setBuilderPointerEventNone(true)
    document.querySelector('.tool-sec').style.transition = 'flex-grow 0ms'
  }, [])

  const afterResizing = useCallback(() => {
    setBuilderPointerEventNone(false)
    document.querySelector('.tool-sec').style.transition = 'flex-grow 500ms'
  }, [])

  const setResponsiveView = useCallback(view => {
    const resizer = conRef.current.getResizer()
    const leftBarWidth = toolbarOff ? 50 : 180
    const rightBarWidth = 307
    const mobileSize = 400
    const tabletSize = 590
    if (view === 'lg') {
      setbrkPoint('lg')
      resizer.resizeSection(0, { toSize: leftBarWidth })
      resizer.resizeSection(2, { toSize: rightBarWidth })
    } else if (view === 'md') {
      setbrkPoint('md')
      const dividedWidth = (window.innerWidth - tabletSize) / 2
      const s0 = dividedWidth - leftBarWidth
      const s2 = dividedWidth - rightBarWidth
      resizer.resizeSection(0, { toSize: leftBarWidth + s0 })
      resizer.resizeSection(2, { toSize: rightBarWidth + s2 })
    } else if (view === 'sm') {
      setbrkPoint('sm')
      const dividedWidth = (window.innerWidth - mobileSize) / 2
      const s0 = dividedWidth - leftBarWidth
      const s2 = dividedWidth - rightBarWidth
      resizer.resizeSection(0, { toSize: leftBarWidth + s0 })
      resizer.resizeSection(2, { toSize: rightBarWidth + s2 })
    }
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Breakpoint', view, { breakpoint: getRecoil($breakpoint) }))
    conRef.current.applyResizer(resizer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conRef])
  const setGrWidth = (paneWidth) => {
    clearTimeout(debounce)
    setDebounce(setTimeout(() => {
      setGridWidth(paneWidth)
      let w = 0
      if (!isNewThemeStyleLoaded) {
        if (style[`._frm-${formID}`]?.['border-width']) { w += propertyValueSumX(style[`._frm-${formID}`]['border-width']) }
        if (style[`._frm-${formID}`]?.padding) { w += propertyValueSumX(style[`._frm-${formID}`].padding) }
        if (style[`._frm-${formID}`]?.margin) { w += propertyValueSumX(style[`._frm-${formID}`].margin) }
        if (style[`._frm-bg-${formID}`]?.['border-width']) { w += propertyValueSumX(style[`._frm-bg-${formID}`]['border-width']) }
        if (style[`._frm-bg-${formID}`]?.padding) { w += propertyValueSumX(style[`._frm-bg-${formID}`].padding) }
        if (style[`._frm-bg-${formID}`]?.margin) { w += propertyValueSumX(style[`._frm-bg-${formID}`].margin) }
      }
      const gw = Math.round(paneWidth - 0 - w) // inner left-right padding
      if (gw <= 510) {
        setbrkPoint('sm')
      } else if (gw > 420 && gw <= 700) {
        setbrkPoint('md')
      } else if (gw > 700) {
        setbrkPoint('lg')
      }
    }, styleMode ? 0 : 100))
  }

  const clsAlertMdl = () => {
    const tmpAlert = { ...alertMdl }
    tmpAlert.show = false
    setAlertMdl(tmpAlert)
  }

  return (
    <>
      {/* {formType === 'edit' && <FetchBuilderHelperStates formID={formID} />} */}
      <OptionToolBar
        setResponsiveView={setResponsiveView}
        setShowToolbar={setShowToolbar}
        showToolBar={showToolBar}
        toggleToolBar={toggleToolBar}
      />
      <DraggableModal setBuilderPointerEventNone={setBuilderPointerEventNone} />
      <Container
        ref={conRef}
        style={{ height: '100vh' }}
        beforeApplyResizer={onResize}
        afterResizing={afterResizing}
        onActivate={onResizeActivate}
      >
        <Section
          className="tool-sec"
          defaultSize={showToolBar ? 0 : 180}
        >
          {styleMode ? <StyleLayers /> : (
            <ToolBar
              setNewData={addNewData}
              className="tile"
              tolbarSiz={tolbarSiz}
              setTolbar={toggleToolBar}
            />
          )}
        </Section>
        <Bar className="bar bar-l" />

        <Section
          onSizeChanged={setGrWidth}
          minSize={notIE && 320}
          defaultSize={gridWidth - 28}
        >
          {!isLoading && !styleLoading ? (
            <RenderPortal
              id="bit-grid-layout"
              style={{ width: gridWidth + 10, height: 'calc(100% - 82px)', margin: '3px auto auto', overflow: 'hidden', pointerEvents: builderPointerEventNone ? 'none' : 'all' }}
            >
              <RenderThemeVarsAndFormCSS />
              <RenderCssInPortal />
              {!isNewThemeStyleLoaded && !isNewForm && <style>{styleSheet}</style>}
              <GridLayout
                style={styleProvider()}
                gridWidth={gridWidth}
                newData={newData}
                setNewData={setNewData}
                formType={formType}
                formID={formID}
                setAlertMdl={setAlertMdl}
              />
            </RenderPortal>
          ) : <GridLayoutLoader />}

        </Section>

        <Bar className="bar bar-r" />

        <Section id="settings-menu" defaultSize={300}>
          <BuilderRightPanel
            brkPoint={brkPoint}
            style={styleProvider()}
            setResponsiveView={setResponsiveView}
            styleDispatch={styleDispatch}
            formID={formID}
          />
        </Section>
      </Container>
      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="red"
        btnTxt="Close"
        show={alertMdl.show}
        close={clsAlertMdl}
        action={clsAlertMdl}
        title="Sorry"
      >
        <div className="txt-center">{alertMdl.msg}</div>
      </ConfirmModal>
    </>
  )
})

export default function FormBuilderHOC({ isLoading }) {
  const { formType, formID } = useParams()
  return <FormBuilder {...{ formType, formID, isLoading }} />
}
