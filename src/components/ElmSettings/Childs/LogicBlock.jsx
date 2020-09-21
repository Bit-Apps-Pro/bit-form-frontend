import React from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import MtSelect from './MtSelect'
import MtInput from './MtInput'
import Button from './Button'
import 'react-multiple-select-dropdown-lite/dist/index.css'

function LogicBlock({ fieldVal, formFields, fields, delLogic, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd, value, addInlineLogic, changeLogic, logicValue, changeValue, changeFormField }) {
  let type = ''
  let fieldLbl = ''
  if (formFields !== null) {
    // eslint-disable-next-line array-callback-return
    formFields.map(itm => {
      if (itm.key === fieldVal) {
        if (itm.type.match(/^(check|radio)$/)) {
          type = 'text'
        } else {
          type = itm.type
        }
        fieldLbl = itm.name.replaceAll(/[\`\~\!\@\#\$\'\.\s\?\+\-\*\&\|\/\!\\]/g, '_')
      }
    })
  }

  const fieldKey = fieldVal.replace(new RegExp(`\\b${fieldLbl}\\b`, 'g'), '')

  return (
    <div className="flx pos-rel btcd-logic-blk">
      <MtSelect
        label="Form Fields"
        value={fieldVal !== undefined && fieldVal}
        style={{ width: 720 }}
        onChange={e => changeFormField(e.target.value, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)}
      >
        <option value="">Select Form Field</option>
        {formFields.map(itm => !itm.type.match(/^(file-up|recaptcha)$/) && <option key={`ff-lb-${itm.key}`} value={itm.key}>{itm.name}</option>)}
      </MtSelect>

      <svg height="35" width="100" className="mt-1">
        {/* <circle cx="0" cy="20" r="3" fill="#b9c5ff" /> */}
        <line x1="0" y1="20" x2="40" y2="20" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
        {/* <circle cx="31" cy="20" r="3" fill="#b9c5ff" /> */}
      </svg>

      <MtSelect
        label="Logic"
        value={logicValue}
        style={{ width: 400 }}
        onChange={e => changeLogic(e.target.value, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)}
        className="w-4"
      >
        <option value="">Select One</option>
        <option value="equal">Equal</option>
        <option value="not_equal">Not Equal</option>
        <option value="null">Is Null</option>
        <option value="not_null">Is Not Null</option>
        {!type.match(/^(date|time|datetime|month|week)$/) && <option value="contain">Contain</option>}
        {!type.match(/^(date|time|datetime|month|week)$/) && <option value="not_contain">Not Contain</option>}
        {!type.match(/^(color|url|password|email|text)$/) && <option value="greater">Greater Than</option>}
        {!type.match(/^(color|url|password|email|text)$/) && <option value="less">Less Than</option>}
        {!type.match(/^(color|url|password|email|text)$/) && <option value="greater_or_equal">Greater Than or Equal</option>}
        {!type.match(/^(color|url|password|email|text)$/) && <option value="less_or_equal">Less Than or Equal</option>}
        {!type.match(/^(color|url|password|email|date|time|datetime|month|week)$/) && <option value="start_with">Start With</option>}
        {!type.match(/^(color|url|password|email|date|time|datetime|month|week)$/) && <option value="end_with">End With</option>}
      </MtSelect>

      <svg height="35" width="100" className="mt-1">
        {/* <circle cx="0" cy="20" r="3" fill="#b9c5ff" /> */}
        <line x1="0" y1="20" x2="40" y2="20" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
        {/* <circle cx="31" cy="20" r="3" fill="#b9c5ff" /> */}
      </svg>

      {type === 'select'
        ? (
          <MultiSelect
            className="msl-wrp-options btcd-paper-drpdwn w-10"
            defaultValue={value}
            onChange={e => changeValue(e, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)}
            options={fields[fieldKey].opt}
            customValue
          />
        ) : (
          <MtInput
            label="Value"
            type={type}
            disabled={logicValue === 'null' || logicValue === 'not_null'}
            onChange={e => changeValue(e.target.value, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)}
            value={value}
          />
        )}

      <div className="btcd-li-side-btn">
        <Button onClick={() => delLogic(lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)} icn className="ml-2 white mr-2 sh-sm">
          <span className="btcd-icn icn-trash-2" />
        </Button>
        <Button onClick={() => addInlineLogic('and', lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)} className="white mr-2 sh-sm">
          <span className="btcd-icn icn-clear icn-rotate-45 mr-1" />
          AND
        </Button>
        <Button onClick={() => addInlineLogic('or', lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)} className="white sh-sm">
          <span className="btcd-icn icn-clear icn-rotate-45 mr-1" />
          OR
        </Button>
      </div>
    </div>
  )
}

export default LogicBlock
