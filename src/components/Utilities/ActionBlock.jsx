/* eslint-disable no-param-reassign */
import produce from 'immer'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useFela } from 'react-fela'
import { __ } from '../../Utils/i18nwrap'
import Button from './Button'
import MtInput from './MtInput'
import MtSelect from './MtSelect'
import TrashIcn from '../../Icons/TrashIcn'
import { $fields, $fieldsArr, $updateBtn } from '../../GlobalStates'

function ActionBlock({ action, lgcGrpInd, actionInd, setworkFlows, actionType }) {
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

  const changeAction = val => {
    setworkFlows(prv => produce(prv, draft => { draft[lgcGrpInd].actions[actionInd].action = val }))
    setUpdateBtn({ unsaved: true })
  }

  const changeAtnVal = val => {
    setworkFlows(prv => produce(prv, draft => { draft[lgcGrpInd].actions[actionInd].val = val }))
    setUpdateBtn({ unsaved: true })
  }

  const changeAtnField = val => {
    setworkFlows(prv => produce(prv, draft => {
      draft[lgcGrpInd].actions[actionInd].field = val
      draft[lgcGrpInd].actions[actionInd].val = ''
    }))
    setUpdateBtn({ unsaved: true })
  }

  const delAction = () => {
    setworkFlows(prv => produce(prv, draft => {
      if (draft[lgcGrpInd].actions.length > 1) {
        draft[lgcGrpInd].actions.splice(actionInd, 1)
      }
    }))
    setUpdateBtn({ unsaved: true })
  }

  const isNotFileUpField = fields[action.field]?.typ !== 'file-up'
  const isNotButtonField = fields[action.field]?.typ !== 'button'
  const isNotSubmitAction = actionType !== 'onsubmit'
  const isNotValidateAction = actionType !== 'onvalidate'

  const btnFields = Object.entries(fields).filter(fld => fld[1].typ === 'button').map(fl => ({ key: fl[0], name: fl[1].txt }))

  return (
    <div className="flx pos-rel btcd-logic-blk">
      <MtSelect
        label="Form Fields"
        value={action.field || ''}
        onChange={e => changeAtnField(e.target.value)}
        style={{ width: 720 }}
      >
        <option value="">{__('Select One', 'bitform')}</option>
        {[...formFields, ...btnFields].map(itm => <option key={`ff-Ab-${itm.key}`} value={itm.key}>{itm.name}</option>)}
      </MtSelect>

      <div className={css({ w: 100, flx: 'align-center', h: 35, mt: 5 })}>
        <div className={css({ w: '100%', bd: '#dce2ff', h: 2 })} />
      </div>

      <MtSelect
        label="Action"
        onChange={e => changeAction(e.target.value)}
        value={action.action || ''}
        style={{ width: 400 }}
        className="w-4"
      >
        <option value="">{__('Select One', 'bitform')}</option>
        {(isNotFileUpField && isNotButtonField && isNotValidateAction) && <option value="value">{__('Value', 'bitform')}</option>}
        {(isNotSubmitAction && isNotValidateAction) && <option value="disable">{__('Disable', 'bitform')}</option>}
        {(isNotSubmitAction && isNotValidateAction && isNotFileUpField && isNotButtonField) && <option value="readonly">{__('Readonly', 'bitform')}</option>}
        {(isNotSubmitAction && isNotValidateAction) && <option value="enable">{__('Enable', 'bitform')}</option>}
        {(isNotSubmitAction && isNotValidateAction) && <option value="hide">{__('Hide', 'bitform')}</option>}
        {(isNotSubmitAction && isNotValidateAction) && <option value="show">{__('Show', 'bitform')}</option>}
        {actionType === 'onvalidate' && <option value="required">{__('Required', 'bitform')}</option>}
        {actionType === 'onvalidate' && <option value="notrequired">{__('Not Required', 'bitform')}</option>}
      </MtSelect>

      {action.action === 'value' && (
        <>
          <div className={css({ w: 100, flx: 'align-center', h: 35, mt: 5 })}>
            <div className={css({ w: '100%', bd: '#dce2ff', h: 2 })} />
          </div>

          {type === 'select' || type === 'check' || type === 'radio'
            ? (
              <MultiSelect
                className="msl-wrp-options btcd-paper-drpdwn w-10"
                defaultValue={action.val || ''}
                onChange={changeAtnVal}
                options={type === 'select' ? fields?.[fieldKey]?.opt : (type === 'check' || type === 'radio') && fields?.[fieldKey]?.opt?.map(opt => ({ label: opt.lbl, value: (opt.val || opt.lbl) }))}
                customValue={fields?.[fieldKey]?.customOpt}
                // eslint-disable-next-line no-nested-ternary
                singleSelect={type === 'select' ? !fields?.[fieldKey]?.mul : type === 'check' ? false : type === 'radio' && true}
              />
            )
            : (
              <MtInput onChange={e => changeAtnVal(e.target.value)} label="Value" value={action.val || ''} />
            )}
        </>
      )}

      <div className="btcd-li-side-btn mt-2">
        <Button onClick={delAction} icn className="ml-2 sh-sm white">
          <TrashIcn />
        </Button>
      </div>
    </div>
  )
}

export default ActionBlock
