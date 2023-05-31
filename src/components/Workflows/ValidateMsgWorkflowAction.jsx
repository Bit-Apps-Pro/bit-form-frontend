import { create } from 'mutative'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { __ } from '../../Utils/i18nwrap'
import { $confirmations, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import MtSelect from '../Utilities/MtSelect'

export default function ValidateMsgWorkflowAction({ lgcGrpInd,
  condGrp,
  condGrpInd }) {
  const [workflows, setWorkflows] = useAtom($workflows)
  const setUpdateBtn = useSetAtom($updateBtn)
  const confirmations = useAtomValue($confirmations)
  const { failure: validateAction } = condGrp.actions

  const changeValidateMsg = val => {
    const tmpWorkflows = create(workflows, draftWorkflow => {
      draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions.failure = val
    })
    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  return (
    <MtSelect
      onChange={e => changeValidateMsg(e.target.value)}
      value={validateAction}
      label="Error Message"
      className="w-7 mt-3"
    >
      <option value="">{__('Select Message')}</option>
      {confirmations?.type?.successMsg?.map((itm, i) => (
        <option
          key={`vm-${i + 2.7}`}
          value={itm.id ? JSON.stringify({ id: String(itm.id) }) : JSON.stringify({ index: String(i) })}
        >
          {itm.title}
        </option>
      ))}
    </MtSelect>
  )
}
