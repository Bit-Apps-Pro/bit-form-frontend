import produce from 'immer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import TableCheckBox from '../Utilities/TableCheckBox'
import { __ } from '../../Utils/i18nwrap'
import { $integrations, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import DropDown from '../Utilities/DropDown'
import {useFela} from "react-fela";
import ut from "../../styles/2.utilities";

export default function IntegrationWorkflowAction({ lgcGrpInd,
  condGrpInd,
  enableAction,
  checkKeyInArr,
  getValueFromArr }) {
  const {css} = useFela()
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const integrations = useRecoilValue($integrations)

  const setInteg = val => {
    const tmpWorkflows = produce(workflows, draftWorkflow => {
      const { success: draftSuccessActions } = draftWorkflow[lgcGrpInd].conditions[condGrpInd].actions
      for (let i = 0; i < draftSuccessActions.length; i += 1) {
        if (draftSuccessActions[i].type === 'integ') {
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
          isMultiple
          options={integrations?.map((itm, i) => ({
            label: itm.name,
            value: itm.id ? JSON.stringify({ id: itm.id }) : JSON.stringify({ index: i }),
          }))}
          placeholder={__('Select Integation')}
        />
      )}
    </div>
  )
}
