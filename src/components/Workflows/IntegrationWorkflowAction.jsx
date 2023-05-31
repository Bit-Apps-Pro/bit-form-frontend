import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useRecoilState, useAtomValue, useSetRecoilState } from 'recoil'
import { $integrations, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import ut from '../../styles/2.utilities'
import { IS_PRO } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import DropDown from '../Utilities/DropDown'
import TableCheckBox from '../Utilities/TableCheckBox'

export default function IntegrationWorkflowAction({ lgcGrpInd,
  condGrpInd,
  enableAction,
  checkKeyInArr,
  getValueFromArr }) {
  const { css } = useFela()
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const integrations = useAtomValue($integrations)

  const setInteg = val => {
    const tmpWorkflows = create(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      const findInteg = draftSuccessActions.find(v => v.type === 'integ')
      if (findInteg) findInteg.details.id = val.map(itm => itm.value)
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }
  return (
    <div className={css(ut.mt2)}>
      <TableCheckBox
        onChange={e => enableAction(e.target.checked, 'integ')}
        title={__('Integration')}
        checked={checkKeyInArr('integ')}
        className={css(ut.flxc)}
      />
      {checkKeyInArr('integ') && (
        <DropDown
          action={val => setInteg(val)}
          jsonValue
          value={getValueFromArr('integ', 'id')}
          titleClassName={css({ mt: 5, ml: 28, w: '67.5%' })}
          className="w-10"
          isMultiple={IS_PRO}
          options={integrations?.map((itm, i) => ({
            label: itm.name,
            value: itm.id ? JSON.stringify({ id: String(itm.id) }) : JSON.stringify({ index: String(i) }),
          }))}
          placeholder={__('Select Integation')}
        />
      )}
    </div>
  )
}
