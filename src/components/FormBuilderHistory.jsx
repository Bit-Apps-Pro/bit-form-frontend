import produce from 'immer'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $layouts, $selectedFieldId } from '../GlobalStates'
import { compactNewLayoutItem, compactRemovedLayoutItem } from '../Utils/FormBuilderHelper'

export default function FormBuilderHistory({ }) {
  const [builderHistory, setBuilderHistory] = useRecoilState($builderHistory)
  const [layouts, setLayouts] = useRecoilState($layouts)
  const [fields, setFields] = useRecoilState($fields)
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)

  const actionsBasedOnType = {
    add_fld: 'remove_fld',
    remove_fld: 'add_fld',
  }

  console.log({ layouts })

  const handleHistory = indx => {
    const actionType = builderHistory.active >= indx ? 'undo' : 'redo'
    let changableHistories = []
    if (actionType === 'undo') {
      changableHistories = builderHistory.data.slice(indx + 1).reverse()
    } else if (actionType === 'redo') {
      changableHistories = builderHistory.data.slice(builderHistory.active + 1, indx + 1)
    }

    if (!changableHistories.length) return

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
  }

  return (
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
        {builderHistory.data.map((history, indx) => (
          <span
            key={indx}
            role="button"
            tabIndex="-1"
            style={{ display: 'block', width: '100%', padding: 10, cursor: 'pointer', background: builderHistory.active === indx ? 'red' : '', color: builderHistory.active >= indx ? 'white' : 'gray' }}
            onClick={() => handleHistory(indx)}
            onKeyPress={() => handleHistory(indx)}
          >
            {history.event}
          </span>
        ))}
      </div>
    </div>
  )
}
