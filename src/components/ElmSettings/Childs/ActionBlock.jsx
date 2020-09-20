/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import Button from './Button'
import MtInput from './MtInput'
import MtSelect from './MtSelect'

function ActionBlock({ formFields, fields, action, lgcGrpInd, actionInd, setworkFlows, actionType }) {
  const [fieldVal, setFieldVal] = useState('')

  let fieldKey = ''
  let type = '';

  if (formFields !== null) {
    let fieldLbl = ''
    // eslint-disable-next-line array-callback-return
    formFields.map(itm => {
      if (itm.key === fieldVal) {
        type = itm.type
        fieldLbl = itm.name.replace(/[ ]/gi, '_')
      }
    })

    fieldKey = fieldVal.replace(new RegExp(`\\b${fieldLbl}\\b`, 'g'), '')
  }

  const changeAction = val => {
    setworkFlows(prv => {
      prv[lgcGrpInd].actions[actionInd].action = val
      return [...prv]
    })
  }

  const changeAtnVal = val => {
    setworkFlows(prv => {
      prv[lgcGrpInd].actions[actionInd].val = val
      return [...prv]
    })
  }

  const changeAtnField = val => {
    setFieldVal(val)
    setworkFlows(prv => {
      prv[lgcGrpInd].actions[actionInd].field = val
      return [...prv]
    })
  }

  const delAction = () => {
    setworkFlows(prv => {
      if (prv[lgcGrpInd].actions.length > 1) {
        prv[lgcGrpInd].actions.splice(actionInd, 1)
      }
      return [...prv]
    })
  }

  return (
    <div className="flx pos-rel btcd-logic-blk">
      <MtSelect
        label="Form Fields"
        value={action.field}
        onChange={e => changeAtnField(e.target.value)}
      >
        <option value="">Select One</option>
        {formFields.map(itm => itm.type !== 'file-up' && <option key={`ff-Ab-${itm.key}`} value={itm.key}>{itm.name}</option>)}
      </MtSelect>

      <svg height="35" width="100" className="mt-1">
        <line x1="0" y1="20" x2="50" y2="20" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
      </svg>

      <MtSelect
        label="Action"
        onChange={e => changeAction(e.target.value)}
        value={action.action}
      >
        <option value="">Select One</option>
        <option value="value">Value</option>
        {actionType !== 'onsubmit' && <option value="disable">Disable</option>}
        {actionType !== 'onsubmit' && <option value="enable">Enable</option>}
        {actionType !== 'onsubmit' && <option value="hide">Hide</option>}
        {actionType !== 'onsubmit' && <option value="show">Show</option>}
      </MtSelect>

      {action.action === 'value' && (
        <>
          <svg height="35" width="100" className="mt-1">
            <line x1="0" y1="20" x2="40" y2="20" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
          </svg>

          {type === 'select'
            ? (
              <MultiSelect
                className="msl-wrp-options btcd-paper-drpdwn w-10"
                defaultValue={action.val}
                onChange={changeAtnVal}
                options={fields?.[fieldKey]?.opt}
                customValue={fields?.[fieldKey]?.customOpt}
                singleSelect={!fields?.[fieldKey]?.mul}
              />
            ) : (<MtInput onChange={e => changeAtnVal(e.target.value)} label="Value" value={action.val || ''} />)}
        </>
      )}

      <div className="btcd-li-side-btn mt-2">
        <Button onClick={delAction} icn className="ml-2 sh-sm white">
          <span className="btcd-icn icn-trash-2" />
        </Button>
      </div>
    </div>
  )
}

export default ActionBlock
