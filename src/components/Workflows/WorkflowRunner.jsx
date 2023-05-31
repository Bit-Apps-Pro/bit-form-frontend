import { create } from 'mutative'
import { useAtom, useSetAtom } from 'recoil'
import { $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import { __ } from '../../Utils/i18nwrap'
import { defaultConds } from '../../Utils/StaticData/form-templates/templateProvider'
import CheckBox from '../Utilities/CheckBox'

export default function WorkflowRunner({ lgcGrpInd, lgcGrp }) {
  const [workflows, setWorkflows] = useAtom($workflows)
  const setUpdateBtn = useSetAtom($updateBtn)

  const changeActionRun = typ => {
    const tmpWorkflows = create(workflows, draft => {
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

  const changeActionEffect = typ => {
    const tmpWorkflows = create(workflows, draft => {
      if (typ === 'onsubmit') {
        draft[lgcGrpInd].conditions.forEach(draftCond => {
          const len = draftCond.actions?.fields?.length
          for (let i = 0; i < len; i += 1) {
            draftCond.actions.fields[i].action = 'value'
          }
        })
      }

      draft[lgcGrpInd].action_behaviour = 'cond'
      draft[lgcGrpInd].conditions.forEach(draftCond => {
        if (typ === 'onvalidate') {
          draftCond.actions.failure = ''
          delete draftCond.actions.fields
          delete draftCond.actions.success
        } else {
          draftCond.actions.fields = [{ field: '', action: 'value' }]
          draftCond.actions.success = []
          delete draftCond.actions.failure
        }
      })

      const [cond] = draft[lgcGrpInd].conditions
      cond.cond_type = 'if'
      if (!cond.logics) cond.logics = defaultConds.logics
      draft[lgcGrpInd].action_type = typ
    })

    setWorkflows(tmpWorkflows)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const changeActionBehave = typ => {
    const tmpWorkflows = create(workflows, draftWorkflows => {
      draftWorkflows[lgcGrpInd].action_behaviour = typ
      const [cond] = draftWorkflows[lgcGrpInd].conditions
      cond.cond_type = typ === 'cond' ? 'if' : typ
      if (typ === 'always') delete cond.logics
      else if (typ === 'cond') cond.logics = defaultConds.logics
      draftWorkflows[lgcGrpInd].conditions = [cond]
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
              onChange={e => changeActionEffect(e.target.value)}
              title={<small className="txt-dp">{__('On Form Load')}</small>}
              checked={lgcGrp.action_type === 'onload'}
              value="onload"
            />
            <CheckBox
              radio
              onChange={e => changeActionEffect(e.target.value)}
              title={<small className="txt-dp">{__('On Field Input')}</small>}
              checked={lgcGrp.action_type === 'oninput'}
              value="oninput"
            />
            <CheckBox
              radio
              onChange={e => changeActionEffect(e.target.value)}
              title={<small className="txt-dp">{__('On Form Validate')}</small>}
              checked={lgcGrp.action_type === 'onvalidate'}
              value="onvalidate"
            />
            <CheckBox
              radio
              onChange={e => changeActionEffect(e.target.value)}
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
