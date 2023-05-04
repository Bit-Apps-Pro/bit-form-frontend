import { produce } from 'immer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useFela } from 'react-fela'
import TableCheckBox from '../Utilities/TableCheckBox'
import { __ } from '../../Utils/i18nwrap'
import { $confirmations, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'

export default function SuccessMsgWorkflowAction({ lgcGrpInd,
  condGrpInd,
  enableAction,
  checkKeyInArr,
  getValueFromArr }) {
  const { css } = useFela()
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const confirmations = useRecoilValue($confirmations)

  const setSuccessMsg = val => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      const findSuccessMsg = draftSuccessActions.find(v => v.type === 'successMsg')
      if (findSuccessMsg) findSuccessMsg.details.id = val
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }
  return (
    <div className={css(ut.mt2)}>
      <TableCheckBox
        onChange={e => enableAction(e.target.checked, 'successMsg')}
        title={__('Success Message')}
        checked={checkKeyInArr('successMsg')}
        className={css(ut.flxc)}
      />
      {checkKeyInArr('successMsg') && (
        <div className={css({ mt: 5, ml: 28 })}>
          <select
            className="btcd-paper-inp w-7"
            onChange={e => setSuccessMsg(e.target.value)}
            value={getValueFromArr('successMsg', 'id')}
          >
            <option value="">{__('Select Message')}</option>
            {confirmations?.type?.successMsg?.map((itm, i) => (
              <option
                key={`sm-${i + 2.3}`}
                value={itm.id ? JSON.stringify({ id: String(itm.id) }) : JSON.stringify({ index: String(i) })}
              >
                {itm.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
