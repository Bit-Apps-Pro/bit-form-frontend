import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import { deepCopy } from '../../Utils/Helpers'
import TinyMCE from '../Utilities/TinyMCE'
import Back2FldList from './Back2FldList'

export default function HtmlFieldSettings() {
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])

  const setContent = val => {
    fieldData.content = val

    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fieldData } }))
  }

  return (
    <div className="mr-4 ml-2">
      <Back2FldList />
      <div className="mb-2">
        <span className="font-w-m">Field Type :</span>
        {' '}
        {fieldData.typ.charAt(0).toUpperCase() + fieldData.typ.slice(1)}
      </div>
      <div className="mt-3">
        <b>Content: </b>
        <br />
        <br />
        <TinyMCE
          id={fldKey}
          value={fieldData.content || fieldData?.info?.content}
          onChangeHandler={setContent}
        />
      </div>
    </div>
  )
}
