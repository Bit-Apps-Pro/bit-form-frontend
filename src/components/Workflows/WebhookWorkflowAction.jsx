import { create } from 'mutative'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useFela } from 'react-fela'
import TableCheckBox from '../Utilities/TableCheckBox'
import { __ } from '../../Utils/i18nwrap'
import DropDown from '../Utilities/DropDown'
import { $confirmations, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'
import { IS_PRO } from '../../Utils/Helpers'

export default function WebhookWorkflowAction({ lgcGrpInd,
  condGrpInd,
  enableAction,
  checkKeyInArr,
  getValueFromArr }) {
  const { css } = useFela()
  const [workflows, setWorkflows] = useAtom($workflows)
  const setUpdateBtn = useSetAtom($updateBtn)
  const confirmations = useAtomValue($confirmations)

  const setWebHooks = val => {
    const tmpWorkflows = create(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      const findWebhook = draftSuccessActions.find(action => action.type === 'webHooks')
      if (findWebhook) findWebhook.details.id = val.map(itm => itm.value)
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
          isMultiple={IS_PRO}
          options={confirmations?.type?.webHooks?.map((itm, i) => ({
            label: itm.title,
            value: itm.id ? JSON.stringify({ id: String(itm.id) }) : JSON.stringify({ index: String(i) }),
          }))}
          placeholder={__('Select Hooks to Call')}
        />
      )}
    </div>
  )
}
