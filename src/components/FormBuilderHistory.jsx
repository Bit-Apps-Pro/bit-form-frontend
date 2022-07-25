import { default as BitVirtualizedList } from 'bit-virtualized-list'
import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $breakpoint, $builderHistory, $builderHookStates, $colorScheme, $fields, $layouts, $selectedFieldId } from '../GlobalStates/GlobalStates'
import { $styles } from '../GlobalStates/StylesState'
import { $themeColors } from '../GlobalStates/ThemeColorsState'
import { $themeVars } from '../GlobalStates/ThemeVarsState'
import EllipsisIcon from '../Icons/EllipsisIcon'
import HistoryIcn from '../Icons/HistoryIcn'
import RedoIcon from '../Icons/RedoIcon'
import UndoIcon from '../Icons/UndoIcon'
import ut from '../styles/2.utilities'
import builderHistoryStyle from '../styles/builderHistory.style'
import OptionToolBarStyle from '../styles/OptionToolbar.style'
import { reCalculateFieldHeights } from '../Utils/FormBuilderHelper'
import Downmenu from './Utilities/Downmenu'
import Tip from './Utilities/Tip'

const generateItemSize = length => {
  const arr = []
  for (let i = 0; i < length; i += 1) {
    if (i === 0) {
      arr.push(25)
    } else {
      arr.push(40)
    }
  }
  return arr
}

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
  const [fields, setFields] = useRecoilState($fields)
  const [layouts, setLayouts] = useRecoilState($layouts)
  const setColorScheme = useSetRecoilState($colorScheme)
  const setBreakpoint = useSetRecoilState($breakpoint)
  const setStyles = useSetRecoilState($styles)
  const setThemeColors = useSetRecoilState($themeColors)
  const setThemeVars = useSetRecoilState($themeVars)
  const [builderHistory, setBuilderHistory] = useRecoilState($builderHistory)
  const setBuilderHookStates = useSetRecoilState($builderHookStates)
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const [historyListWrpElm, setHistoryListWrpElm] = useState(null)
  const { active, histories } = builderHistory
  // const [scrolIndex, setScrolIndex] = useState(0)
  const virtualizeListRef = useRef(null)

  useEffect(() => {
    if (historyListWrpElm) {
      const rowHeights = generateItemSize(histories.length)
      historyListWrpElm.innerHTML = ''
      virtualizeListRef.current = new BitVirtualizedList(historyListWrpElm, {
        height: 300,
        rowCount: histories.length,
        rowHeight: rowHeights,
        initialIndex: 0,
        renderRow: (index, style) => {
          const div = document.createElement('div')
          div.style = style
          div.key = index
          div.setAttribute('id', 'user')
          div.className = css(builderHistoryStyle.item)

          const btn = document.createElement('button')
          btn.className = `${css(builderHistoryStyle.btn)} ${active === index && 'active'} ${active < index && 'unactive'}`
          btn.onclick = () => handleHistory(index)
          btn.title = histories[index].event

          const span1 = document.createElement('span')
          span1.className = css(builderHistoryStyle.subtitle)
          span1.innerText = histories[index].event
          btn.appendChild(span1)

          if (index > 0) {
            const span2 = document.createElement('span')
            span2.className = css(builderHistoryStyle.fldkey)
            span2.innerText = `Field Key: ${histories[index].state.fldKey}`
            btn.appendChild(span2)
          }
          div.appendChild(btn)
          return div

          // <div key={`bf-${index * 2}`} id="user" className={css(builderHistoryStyle.item)}>
          //   <button
          //     type="button"
          //     className={`${css(builderHistoryStyle.btn)} ${active === index && 'active'} ${active < index && 'unactive'}`}
          //     onClick={() => handleHistory(index)}
          //     title={histories[index].event}
          //   >
          //     <span className={css(builderHistoryStyle.subtitle)}>{histories[index].event}</span>
          //     {index > 0 && (
          //       <span className={css(builderHistoryStyle.fldkey)}>
          //         {`Field Key: ${histories[index].state.fldKey}`}
          //       </span>
          //     )}
          //   </button>
          // </div>
        },
      })
    }

    // histories.length > 2 && virtualizeList?.setRowCount(histories.length)
  }, [historyListWrpElm, builderHistory])

  useEffect(() => {
    if (virtualizeListRef.current) virtualizeListRef.current.setRowCount(histories.length)
  }, [histories.length])

  useEffect(() => {
    document.addEventListener('keypress', handleUndoRedoShortcut)

    return () => document.removeEventListener('keypress', handleUndoRedoShortcut)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, disabled])

  const handleHistory = indx => {
    if (indx < 0 || disabled) return

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
    setBuilderHookStates(prv => ({ ...prv, forceBuilderWidthToBrkPnt: prv.forceBuilderWidthToBrkPnt + 1 }))

    if (state.layouts) {
      setLayouts(state.layouts)
    } else {
      checkForPreviousState(indx, setLayouts, 'layouts')
    }

    if (state.fields) {
      setFields(state.fields)
    } else {
      checkForPreviousState(indx, setFields, 'fields')
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

    setBuilderHistory(oldHistory => ({ ...oldHistory, active: indx }))
    reCalculateFieldHeights()
    setDisabled(false)
    // virtualizeListRef.current.setRowCount(histories.length)
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
    console.log('acitve', active)
    if (virtualizeListRef.current) virtualizeListRef.current.scrollToIndex(active, 'start')
    setShowHistory(true)
  }

  const onHide = () => {
    setShowHistory(false)
    if (virtualizeListRef.current) virtualizeListRef.current.scrollToIndex(active, 'start')
  }

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
                no data found
              </span>
            )}
            {
              histories.length > 1 && (
                <div ref={setHistoryListWrpElm} className={css(builderHistoryStyle.list)}>

                  {/* <VirtualList
                    width="100%"
                    height={200}
                    itemCount={histories.length || 1}
                    itemSize={histories.length ? generateItemSize() : 0}
                    scrollToIndex={active}
                    renderItem={({ index, style }) => (
                      <div key={`bf-${index * 2}`} id="user" className={css(builderHistoryStyle.item)} style={style}>
                        <button
                          type="button"
                          className={`${css(builderHistoryStyle.btn)} ${active === index && 'active'} ${active < index && 'unactive'}`}
                          onClick={() => handleHistory(index)}
                          title={histories[index].event}
                        >
                          <span className={css(builderHistoryStyle.subtitle)}>{histories[index].event}</span>
                          {index > 0 && (
                            <span className={css(builderHistoryStyle.fldkey)}>
                              {`Field Key: ${histories[index].state.fldKey}`}
                            </span>
                          )}
                        </button>
                      </div>
                    )}

                  /> */}
                  {/* {histories.map((history, indx) => (
                    <li key={`bf-${indx * 2}`} className={css(builderHistoryStyle.item)}>
                      <button
                        type="button"
                        className={`${css(builderHistoryStyle.btn)} ${active === indx && 'active'} ${active < indx && 'unactive'}`}
                        onClick={() => handleHistory(indx)}
                        title={history.event}
                      >
                        <span className={css(builderHistoryStyle.subtitle)}>{history.event}</span>
                        {indx > 0 && <span className={css(builderHistoryStyle.fldkey)}>{history.state.fldKey}</span>}
                      </button>
                    </li>
                  ))} */}
                </div>
              )
            }

          </div>
        </Downmenu>
      </div>
    </div>
  )
}
