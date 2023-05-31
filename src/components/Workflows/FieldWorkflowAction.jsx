import { create } from 'mutative'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useFela } from 'react-fela'
import ActionBlock from './ActionBlock'
import Button from '../Utilities/Button'
import CloseIcn from '../../Icons/CloseIcn'
import { $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'
import Tip from '../Utilities/Tip'

export default function FieldWorkflowAction({ lgcGrp, lgcGrpInd, condGrp, condGrpInd }) {
  const { css } = useFela()
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const { fields: fldActions } = condGrp.actions

  const addAction = () => {
    const tmpWorkflows = create(workflows, draftWorkflow => {
      const { fields: tmpFldActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      let actionVal = 'disable'
      if (draftWorkflow[lgcGrpInd].action_type === 'onsubmit') {
        actionVal = 'value'
      }
      tmpFldActions.push({ field: '', action: actionVal })
    })
    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  return (
    <div className={css(ut.mt2)}>
      <div className={css(actionStyle.title)}><b className="txt-dp">Field Actions</b></div>
      {fldActions.map((action, actionInd) => (
        <div key={`atn-${actionInd + 22}`} className={`mt-2 ${condGrp.cond_type === 'always' && 'ml-4'}`}>
          <ActionBlock
            lgcGrp={lgcGrp}
            lgcGrpInd={lgcGrpInd}
            condGrpInd={condGrpInd}
            action={action}
            actionInd={actionInd}
            actionType={lgcGrp.action_type}
          />
        </div>
      ))}
      <Tip msg="Add More">
        <Button
          onClick={() => addAction()}
          icn
          className={`blue sh-sm mt-2 ${condGrp.cond_type === 'always' && 'ml-4'}`}
        >
          <CloseIcn size="14" className="icn-rotate-45" />
        </Button>
      </Tip>
    </div>
  )
}

const actionStyle = {
  title: { mb: 7 },
  chip: {
    mnh: 30,
    dy: 'flex !important',
    ai: 'center',
    w: 60,
    mt: 9,
    mb: 9,
  },
}
