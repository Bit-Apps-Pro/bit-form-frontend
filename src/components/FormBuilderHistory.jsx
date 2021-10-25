import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Scrollbars from 'react-custom-scrollbars-2'
import { $builderHelperStates, $builderHistory, $fields, $layouts, $selectedFieldId } from '../GlobalStates'
import EllipsisIcon from '../Icons/EllipsisIcon'
import RedoIcon from '../Icons/RedoIcon'
import UndoIcon from '../Icons/UndoIcon'
import HistoryIcn from '../Icons/HistoryIcn'
import ut from '../styles/2.utilities'
import builderHistoryStyle from '../styles/builderHistory.style'
import OptionToolBarStyle from '../styles/OptionToolbar.style'
import { compactNewLayoutItem, filterLayoutItem } from '../Utils/FormBuilderHelper'
import Downmenu from './Utilities/Downmenu'
import Tip from './Utilities/Tip'
import { deepCopy } from '../Utils/Helpers'
import VirtualList from 'react-tiny-virtual-list'

export default function FormBuilderHistory({ }) {
  const { css } = useFela()
  const [disabled, setDisabled] = useState(false)
  const [showHistory, setShowHistory] = useState(null)
  const [fields, setFields] = useRecoilState($fields)
  const [layouts, setLayouts] = useRecoilState($layouts)
  const [builderHistory, setBuilderHistory] = useRecoilState($builderHistory)
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const { active, histories } = builderHistory
  const setBuilderHelpers = useSetRecoilState($builderHelperStates)
  const [scrolIndex, setScrolIndex] = useState(0)

  const handleUndoRedoShortcut = e => {
    if (e.target.tagName !== 'INPUT' && e.ctrlKey) {
      let action = ''
      if (e.key.toLowerCase() === 'z') {
        action = 'undo'
      } else if (e.key.toLowerCase() === 'y') {
        action = 'redo'
      }
      if (action) {
        e.preventDefault()
        const newActive = action === 'undo' ? active - 1 : active + 1
        handleHistory(newActive)
        return false
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleUndoRedoShortcut)

    return () => document.removeEventListener('keydown', handleUndoRedoShortcut)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, disabled])

  const actionsBasedOnType = {
    add_fld: 'remove_fld',
    remove_fld: 'add_fld',
  }

  // const handleHistory = indx => {
  //   if (indx < 0 || disabled) return
  //   const actionType = active >= indx ? 'undo' : 'redo'
  //   let changableHistories = []
  //   if (actionType === 'undo') {
  //     changableHistories = histories.slice(indx + 1).reverse()
  //   } else if (actionType === 'redo') {
  //     changableHistories = histories.slice(active + 1, indx + 1)
  //   }

  //   if (!changableHistories.length) return

  //   setDisabled(true)

  //   let draftLayouts = { ...layouts }
  //   const draftFields = { ...fields }
  //   changableHistories.forEach(({ action, state }) => {
  //     const historyAction = actionType === 'undo' ? actionsBasedOnType[action] : action
  //     if (historyAction === 'add_fld') {
  //       const { fldKey, breakpoint, layout, fldData } = state
  //       draftLayouts = compactNewLayoutItem(breakpoint, layout, draftLayouts)
  //       draftFields[fldKey] = fldData
  //     } else if (historyAction === 'remove_fld') {
  //       const { fldKey } = state
  //       draftLayouts = filterLayoutItem(fldKey, draftLayouts)
  //       delete draftFields[fldKey]
  //       setSelectedFieldId(null)
  //     }
  //   })

  //   sessionStorage.setItem('btcd-lc', '-')
  //   setLayouts(draftLayouts)
  //   setFields(draftFields)
  //   setBuilderHistory(oldHistory => ({ ...oldHistory, active: indx }))
  //   setDisabled(false)
  // }

  const handleHistory = indx => {
    if (indx < 0 || disabled) return

    const { state } = histories[indx]

    console.log('History', indx, state)

    // setDisabled(true)
    sessionStorage.setItem('btcd-lc', '-')
    if (state.layouts) {
      setLayouts(state.layouts)
      // setBuilderHelpers(prvState => ({ ...prvState, reRenderGridLayoutByRootLay: prvState.reRenderGridLayoutByRootLay + 1 }))
    } else {
      checkedState(indx, setLayouts, 'layouts')
    }
    setBuilderHelpers(prvState => ({ ...prvState, reRenderGridLayoutByRootLay: prvState.reRenderGridLayoutByRootLay + 1 }))

    if (state.fields) {
      setFields(state.fields)
    } else {
      checkedState(indx, setFields, 'fields')
    }

    setBuilderHistory(oldHistory => ({ ...oldHistory, active: indx }))
    setDisabled(false)
  }

  const checkedState = (indx, setState, layer) => {
    for (let i = indx - 1; i >= 0; i -= 1) {
      if (layer in histories[i].state) {
        setState(histories[i].state[layer])
        break
      }
    }
  }
  const generateItemSize = () => {
    const arr = []
    for(let i = 0; i < histories.length; i++) {
      if(i === 0) {
        arr.push(30)
      } else {
        arr.push(40)
      }
    }
    return arr
  }

  return (
    <div>
      <div className={css(OptionToolBarStyle.option_right)}>
        <Tip msg="Undo">
          <button type="button" disabled={!active || disabled} className={css([OptionToolBarStyle.icn_btn, ut.icn_hover])} onClick={() => handleHistory(active - 1)}>
            <UndoIcon size="25" />
          </button>
        </Tip>
        <Tip msg="Redo">
          <button type="button" disabled={(active === (histories.length - 1)) || disabled} className={css([OptionToolBarStyle.icn_btn, ut.icn_hover])} onClick={() => handleHistory(active + 1)}>
            <RedoIcon size="25" />
          </button>
        </Tip>
        <Downmenu
          place="bottom-end"
          onShow={() => setShowHistory(true)}
          onHide={() => setShowHistory(false)}
        >
          <button type="button" className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${showHistory ? 'active' : ''}`}>
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
                <div className={css(builderHistoryStyle.list)}>
                  <VirtualList
                    // width="100%"
                    height={200}
                    itemCount={histories.length || 1}
                    itemSize={histories.length ? generateItemSize() : 0}
                    scrollToIndex={histories.length ? scrolIndex : 0}
                    renderItem={({ index, style }) => (
                      <div key={`bf-${index * 2}`} className={css(builderHistoryStyle.item)} style={style}>
                        <button
                          type="button"
                          className={`${css(builderHistoryStyle.btn)} ${active === index && 'active'} ${active < index && 'unactive'}`}
                          onClick={() => handleHistory(index)}
                          title={histories[index].event}
                        >
                          <span className={css(builderHistoryStyle.subtitle)}>{histories[index].event}</span>
                          {index > 0 && <span className={css(builderHistoryStyle.fldkey)}>Field Key: {histories[index].state.fldKey}</span>}
                        </button>
                      </div>
                    )}

                  />
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
