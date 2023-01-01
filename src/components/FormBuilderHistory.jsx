import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  $breakpoint,
  $builderHistory,
  $builderHookStates,
  $colorScheme,
  $fields,
  $layouts,
} from '../GlobalStates/GlobalStates'
import { $savedStylesAndVars } from '../GlobalStates/SavedStylesAndVars'
import { $allStyles, $styles } from '../GlobalStates/StylesState'
import { $allThemeColors, $themeColors } from '../GlobalStates/ThemeColorsState'
import { $allThemeVars, $themeVars } from '../GlobalStates/ThemeVarsState'
import EllipsisIcon from '../Icons/EllipsisIcon'
import HistoryIcn from '../Icons/HistoryIcn'
import RedoIcon from '../Icons/RedoIcon'
import UndoIcon from '../Icons/UndoIcon'
import ut from '../styles/2.utilities'
import builderHistoryStyle from '../styles/builderHistory.style'
import OptionToolBarStyle from '../styles/OptionToolbar.style'
import { reCalculateFldHeights } from '../Utils/FormBuilderHelper'
import { __ } from '../Utils/i18nwrap'
import Downmenu from './Utilities/Downmenu'
import Tip from './Utilities/Tip'
import VirtualList from './Utilities/VirtualList'

export function handleUndoRedoShortcut(e) {
  if (e.target.tagName !== 'INPUT' && e.ctrlKey) {
    e.preventDefault()
    if (e.key.toLowerCase() === 'z') {
      const undoBtn = document.querySelector('#builder-undo-btn')
      undoBtn.click()
    } else if (e.key.toLowerCase() === 'y') {
      const redoBtn = document.querySelector('#builder-redo-btn')
      redoBtn.click()
    }
  }
}

export default function FormBuilderHistory() {
  const { css } = useFela()
  const [disabled, setDisabled] = useState(false)
  const [showHistory, setShowHistory] = useState(null)
  const setFields = useSetRecoilState($fields)
  const setLayouts = useSetRecoilState($layouts)
  const setColorScheme = useSetRecoilState($colorScheme)
  const setBreakpoint = useSetRecoilState($breakpoint)
  const setStyles = useSetRecoilState($styles)
  const setThemeColors = useSetRecoilState($themeColors)
  const setThemeVars = useSetRecoilState($themeVars)
  const setAllStyles = useSetRecoilState($allStyles)
  const setAllThemeColors = useSetRecoilState($allThemeColors)
  const setAllThemeVars = useSetRecoilState($allThemeVars)
  const [builderHistory, setBuilderHistory] = useRecoilState($builderHistory)
  const setBuilderHookStates = useSetRecoilState($builderHookStates)
  const rowVirtualizer = useRef(null)
  const { active, histories } = builderHistory

  useEffect(() => {
    document.addEventListener('keypress', handleUndoRedoShortcut)

    return () => document.removeEventListener('keypress', handleUndoRedoShortcut)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, disabled])

  const handleHistory = indx => {
    if (indx < 0 || disabled || active === indx) return

    const { state } = histories[indx]
    setDisabled(true)
    sessionStorage.setItem('btcd-lc', '-')

    if (state.colorScheme) {
      setColorScheme(state.colorScheme)
    } else {
      checkForPreviousState(indx, setColorScheme, 'colorScheme')
    }

    if (state.breakpoint) {
      setBreakpoint(state.breakpoint)
    } else {
      checkForPreviousState(indx, setBreakpoint, 'breakpoint')
    }

    if (state.fields) {
      setFields(state.fields)
    } else {
      checkForPreviousState(indx, setFields, 'fields')
    }

    if (state.layouts) {
      setLayouts(state.layouts)
    } else {
      checkForPreviousState(indx, setLayouts, 'layouts')
    }

    if (state.styles) {
      setStyles(state.styles)
    } else {
      checkForPreviousState(indx, setStyles, 'styles')
    }

    if (state.themeColors) {
      setThemeColors(state.themeColors)
    } else {
      checkForPreviousState(indx, setThemeColors, 'themeColors')
    }

    if (state.themeVars) {
      setThemeVars(state.themeVars)
    } else {
      checkForPreviousState(indx, setThemeVars, 'themeVars')
    }

    if (state.allThemeColors) {
      setAllThemeColors(state.allThemeColors)
    }

    if (state.allThemeVars) {
      setAllThemeVars(state.allThemeVars)
    }

    if (state.allStyles) {
      setAllStyles(state.allStyles)
    }

    showEventMessages(indx)

    setBuilderHistory(oldHistory => ({ ...oldHistory, active: indx }))
    setBuilderHookStates(prv => ({ ...prv, forceBuilderWidthToBrkPnt: prv.forceBuilderWidthToBrkPnt + 1, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    reCalculateFldHeights()
    setDisabled(false)
  }

  const showEventMessages = indx => {
    if (active > indx) {
      // undo
      toast.success(histories[indx].event, { position: 'bottom-right' })
      return
    }
    // redo
    toast.success(histories[indx].event, { position: 'bottom-right' })
  }

  const checkForPreviousState = (indx, setState, stateName) => {
    for (let i = indx - 1; i >= 0; i -= 1) {
      if (stateName in histories[i].state) {
        setState(histories[i].state[stateName])
        break
      }
    }
  }

  const onShow = () => {
    rowVirtualizer?.current?.scrollToIndex(active)
    setShowHistory(true)
  }

  const onHide = () => {
    setShowHistory(false)
  }

  const itemSizes = histories.map(h => (h.state.fldKey ? 40 : 25))

  return (
    <div>
      <div className={css(OptionToolBarStyle.option_right)}>
        <Tip msg="Undo">
          <button
            data-testid="undo"
            type="button"
            id="builder-undo-btn"
            disabled={!active || disabled}
            className={css([OptionToolBarStyle.icn_btn, ut.icn_hover])}
            onClick={() => handleHistory(active - 1)}
          >
            <UndoIcon size="25" />
          </button>
        </Tip>
        <Tip msg="Redo">
          <button
            data-testid="redo"
            type="button"
            id="builder-redo-btn"
            disabled={(active === (histories.length - 1)) || disabled}
            className={css([OptionToolBarStyle.icn_btn, ut.icn_hover])}
            onClick={() => handleHistory(active + 1)}
          >
            <RedoIcon size="25" />
          </button>
        </Tip>
        <Downmenu
          place="bottom-end"
          onShow={onShow}
          onHide={onHide}
        >
          <button
            data-testid="history-list"
            type="button"
            className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${showHistory ? 'active' : ''}`}
          >
            <EllipsisIcon size="38" />
          </button>

          <div className={css(builderHistoryStyle.menu)}>
            <p className={css(builderHistoryStyle.title)}>
              <span className={css(ut.mr1)}><HistoryIcn size="20" /></span>
              History
            </p>

            {histories.length <= 1 && (
              <span className={css(builderHistoryStyle.secondary)}>
                {__('History Empty')}
              </span>
            )}
            {histories.length > 1 && (
              <VirtualList
                virtualizerRef={rowVirtualizer}
                className={css(builderHistoryStyle.list)}
                itemCount={histories.length}
                itemSizes={itemSizes}
                renderItem={index => (
                  <div className={css(builderHistoryStyle.item)}>
                    <button
                      type="button"
                      className={`${css(builderHistoryStyle.btn)} ${active === index && 'active'} ${active < index && 'unactive'}`}
                      onClick={() => handleHistory(index)}
                      title={histories[index].event}
                    >
                      <span className={css(builderHistoryStyle.subtitle)}>{histories[index].event}</span>
                      {histories[index].state.fldKey && (
                        <span className={css(builderHistoryStyle.fldkey)}>
                          {`Field Key: ${histories[index].state.fldKey}`}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              />
            )}
          </div>
        </Downmenu>
      </div>
    </div>
  )
}
