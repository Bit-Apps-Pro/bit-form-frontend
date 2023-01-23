/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { __ } from '../../Utils/i18nwrap'
import Button from '../Utilities/Button'
// import MtInput from './MtInput'
import { $fields, $fieldsArr, $updateBtn, $workflows } from '../../GlobalStates/GlobalStates'
import TrashIcn from '../../Icons/TrashIcn'
import CalculatorField from '../Utilities/CalculationField/CalculatorField'
import MtSelect from '../Utilities/MtSelect'

function ActionBlock({ action, lgcGrp, lgcGrpInd, actionInd, condGrpInd, actionType }) {
  const setWorkflows = useSetRecoilState($workflows)
  const fields = useRecoilValue($fields)
  const formFields = useRecoilValue($fieldsArr)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const { css } = useFela()
  let fieldKey = ''
  let type = ''

  if (formFields !== null) {
    formFields.map(itm => {
      if (itm.key === action.field) {
        type = itm.type
        fieldKey = itm.key
      }
    })
  }

  const getOptions = () => {
    if (type === 'razorpay') return
    let options
    options = fields?.[fieldKey]?.opt?.map(opt => ({ label: opt.lbl, value: (opt.val || opt.lbl) }))
    if (type === 'select') {
      const selectOpt = fields?.[fieldKey]?.optionsList[fields?.[fieldKey].config.activeList]
      options = Object.values(selectOpt)[0].map(opt => ({ label: opt.lbl, value: (opt.val || opt.lbl) }))
    }
    if (!options) {
      options = fields?.[fieldKey]?.options?.map(opt => ({ label: opt.lbl, value: (opt.val || opt.code || opt.i || opt.lbl) }))
    }

    return options
  }

  const changeAction = val => {
    setWorkflows(prv => produce(prv, draft => {
      const { fields: fldActions } = draft[lgcGrpInd].conditions[condGrpInd].actions
      fldActions[actionInd].action = val
    }))
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const changeAtnVal = val => {
    setWorkflows(prv => produce(prv, draft => {
      const { fields: fldActions } = draft[lgcGrpInd].conditions[condGrpInd].actions
      fldActions[actionInd].val = val
    }))
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const changeAtnField = val => {
    setWorkflows(prv => produce(prv, draft => {
      const { fields: fldActions } = draft[lgcGrpInd].conditions[condGrpInd].actions
      fldActions[actionInd].field = val
      fldActions[actionInd].val = ''
    }))
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const delAction = () => {
    setWorkflows(prv => produce(prv, draft => {
      const { fields: fldActions } = draft[lgcGrpInd].conditions[condGrpInd].actions
      if (fldActions.length > 1) {
        fldActions.splice(actionInd, 1)
      }
    }))
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const isNotFileUpField = fields[action.field]?.typ !== 'file-up'
  const isNotButtonField = fields[action.field]?.typ !== 'button'
  const isNotSubmitAction = actionType !== 'onsubmit'
  const isNotValidateAction = actionType !== 'onvalidate'

  return (
    <div className="flx pos-rel btcd-logic-blk">
      <MtSelect
        label="Form Fields"
        value={action.field || ''}
        onChange={e => changeAtnField(e.target.value)}
        style={{ width: 720 }}
      >
        <option value="">{__('Select One')}</option>
        {formFields.map(itm => (
          <option
            key={`ff-Ab-${itm.key}`}
            value={itm.key}
          >
            {itm.name}
          </option>
        ))}
      </MtSelect>

      <div className={css({ w: 100, flx: 'align-center', h: 35, mt: 5 })}>
        <div className={css({ w: '100%', bd: '#b9c5ff', h: '0.5px' })} />
      </div>

      <MtSelect
        label="Action"
        onChange={e => changeAction(e.target.value)}
        value={action.action || ''}
        style={{ width: 400 }}
        className="w-4"
      >
        <option value="">{__('Select One')}</option>
        {(!isNotButtonField && lgcGrp.action_type === 'oninput') && (
          <option value="click">{__('Click')}</option>
        )}
        {(isNotFileUpField && isNotButtonField && isNotValidateAction)
          && <option value="value">{__('Value')}</option>}
        {(isNotSubmitAction && isNotValidateAction) && <option value="disable">{__('Disable')}</option>}
        {(isNotSubmitAction && isNotValidateAction && isNotFileUpField && isNotButtonField)
          && <option value="readonly">{__('Readonly')}</option>}
        {(isNotSubmitAction && isNotValidateAction) && <option value="enable">{__('Enable')}</option>}
        {(isNotSubmitAction && isNotValidateAction) && <option value="hide">{__('Hide')}</option>}
        {(isNotSubmitAction && isNotValidateAction) && <option value="show">{__('Show')}</option>}
        {actionType === 'onvalidate' && <option value="required">{__('Required')}</option>}
        {actionType === 'onvalidate' && <option value="notrequired">{__('Not Required')}</option>}
      </MtSelect>

      {action.action === 'value' && (
        <>
          <div className={css({ w: 100, flx: 'align-center', h: 35, mt: 5 })}>
            <div className={css({ w: '100%', bd: '#b9c5ff', h: '0.5px' })} />
          </div>
          <CalculatorField
            label="Value"
            type={type.match(/select|check|radio|number/g) ? 'text' : type}
            onChange={changeAtnVal}
            value={action.val || ''}
            options={getOptions()}
          />
        </>
      )}
      <div className="btcd-li-side-btn">
        <Button onClick={delAction} icn className="ml-2 sh-sm white">
          <TrashIcn />
        </Button>
      </div>
    </div>
  )
}

export default ActionBlock
