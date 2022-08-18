import produce from 'immer'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import { __ } from '../../Utils/i18nwrap'
import CheckBox from '../Utilities/CheckBox'

export default function WorkflowRunner({ lgcGrpInd, lgcGrp }) {
  const [workflows, setWorkflows] = useRecoilState($workflows)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  const changeActionRun = typ => {
    const tmpWorkflows = produce(workflows, draft => {
      if (typ === 'delete') {
        delete draft[lgcGrpInd].action_type
      } else if (draft[lgcGrpInd].action_type === undefined) {
        draft[lgcGrpInd].action_type = 'onload'
      }
      draft[lgcGrpInd].action_run = typ
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const changeActionType = typ => {
    const tmpWorkflows = produce(workflows, draft => {
      if (typ === 'onsubmit') {
        draft[lgcGrpInd].conditions.forEach(cond => {
          const len = cond.actions.fields.length
          for (let i = 0; i < len; i += 1) {
            cond.actions.fields[i].action = 'value'
          }
        })
      } else if (typ === 'onvalidate') {
        draft[lgcGrpInd].action_behaviour = 'cond'
      }
      draft[lgcGrpInd].action_type = typ
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const changeActionBehave = typ => {
    const tmpWorkflows = produce(workflows, draftWorkflows => {
      draftWorkflows[lgcGrpInd].action_behaviour = typ
      draftWorkflows[lgcGrpInd].conditions[0].cond_type = typ === 'always' ? 'always' : 'if'
      draftWorkflows[lgcGrpInd].conditions = [draftWorkflows[lgcGrpInd].conditions[0]]
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  return (
    <>
      {/* action run when */}
      <div>
        <b className="txt-dp"><small>Action Run When:</small></b>
        <br />
        <div className="ml-2">
          <CheckBox
            radio
            onChange={e => changeActionRun(e.target.value, lgcGrpInd)}
            title={<small className="txt-dp">{__('Record Create/Edit')}</small>}
            checked={lgcGrp.action_run === 'create_edit'}
            value="create_edit"
          />
          <CheckBox
            radio
            onChange={e => changeActionRun(e.target.value, lgcGrpInd)}
            title={<small className="txt-dp">{__('Record Create')}</small>}
            checked={lgcGrp.action_run === 'create'}
            value="create"
          />
          <CheckBox
            radio
            onChange={e => changeActionRun(e.target.value, lgcGrpInd)}
            title={<small className="txt-dp">{__('Record Edit')}</small>}
            checked={lgcGrp.action_run === 'edit'}
            value="edit"
          />
          <CheckBox
            radio
            onChange={e => changeActionRun(e.target.value, lgcGrpInd)}
            title={<small className="txt-dp">{__('Record Delete')}</small>}
            checked={lgcGrp.action_run === 'delete'}
            value="delete"
          />
        </div>
      </div>
      {/* action effect */}
      {lgcGrp.action_run !== 'delete' && (
        <div>
          <b className="txt-dp"><small>Action Effect:</small></b>
          <br />
          <div className="ml-2">
            <CheckBox
              radio
              onChange={e => changeActionType(e.target.value, lgcGrpInd)}
              title={<small className="txt-dp">{__('On Form Load')}</small>}
              checked={lgcGrp.action_type === 'onload'}
              value="onload"
            />
            <CheckBox
              radio
              onChange={e => changeActionType(e.target.value, lgcGrpInd)}
              title={<small className="txt-dp">{__('On Field Input')}</small>}
              checked={lgcGrp.action_type === 'oninput'}
              value="oninput"
            />
            <CheckBox
              radio
              onChange={e => changeActionType(e.target.value, lgcGrpInd)}
              title={<small className="txt-dp">{__('On Form Validate')}</small>}
              checked={lgcGrp.action_type === 'onvalidate'}
              value="onvalidate"
            />
            <CheckBox
              radio
              onChange={e => changeActionType(e.target.value, lgcGrpInd)}
              title={<small className="txt-dp">{__('On Form Submit')}</small>}
              checked={lgcGrp.action_type === 'onsubmit'}
              value="onsubmit"
            />
          </div>
        </div>
      )}
      {/* action behaviour */}
      <div>
        <b className="txt-dp"><small>Action Behaviour:</small></b>
        <br />
        <div className="ml-2">
          {!lgcGrp?.action_type?.match(/^(onvalidate|oninput)$/) && (
            <CheckBox
              radio
              onChange={e => changeActionBehave(e.target.value, lgcGrpInd)}
              name={`ab-${lgcGrpInd + 121}`}
              title={<small className="txt-dp">{__('Always')}</small>}
              checked={lgcGrp.action_behaviour === 'always'}
              value="always"
            />
          )}
          <CheckBox
            radio
            onChange={e => changeActionBehave(e.target.value, lgcGrpInd)}
            title={<small className="txt-dp">{__('Condition')}</small>}
            checked={lgcGrp.action_behaviour === 'cond'}
            value="cond"
          />
        </div>
      </div>
    </>
  )
}
