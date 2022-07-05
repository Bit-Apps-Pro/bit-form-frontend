import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useRecoilValue } from 'recoil'
import { $fields, $fieldsArr, $bits } from '../../GlobalStates/GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import TrashIcn from '../../Icons/TrashIcn'
import { makeFieldsArrByLabel } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import conditionalLogicsList from '../../Utils/StaticData/ConditionalLogicsList'
import { SmartTagField } from '../../Utils/StaticData/SmartTagField'
import Button from './Button'
import MtInput from './MtInput'
import MtSelect from './MtSelect'

function LogicBlock({ fieldVal, delLogic, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd, value, addInlineLogic, changeLogic, logicValue, changeValue, changeFormField, actionType = null }) {
  const fields = useRecoilValue($fields)
  const formFields = makeFieldsArrByLabel(fields, [], [])
  const bits = useRecoilValue($bits)
  const { isPro } = bits

  let type = ''
  let fldType = ''
  let fieldKey = ''
  formFields?.find?.(itm => {
    if (itm.key === fieldVal) {
      if (itm.type.match(/^(check|radio)$/)) {
        type = 'text'
      } else {
        type = itm.type
      }
      fldType = itm.type
      fieldKey = itm.key

      return true
    }
  })

  const getOptions = () => {
    let options = []

    if (fldType === 'select') {
      options = fields?.[fieldKey]?.opt
    } else {
      options = fields?.[fieldKey]?.opt?.map(opt => ({ label: opt.lbl, value: (opt.val || opt.lbl) }))
    }

    return options
  }
  const customSmartTags = ['_bf_custom_date_format()', '_bf_user_meta_key()', '_bf_query_param()']

  const findFldTypeFromLogicsArr = (fldType, logicsArr) => {
    const foundFieldType = logicsArr.find(itm => {
      if (itm === fldType) return true
      if (!itm.includes('.')) return false
      const firstDot = itm.indexOf('.')
      const fieldType = itm.substring(0, firstDot)
      if (fldType !== fieldType) return false
      const dataProps = itm.substring(firstDot + 1)
      if (!dataProps) return false
      const [propsPath, propValue] = dataProps.split(':')
      const nestedProps = propsPath.split('.')
      const nestedPropsValue = nestedProps.reduce((acc, itm) => acc[itm], fields[fieldKey])
      if (nestedPropsValue === propValue) return true
      return false
    })
    return foundFieldType
  }

  const getLogicsBasedOnFieldType = fldType => {
    if (!fldType) return []
    const logicsArr = Object.entries(conditionalLogicsList)
    return logicsArr.reduce((acc, [key, data]) => {
      if (data.notFields && findFldTypeFromLogicsArr(fldType, data.notFields)) return acc
      if (data.fields) {
        if (findFldTypeFromLogicsArr(fldType, data.fields)) return [...acc, { key, lbl: data.label }]
        return acc
      }
      return [...acc, { key, lbl: data.label }]
    }, [])
  }

  return (
    <div className="flx pos-rel btcd-logic-blk">
      <span className="btcd-logic-chip mr-2">IF</span>
      <MtSelect
        label="Form Fields"
        value={fieldVal || ''}
        style={{ width: 720 }}
        onChange={e => changeFormField(e.target.value, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)}
      >
        <option value="">{__('Select Form Fieldss')}</option>
        {/* {formFields.map(itm => !itm.type.match(/^(file-up|recaptcha)$/) && <option key={`ff-lb-${itm.key}`} value={itm.key}>{itm.name}</option>)} */}
        <optgroup label="Form Fields">
          {formFields.map(itm => !itm.type.match(/^(file-up|recaptcha)$/) && <option key={`ff-lb-${itm.key}`} value={itm.key}>{itm.name}</option>)}
        </optgroup>
        {!actionType?.match(/^(oninput)$/) && (
          <optgroup label={`General Smart Codes ${isPro ? '' : '(PRO)'}`}>
            {isPro && SmartTagField?.map(f => !customSmartTags.includes(f.name) && (
              <option key={`ff-rm-${f.name}`} value={`\${${f.name}}`}>
                {f.label}
              </option>
            ))}
          </optgroup>
        )}

      </MtSelect>

      <svg height="35" width="100" className="mt-1">
        <line x1="0" y1="20" x2="40" y2="20" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
      </svg>

      <MtSelect
        label="Logic"
        value={logicValue || ''}
        onChange={e => changeLogic(e.target.value, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)}
        className="w-5"
      >
        <option value="">{__('Select One')}</option>
        {getLogicsBasedOnFieldType(fldType).map(({ key, lbl }) => (
          <option key={key} value={key}>
            {lbl}
          </option>
        ))}
      </MtSelect>

      <svg height="35" width="100" className="mt-1">
        <line x1="0" y1="20" x2="40" y2="20" style={{ stroke: '#b9c5ff', strokeWidth: 1 }} />
      </svg>

      {
        fldType.match(/select|check|radio/g)
          ? (
            <MultiSelect
              className="msl-wrp-options btcd-paper-drpdwn w-10"
              defaultValue={value || ''}
              onChange={e => changeValue(e, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)}
              options={getOptions()}
              customValue
              fldType={fldType}
            />
          ) : (
            <MtInput
              label="Value"
              type={type}
              disabled={logicValue === 'null' || logicValue === 'not_null'}
              onChange={e => changeValue(e.target.value, lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)}
              value={value || ''}
            />
          )
      }

      <div className="btcd-li-side-btn">
        <Button onClick={() => delLogic(lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)} icn className="ml-2 white mr-2 sh-sm">
          <TrashIcn size="16" />
        </Button>
        <Button onClick={() => addInlineLogic('and', lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)} className="white mr-2 sh-sm">
          <CloseIcn size="10" className="icn-rotate-45 mr-1" />
          AND
        </Button>
        <Button onClick={() => addInlineLogic('or', lgcGrpInd, lgcInd, subLgcInd, subSubLgcInd)} className="white sh-sm">
          <CloseIcn size="10" className="icn-rotate-45 mr-1" />
          OR
        </Button>
      </div>
    </div>
  )
}

export default LogicBlock
