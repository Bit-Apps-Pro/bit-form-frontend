import produce from 'immer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useFela } from 'react-fela'
import TableCheckBox from '../Utilities/TableCheckBox'
import { __ } from '../../Utils/i18nwrap'
import { $confirmations, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'

export default function RedirectPageWorkflowAction({ lgcGrpInd,
  condGrpInd,
  enableAction,
  checkKeyInArr,
  getValueFromArr }) {
  const { css } = useFela()
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const confirmations = useRecoilValue($confirmations)

  const setRedirectPage = val => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      for (let i = 0; i < draftSuccessActions.length; i += 1) {
        if (draftSuccessActions[i].type === 'redirectPage') {
          draftSuccessActions[i].details.id = val
          break
        }
      }
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  return (
    <div className={css(ut.mt2)}>
      <TableCheckBox
        onChange={e => enableAction(e.target.checked, 'redirectPage')}
        title={__('Redirect URL')}
        checked={checkKeyInArr('redirectPage')}
        className={css(ut.flxc)}
      />
      {checkKeyInArr('redirectPage') && (
        <div className={css({ mt: 5, ml: 28 })}>
          <select
            className="btcd-paper-inp w-7"
            onChange={e => setRedirectPage(e.target.value)}
            value={getValueFromArr('redirectPage', 'id')}
          >
            <option value="">{__('Select Page To Redirect')}</option>
            {confirmations?.type?.redirectPage?.map((itm, i) => (
              <option
                key={`sr-${i + 2.5}`}
                value={itm.id ? JSON.stringify({ id: itm.id }) : JSON.stringify({ index: i })}
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
