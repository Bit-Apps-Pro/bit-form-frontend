import { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $layouts, $selectedFieldId } from '../GlobalStates'
import { compactNewLayoutItem, compactRemovedLayoutItem } from '../Utils/FormBuilderHelper'

export default function FormBuilderHistory({ }) {
  const [disabled, setDisabled] = useState(false)
  const [showHistory, setShowHistory] = useState(null)
  const [fields, setFields] = useRecoilState($fields)
  const [layouts, setLayouts] = useRecoilState($layouts)
  const [builderHistory, setBuilderHistory] = useRecoilState($builderHistory)
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const { active, histories } = builderHistory

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

  const handleHistory = indx => {
    if (indx < 0 || disabled) return
    const actionType = active >= indx ? 'undo' : 'redo'
    let changableHistories = []
    if (actionType === 'undo') {
      changableHistories = histories.slice(indx + 1).reverse()
    } else if (actionType === 'redo') {
      changableHistories = histories.slice(active + 1, indx + 1)
    }

    if (!changableHistories.length) return

    setDisabled(true)

    document.body.style.setProperty('cursor', 'wait', 'important')

    let draftLayouts = { ...layouts }
    const draftFields = { ...fields }
    changableHistories.forEach(({ action, state }) => {
      const historyAction = actionType === 'undo' ? actionsBasedOnType[action] : action
      if (historyAction === 'add_fld') {
        const { fldKey, breakpoint, layout, fldData } = state
        draftLayouts = compactNewLayoutItem(breakpoint, layout, draftLayouts)
        draftFields[fldKey] = fldData
      } else if (historyAction === 'remove_fld') {
        const { fldKey, breakpoint } = state
        draftLayouts = compactRemovedLayoutItem(fldKey, breakpoint, draftLayouts)
        delete draftFields[fldKey]
        setSelectedFieldId(null)
      }
    })

    sessionStorage.setItem('btcd-lc', '-')
    setLayouts(draftLayouts)
    setFields(draftFields)
    document.body.style.setProperty('cursor', 'auto', 'important')
    setBuilderHistory(oldHistory => ({ ...oldHistory, active: indx }))
    setDisabled(false)
  }

  return (
    <div>
      <button type="button" disabled={!active || disabled} onClick={() => handleHistory(active - 1)}>
        undo
      </button>
      <button type="button" disabled={(active === (histories.length - 1)) || disabled} onClick={() => handleHistory(active + 1)}>
        redo
      </button>
      <button type="button" onClick={() => setShowHistory(oldState => !oldState)}>
        ...
      </button>

      {showHistory && (
        <div style={{
          position: 'fixed',
          background: '#000',
          width: '300px',
          zIndex: 1,
          height: '100vh',
          overflow: 'auto',
        }}
        >
          <div>
            {histories.map((history, indx) => (
              <span
                key={`bf-${indx * 2}`}
                role="button"
                tabIndex="-1"
                style={{ display: 'block', width: '100%', padding: 10, cursor: 'pointer', background: active === indx ? 'red' : '', color: active >= indx ? 'white' : 'gray' }}
                onClick={() => handleHistory(indx)}
                onKeyPress={() => handleHistory(indx)}
              >
                {history.event}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
