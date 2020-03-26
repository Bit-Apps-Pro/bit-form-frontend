import React from 'react'
import MtSelect from './MtSelect'
import MtInput from './MtInput'
import Button from './Button'

function LogicBlock({ fieldVal, formFields, delLogic, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd, value, addInlineLogic, changeLogic, logicValue, changeValue, changeFormField }) {
  let type
  if (formFields !== null) {
    // eslint-disable-next-line array-callback-return
    formFields.map(itm => {
      if (itm.key === fieldVal) {
        type = itm.type
      }
    })
  }

  return (
    <div className="flx pos-rel btcd-logic-blk">
      <MtSelect
        label="Form Fields"
        value={fieldVal !== undefined && fieldVal}
        onChange={e => changeFormField(e.target.value, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)}
      >
        {formFields.map(itm => itm.type !== 'file-up' && <option key={`ff-lb-${itm.key}`} value={itm.key}>{itm.name}</option>)}
      </MtSelect>

      <svg height="35" width="100" className="mt-1">
        {/* <circle cx="0" cy="20" r="3" fill="#b9c5ff" /> */}
        <line x1="0" y1="20" x2="40" y2="20" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
        {/* <circle cx="31" cy="20" r="3" fill="#b9c5ff" /> */}
      </svg>

      <MtSelect
        label="Logic"
        value={logicValue}
        onChange={e => changeLogic(e.target.value, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)}
        className="w-4"
      >
        <option value="equal">Equal</option>
        <option value="not_equal">Not Equal</option>
        <option value="null">Is Null</option>
        <option value="not_null">Is Not Null</option>
        <option value="contain">Contain</option>
        <option value="not_contain">Not Contain</option>
        <option value="greater">Greater Than</option>
        <option value="less">Less Than</option>
        <option value="greater_or_equal">Greater Than or Equal</option>
        <option value="less_or_equal">Less Than or Equal</option>
        <option value="start_with">Start With</option>
        <option value="end_with">End With</option>
      </MtSelect>

      <svg height="35" width="100" className="mt-1">
        {/* <circle cx="0" cy="20" r="3" fill="#b9c5ff" /> */}
        <line x1="0" y1="20" x2="40" y2="20" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
        {/* <circle cx="31" cy="20" r="3" fill="#b9c5ff" /> */}
      </svg>

      <MtInput
        label="Value"
        type={type}
        disabled={logicValue === 'null' || logicValue === 'not_null'}
        onChange={e => changeValue(e.target.value, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)}
        value={value}
      />
      <div className="btcd-li-side-btn">
        <Button onClick={() => delLogic(lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)} icn className="ml-2 sh-sm white mr-2">
          <span className="btcd-icn icn-trash-2" />
        </Button>
        <Button onClick={() => addInlineLogic('and', lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)} className="sh-sm white mr-2">+ AND</Button>
        <Button onClick={() => addInlineLogic('or', lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)} className="sh-sm white">+ OR</Button>
      </div>
    </div>
  )
}

export default LogicBlock
