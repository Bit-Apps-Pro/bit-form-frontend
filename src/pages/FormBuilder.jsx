/* eslint-disable no-param-reassign */
import loadable from '@loadable/component'
import merge from 'deepmerge-alt'
import produce from 'immer'
import { createRef, useCallback, useEffect, useReducer, useState, useDeferredValue } from 'react'
import { useParams } from 'react-router-dom'
import { Bar, Container, Section } from 'react-simple-resizer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import useSWR from 'swr'
import BuilderRightPanel from '../components/CompSettings/BuilderRightPanel'
import DraggableModal from '../components/CompSettings/StyleCustomize/ChildComp/DraggableModal'
import { defaultTheme } from '../components/CompSettings/StyleCustomize/ThemeProvider_Old'
import GridLayoutLoader from '../components/Loaders/GridLayoutLoader'
import ToolbarLoader from '../components/Loaders/ToolbarLoader'
import OptionToolBar from '../components/OptionToolBar'
import RenderCssInPortal from '../components/RenderCssInPortal'
import RenderThemeVarsAndFormCSS from '../components/style-new/RenderThemeVarsAndFormCSS'
import ConfirmModal from '../components/Utilities/ConfirmModal'
import { $bits, $breakpoint, $breakpointSize, $builderHistory, $builderHookStates, $flags, $isNewThemeStyleLoaded, $newFormId } from '../GlobalStates/GlobalStates'
import { $savedStylesAndVars } from '../GlobalStates/SavedStylesAndVars'
import { $allStyles, $styles } from '../GlobalStates/StylesState'
import { $allThemeColors } from '../GlobalStates/ThemeColorsState'
import { $allThemeVars } from '../GlobalStates/ThemeVarsState'
import { RenderPortal } from '../RenderPortal'
import bitsFetch from '../Utils/bitsFetch'
import css2json from '../Utils/css2json'
import { addToBuilderHistory, calculateFormGutter, generateHistoryData, getLatestState, propertyValueSumX } from '../Utils/FormBuilderHelper'
import { bitCipher, isObjectEmpty, multiAssign } from '../Utils/Helpers'
import j2c from '../Utils/j2c.es6'
import StyleLayerLoader from '../components/Loaders/StyleLayerLoader'
import { JCOF } from '../Utils/globalHelpers'

const ToolBar = loadable(() => import('../components/LeftBars/Toolbar'), { fallback: <ToolbarLoader /> })
const StyleLayers = loadable(() => import('../components/LeftBars/StyleLayers'), { fallback: <StyleLayerLoader /> })
const GridLayout = loadable(() => import('../components/GridLayout'), { fallback: <GridLayoutLoader /> })

const styleReducer = (v1Styles, action) => {
  if (action.brkPoint === 'lg') {
    multiAssign(v1Styles, action.apply)
    sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(v1Styles)))
    return { ...v1Styles }
  }
  if (action.brkPoint === 'md') {
    const st = v1Styles['@media only screen and (max-width:600px)'] || v1Styles['@media only screen and (max-width: 600px)']
    multiAssign(st, action.apply)
    sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(v1Styles)))
    return { ...v1Styles }
  }
  if (action.brkPoint === 'sm') {
    const st = v1Styles['@media only screen and (max-width:400px)'] || v1Styles['@media only screen and (max-width: 400px)']
    multiAssign(st, action.apply)
    sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(v1Styles)))
    return { ...v1Styles }
  }
  if (action.type === 'init') {
    return action.v1Style
  }
  return v1Styles
}

const LEFT_MENU_WIDTH = 180
const RIGHT_MENU_WIDTH = 300
const SPLIT_BAR = 8
const BUILDER_WIDTH = window.innerWidth - LEFT_MENU_WIDTH - RIGHT_MENU_WIDTH - (SPLIT_BAR * 2)

const FormBuilder = ({ isLoading }) => {
  const newFormId = useRecoilValue($newFormId)
  const { element, fieldKey, formType, formID: pramsFormId } = useParams()
  const isNewForm = formType !== 'edit'
  const formID = isNewForm ? newFormId : pramsFormId
  const { toolbarOff } = JSON.parse(localStorage.getItem('bit-form-config') || '{}')
  const [tolbarSiz, setTolbarSiz] = useState(toolbarOff)
  const [gridWidth, setGridWidth] = useState(BUILDER_WIDTH)
  const deferedGridWidth = useDeferredValue(gridWidth)
  const [newData, setNewData] = useState(null)
  const [brkPoint, setbrkPoint] = useRecoilState($breakpoint)
  const [isNewThemeStyleLoaded, setIsNewThemeStyleLoaded] = useRecoilState($isNewThemeStyleLoaded)
  const builderHookStates = useRecoilValue($builderHookStates)
  const { styleMode } = useRecoilValue($flags)
  const [v1Style, styleDispatch] = useReducer(styleReducer, defaultTheme(formID))
  const [styleSheet, setStyleSheet] = useState(j2c.sheet(v1Style))
  const [styleLoading, setStyleLoading] = useState(true)
  const bits = useRecoilValue($bits)
  const [showToolBar, setShowToolbar] = useState(false)
  const [builderPointerEventNone, setBuilderPointerEventNone] = useState(false)
  const conRef = createRef(null)
  const setBreakpointSize = useSetRecoilState($breakpointSize)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const [alertMdl, setAlertMdl] = useState({ show: false, msg: '' })

  const setAllThemeColors = useSetRecoilState($allThemeColors)
  const setAllThemeVars = useSetRecoilState($allThemeVars)
  const setAllStyles = useSetRecoilState($allStyles)
  const styles = useRecoilValue($styles)
  const setSavedStylesAndVars = useSetRecoilState($savedStylesAndVars)
  // eslint-disable-next-line no-console

  const { forceBuilderWidthToLG, forceBuilderWidthToBrkPnt } = builderHookStates

  // useEffect(() => {
  // if (formType === 'new') {
  // sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(defaultTheme(formID))))
  // setStyleLoading(false)
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const { data: fetchedBuilderHelperStates, isValidating: isFetchingStyles } = useSWR(!isNewForm ? 'bitforms_form_helpers_state' : null, (uri) => bitsFetch({ formID }, uri)
    .then(({ data: [response] }) => response?.builder_helper_state))

  useEffect(() => {
    if (isNewForm) setStyleLoading(false)
    let isV2Form = true
    const oldStyles = fetchedBuilderHelperStates || {}
    if (!isNewForm && (!fetchedBuilderHelperStates || isObjectEmpty(oldStyles))) {
      isV2Form = false
    }

    if (isV2Form && !isNewForm) {
      const { themeVars, themeColors, style: oldAllStyles } = oldStyles
      setAllThemeColors(JCOF.parse(themeColors))
      setAllThemeVars(JCOF.parse(themeVars))
      setAllStyles(JCOF.parse(oldAllStyles))

      setSavedStylesAndVars({
        allThemeColors: themeColors,
        allThemeVars: themeVars,
        allStyles: oldAllStyles,
      })

      setBreakpointSize(oldStyles.breakpointSize)

      setBuilderHistory(prevHistory => produce(prevHistory, drft => {
        const { state } = drft.histories[0]
        drft.histories[0].state = {
          ...state,
          // ...allStyleStates, // TODO fix this with lot of state
        }
      }))
      setStyleLoading(false)
    } else if (!isFetchingStyles && !isNewForm) {
      // declare new theme exist , no need old theme functions
      setIsNewThemeStyleLoaded(false)
      setOldExistingStyle()
    }
  }, [fetchedBuilderHelperStates])

  useEffect(() => {
    if (!isNewThemeStyleLoaded) {
      if (brkPoint === 'md') {
        const st = v1Style['@media only screen and (max-width:600px)'] || v1Style['@media only screen and (max-width: 600px)']
        setStyleSheet(j2c.sheet(merge(v1Style, st)))
      } else if (brkPoint === 'sm') {
        const st = v1Style['@media only screen and (max-width:400px)'] || v1Style['@media only screen and (max-width: 400px)']
        setStyleSheet(j2c.sheet(merge(v1Style, st)))
      } else if (brkPoint === 'lg') {
        setStyleSheet(j2c.sheet(v1Style))
      }
    }
  }, [brkPoint, v1Style])

  useEffect(() => { setResponsiveView('lg') }, [forceBuilderWidthToLG])

  useEffect(() => {
    const resizer = conRef.current.getResizer()
    const leftBarWidth = toolbarOff ? 50 : LEFT_MENU_WIDTH
    const rightBarWidth = 307
    const mobileSize = 400
    const tabletSize = 590
    if (brkPoint === 'lg') {
      setbrkPoint('lg')
      resizer.resizeSection(0, { toSize: leftBarWidth })
      resizer.resizeSection(2, { toSize: rightBarWidth })
    } else if (brkPoint === 'md') {
      setbrkPoint('md')
      const dividedWidth = (window.innerWidth - tabletSize) / 2
      const s0 = dividedWidth - leftBarWidth
      const s2 = dividedWidth - rightBarWidth
      resizer.resizeSection(0, { toSize: leftBarWidth + s0 })
      resizer.resizeSection(2, { toSize: rightBarWidth + s2 })
    } else if (brkPoint === 'sm') {
      setbrkPoint('sm')
      const dividedWidth = (window.innerWidth - mobileSize) / 2
      const s0 = dividedWidth - leftBarWidth
      const s2 = dividedWidth - rightBarWidth
      resizer.resizeSection(0, { toSize: leftBarWidth + s0 })
      resizer.resizeSection(2, { toSize: rightBarWidth + s2 })
    }
    conRef.current.applyResizer(resizer)
  }, [forceBuilderWidthToBrkPnt])

  const styleProvider = () => {
    if (!isNewThemeStyleLoaded) {
      if (brkPoint === 'md') {
        const st = v1Style['@media only screen and (max-width:600px)'] || v1Style['@media only screen and (max-width: 600px)']
        return merge(v1Style, st)
      }
      if (brkPoint === 'sm') {
        const st = v1Style['@media only screen and (max-width:400px)'] || v1Style['@media only screen and (max-width: 400px)']
        return merge(v1Style, st)
      }
    }
    return v1Style
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
        setStyleLoading(false)
        return Promise.reject(response.statusText)
      })
      .then(oldStyleText => {
        const oldStyle = css2json(oldStyleText)
        styleDispatch({ type: 'init', v1Style: oldStyle })
        setStyleLoading(false)
        recheckStyleById(oldStyleText)
      })
      .catch(() => {
        const dfThm = defaultTheme(formID)
        styleDispatch({ type: 'init', v1Style: dfThm })
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
        oldStyleText = oldStyleText.replace(new RegExp(`-${replaceId}`, 'g'), `-${formID}`)
      }
    }
    const modifiedStyle = css2json(oldStyleText)
    styleDispatch({ type: 'init', v1Style: modifiedStyle })
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
    const leftBarWidth = toolbarOff ? 50 : LEFT_MENU_WIDTH
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
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Breakpoint', view, { breakpoint: getLatestState('breakpoint'), styles: getLatestState('styles'), themeVars: getLatestState('themeVars') }))
    conRef.current.applyResizer(resizer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conRef])

  const setGrWidth = (paneWidth) => {
    setGridWidth(paneWidth)
    const w = calculateFormGutter(isNewThemeStyleLoaded ? styles.form : v1Style, formID)

    const gw = Math.round(paneWidth - w) // inner left-right padding
    if (gw <= 510) {
      setbrkPoint('sm')
    } else if (gw > 420 && gw <= 700) {
      setbrkPoint('md')
    } else if (gw > 700) {
      setbrkPoint('lg')
    }
  }

  const clsAlertMdl = () => {
    const tmpAlert = { ...alertMdl }
    tmpAlert.show = false
    setAlertMdl(tmpAlert)
  }

  return (
    <>
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
          defaultSize={showToolBar ? 0 : LEFT_MENU_WIDTH}
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
          minSize={320}
          defaultSize={BUILDER_WIDTH}
        >
          {!isLoading && !styleLoading ? (
            <RenderPortal
              id="bit-grid-layout"
              style={{ width: gridWidth, height: 'calc(100% - 82px)', margin: '3px auto auto', overflow: 'hidden', pointerEvents: builderPointerEventNone ? 'none' : 'all' }}
            >
              <RenderThemeVarsAndFormCSS />
              <RenderCssInPortal />
              {!isNewThemeStyleLoaded && !isNewForm && <style>{styleSheet}</style>}
              <GridLayout
                style={styleProvider()}
                gridWidth={deferedGridWidth}
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

        <Section id="settings-menu" defaultSize={RIGHT_MENU_WIDTH} minSize={100}>
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
}

export default FormBuilder
