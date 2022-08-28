import produce from 'immer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useFela } from 'react-fela'
import TableCheckBox from '../Utilities/TableCheckBox'
import { __ } from '../../Utils/i18nwrap'
import DropDown from '../Utilities/DropDown'
import { $confirmations, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'

export default function WebhookWorkflowAction({ lgcGrpInd,
  condGrpInd,
  enableAction,
  checkKeyInArr,
  getValueFromArr }) {
  const { css } = useFela()
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const confirmations = useRecoilValue($confirmations)

  const setWebHooks = val => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      for (let i = 0; i < draftSuccessActions.length; i += 1) {
        if (draftSuccessActions[i].type === 'webHooks') {
          draftSuccessActions[i].details.id = val.map(itm => itm.value)
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
        onChange={e => enableAction(e.target.checked, 'webHooks')}
        title={__('Web Hook')}
        checked={checkKeyInArr('webHooks')}
        className={css(ut.flxc)}
      />
      {checkKeyInArr('webHooks') && (
        <DropDown
          action={val => setWebHooks(val)}
          jsonValue
          value={getValueFromArr('webHooks', 'id')}
          titleClassName={css({ mt: 5, ml: 28, w: '67.5%' })}
          className="w-10"
          isMultiple
          options={confirmations?.type?.webHooks?.map((itm, i) => ({
            label: itm.title,
            value: itm.id ? JSON.stringify({ id: itm.id }) : JSON.stringify({ index: i }),
          }))}
          placeholder={__('Select Hooks to Call')}
        />
      )}
    </div>
  )
}
