/* eslint-disable no-param-reassign */
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { deepCopy } from '../../Utils/Helpers'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

function DividerSettings() {
  const { fieldKey: fldKey } = useParams()
  const fields = useRecoilValue($fields)
  const fieldData = deepCopy(fields[fldKey])

  return (
    <div>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />
      <br />
    </div>
  )
}

export default DividerSettings
