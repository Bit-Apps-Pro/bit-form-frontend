/* eslint-disable no-param-reassign */
import { useParams } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { $fields } from '../../GlobalStates/GlobalStates'
import { deepCopy } from '../../Utils/Helpers'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'
import SizeAndPosition from './StyleCustomize/StyleComponents/SizeAndPosition'

function DividerSettings() {
  const { fieldKey: fldKey } = useParams()
  const fields = useAtomValue($fields)
  const fieldData = deepCopy(fields[fldKey])

  return (
    <div>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />
      <AdminLabelSettings />
      <FieldSettingsDivider />
      <SizeAndPosition />
      <FieldSettingsDivider />
    </div>
  )
}

export default DividerSettings
