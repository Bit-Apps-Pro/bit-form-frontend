/* eslint-disable no-param-reassign */
import loadable from '@loadable/component'
import merge from 'deepmerge-alt'
import {
  createRef, StrictMode, useCallback,
  useDeferredValue,
  useEffect,
  useReducer,
  useState,
  useRef,
} from 'react'
import { useParams } from 'react-router-dom'
import { Bar, Container, Section } from 'react-simple-resizer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import BuilderRightPanel from '../components/CompSettings/BuilderRightPanel'
import DraggableModal from '../components/CompSettings/StyleCustomize/ChildComp/DraggableModal'
import { defaultTheme } from '../components/CompSettings/StyleCustomize/ThemeProvider_Old'
import GridLayoutLoader from '../components/Loaders/GridLayoutLoader'
import StyleLayerLoader from '../components/Loaders/StyleLayerLoader'
import ToolbarLoader from '../components/Loaders/ToolbarLoader'
import OptionToolBar from '../components/OptionToolBar'
import RenderCssInPortal from '../components/RenderCssInPortal'
import RenderThemeVarsAndFormCSS from '../components/style-new/RenderThemeVarsAndFormCSS'
import ConfirmModal from '../components/Utilities/ConfirmModal'
import {
  $bits, $breakpoint, $breakpointSize, $builderHookStates, $flags, $isNewThemeStyleLoaded, $newFormId, $updateBtn,
} from '../GlobalStates/GlobalStates'
import { $savedStylesAndVars } from '../GlobalStates/SavedStylesAndVars'
import { $staticStylesState } from '../GlobalStates/StaticStylesState'
import { $allStyles, $styles } from '../GlobalStates/StylesState'
import { $allThemeColors } from '../GlobalStates/ThemeColorsState'
import { $allThemeVars } from '../GlobalStates/ThemeVarsState'
import { RenderPortal } from '../RenderPortal'
import bitsFetch from '../Utils/bitsFetch'
import css2json from '../Utils/css2json'
import { addToBuilderHistory, calculateFormGutter, getSessionStorageStates } from '../Utils/FormBuilderHelper'
import { JCOF, select } from '../Utils/globalHelpers'
import { bitCipher, isObjectEmpty, multiAssign } from '../Utils/Helpers'
import j2c from '../Utils/j2c.es6'

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
  const [showToolBar, setShowToolbar] = useState(!toolbarOff)
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
  const [builderPointerEventNone, setBuilderPointerEventNone] = useState(false)
  const conRef = createRef(null)
  const setBreakpointSize = useSetRecoilState($breakpointSize)
  const [alertMdl, setAlertMdl] = useState({ show: false, msg: '' })

  const setAllThemeColors = useSetRecoilState($allThemeColors)
  const setAllThemeVars = useSetRecoilState($allThemeVars)
  const setAllStyles = useSetRecoilState($allStyles)
  const styles = useRecoilValue($styles)
  const setSavedStylesAndVars = useSetRecoilState($savedStylesAndVars)
  const setStaticStylesState = useSetRecoilState($staticStylesState)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const setBreakpoint = useSetRecoilState($breakpoint)
  const [isFetchingV2Styles, setIsFetchingV2Styles] = useState(true)
  // eslint-disable-next-line no-console

  const { forceBuilderWidthToLG } = builderHookStates

  // useEffect(() => {
  // if (formType === 'new') {
  // sessionStorage.setItem('btcd-fs', bitCipher(j2c.sheet(defaultTheme(formID))))
  // setStyleLoading(false)
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const sessionDataNotFound = useRef(0)

  const defaultFormState = (state) => {
    sessionDataNotFound.current += 1
    return state
  }

  useEffect(() => {
    if (isNewForm) setStyleLoading(false)
    let isV2Form = true

    if (!isNewForm) {
      const sessionStorageBreakpoint = getSessionStorageStates({ stateName: 'breakpoint' }) ?? defaultFormState('lg')
      const sessionStorageAllThemeVars = {
        lgLightThemeVars: getSessionStorageStates({ stateName: 'themeVarsLgLight', strType: 'jcof' }) ?? defaultFormState({}),
        mdLightThemeVars: getSessionStorageStates({ stateName: 'themeVarsMdLight', strType: 'jcof' }) ?? defaultFormState({}),
        smLightThemeVars: getSessionStorageStates({ stateName: 'themeVarsSmLight', strType: 'jcof' }) ?? defaultFormState({}),
        lgDarkThemeVars: getSessionStorageStates({ stateName: 'themeVarsLgDark', strType: 'jcof' }) ?? defaultFormState({}),
        mdDarkThemeVars: getSessionStorageStates({ stateName: 'themeVarsMdDark', strType: 'jcof' }) ?? defaultFormState({}),
        smDarkThemeVars: getSessionStorageStates({ stateName: 'themeVarsSmDark', strType: 'jcof' }) ?? defaultFormState({}),
      }
      const sessionStorageAllThemeColors = {
        lightThemeColors: getSessionStorageStates({ stateName: 'lightThemeColors', strType: 'jcof' }) ?? defaultFormState({}),
        darkThemeColors: getSessionStorageStates({ stateName: 'darkThemeColors', strType: 'jcof' }) ?? defaultFormState({}),
      }
      const sessionStorageAllStyles = {
        lgLightStyles: getSessionStorageStates({ stateName: 'stylesLgLight', strType: 'jcof' }) ?? defaultFormState({}),
        mdLightStyles: getSessionStorageStates({ stateName: 'stylesMdLight', strType: 'jcof' }) ?? defaultFormState({}),
        smLightStyles: getSessionStorageStates({ stateName: 'stylesSmLight', strType: 'jcof' }) ?? defaultFormState({}),
        lgDarkStyles: getSessionStorageStates({ stateName: 'stylesLgDark', strType: 'jcof' }) ?? defaultFormState({}),
        mdDarkStyles: getSessionStorageStates({ stateName: 'stylesMdDark', strType: 'jcof' }) ?? defaultFormState({}),
        smDarkStyles: getSessionStorageStates({ stateName: 'stylesSmDark', strType: 'jcof' }) ?? defaultFormState({}),
      }
      const sessionBreakpointSize = getSessionStorageStates({ stateName: 'breakpointSize', strType: 'jcof' }) ?? defaultFormState({})
      if (sessionDataNotFound.current === 0) {
        setBreakpoint(sessionStorageBreakpoint)
        setAllThemeVars(sessionStorageAllThemeVars)
        setAllThemeColors(sessionStorageAllThemeColors)
        setAllStyles(sessionStorageAllStyles)
        setSavedStylesAndVars({ allThemeVars: sessionStorageAllThemeVars, allThemeColors: sessionStorageAllThemeColors, allStyles: sessionStorageAllStyles })
        setUpdateBtn({ unsaved: true })
        setBreakpointSize(sessionBreakpointSize)
        setStyleLoading(false)
        setIsNewThemeStyleLoaded(true)
        return
      }
      sessionDataNotFound.current = 0
      bitsFetch({ formID }, 'bitforms_form_helpers_state')
        .then(({ data }) => {
          setIsFetchingV2Styles(false)
          const fetchedBuilderHelperStates = data?.[0]?.builder_helper_state
          const oldStyles = fetchedBuilderHelperStates || {}
          if (!isNewForm && (!fetchedBuilderHelperStates || isObjectEmpty(oldStyles))) {
            isV2Form = false
          }
          if (isV2Form && !isNewForm && isObjectEmpty(styles)) {
            const { themeVars: allThemeVarsStr, themeColors: allThemeColorsStr, style: allStylesStr, staticStyles: staticStylesStr } = oldStyles
            const allThemeVars = JCOF.parse(allThemeVarsStr)
            const allThemeColors = JCOF.parse(allThemeColorsStr)
            const allStyles = JCOF.parse(allStylesStr)
            if (staticStylesStr) {
              const staticStyles = JCOF.parse(staticStylesStr)
              setStaticStylesState(staticStyles)
            }

            setAllThemeVars(allThemeVars)
            setAllThemeColors(allThemeColors)
            setAllStyles(allStyles)
            setSavedStylesAndVars({ allThemeVars, allThemeColors, allStyles })

            setBreakpointSize(oldStyles.breakpointSize)

            addToBuilderHistory({ state: { allThemeVars, allThemeColors, allStyles } }, false, 0)
            setStyleLoading(false)
            setIsNewThemeStyleLoaded(true)
          } else if (!isFetchingV2Styles && !isNewForm) {
            // declare new theme exist , no need old theme functions
            setOldExistingStyle()
          }
        })
    }

    if (!isObjectEmpty(styles)) {
      setStyleLoading(false)
    }

    if (isV2Form && isNewForm && !isObjectEmpty(styles)) {
      setTimeout(() => {
        select('#update-btn').click()
      }, 100)
    }
  }, [])

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

  useEffect(() => { setbrkPoint('lg') }, [forceBuilderWidthToLG])

  useEffect(() => {
    const resizer = conRef.current.getResizer()
    const leftBarWidth = toolbarOff ? 0 : LEFT_MENU_WIDTH
    const rightBarWidth = 307
    const mobileSize = 400
    const tabletSize = 590
    setbrkPoint(brkPoint)

    if (brkPoint === 'lg') {
      resizer.resizeSection(0, { toSize: leftBarWidth })
      resizer.resizeSection(2, { toSize: rightBarWidth })
    } else if (brkPoint === 'md') {
      const dividedWidth = (window.innerWidth - tabletSize) / 2
      const s0 = dividedWidth - leftBarWidth
      const s2 = dividedWidth - rightBarWidth
      resizer.resizeSection(0, { toSize: leftBarWidth + s0 })
      resizer.resizeSection(2, { toSize: rightBarWidth + s2 })
    } else if (brkPoint === 'sm') {
      const dividedWidth = (window.innerWidth - mobileSize) / 2
      const s0 = dividedWidth - leftBarWidth
      const s2 = dividedWidth - rightBarWidth
      resizer.resizeSection(0, { toSize: leftBarWidth + s0 })
      resizer.resizeSection(2, { toSize: rightBarWidth + s2 })
    }
    conRef.current.applyResizer(resizer)
  }, [brkPoint, element, fieldKey, setbrkPoint, toolbarOff])

  useEffect(() => {
    const res = conRef.current.getResizer()
    if (showToolBar && res.getSectionSize(0) <= 160) {
      res.resizeSection(0, { toSize: 160 })
      localStorage.setItem('bit-form-config', JSON.stringify({ toolbarOff: false }))
      conRef.current.applyResizer(res)
    } else if (!showToolBar && res.getSectionSize(0) >= 160) {
      res.resizeSection(0, { toSize: 0 })
      localStorage.setItem('bit-form-config', JSON.stringify({ toolbarOff: true }))
      conRef.current.applyResizer(res)
    }
  }, [showToolBar])

  const styleProvider = useCallback(() => {
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
  }, [brkPoint, isNewThemeStyleLoaded, v1Style])

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

  const addNewData = useCallback(ndata => setNewData(ndata), [])

  const onResize = useCallback(resizer => {
    if (resizer.isBarActivated(1)) {
      resizer.resizeSection(0, { toSize: resizer.getSectionSize(2) - 130 })
    }
  }, [])

  const onResizeActivate = () => {
    setBuilderPointerEventNone(true)
    select('.tool-sec').style.transition = 'flex-grow 0ms'
  }

  const afterResizing = () => {
    setBuilderPointerEventNone(false)
    select('.tool-sec').style.transition = 'flex-grow 500ms'
  }

  const handleResize = (paneWidth) => {
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
        setShowToolbar={setShowToolbar}
        showToolBar={showToolBar}
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
          defaultSize={showToolBar ? LEFT_MENU_WIDTH : 0}
        >
          <StrictMode>
            {styleMode ? <StyleLayers /> : <ToolBar setNewData={addNewData} />}
          </StrictMode>
        </Section>
        <Bar className="bar bar-l" />

        <Section
          onSizeChanged={handleResize}
          minSize={320}
          defaultSize={BUILDER_WIDTH}
        >
          <StrictMode>
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

          </StrictMode>
        </Section>

        <Bar className="bar bar-r" />

        <Section id="settings-menu" defaultSize={RIGHT_MENU_WIDTH} minSize={100}>
          <StrictMode>
            <BuilderRightPanel
              style={styleProvider()}
              styleDispatch={styleDispatch}
              formID={formID}
            />
          </StrictMode>
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
