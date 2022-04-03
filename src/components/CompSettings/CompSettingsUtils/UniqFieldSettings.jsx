/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $updateBtn } from '../../../GlobalStates/GlobalStates'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import ErrorMessageSettings from './ErrorMessageSettings'

export default function UniqFieldSettings({ type, title, tipTitle, isUnique, className }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  const setShowErrMsg = e => {
    const { checked } = e.target
    // console.log('name', name)
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err[type]) fieldData.err[type] = {}
    if (checked) {
      fieldData.err[type].show = true
      const msg = 'That field is taken. Try another'
      if (!fieldData.err[type].dflt) fieldData.err[type].dflt = msg
    } else {
      delete fieldData.err[type].show
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: 'Field required custom error message updated', type: 'change_custom_error_message', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <SimpleAccordion
      title={title}
      className={className}
      tip={tipTitle}
      toggleName={isUnique}
      toggleAction={setShowErrMsg}
      toggleChecked={fieldData?.err?.[type]?.[isUnique]}
      switching
      tipProps={{ width: 200, icnSize: 17 }}
      open={fieldData?.err?.[type]?.[isUnique]}
      disable={!fieldData?.err?.[type]?.[isUnique]}
    >
      <ErrorMessageSettings
        type={type}
        title={title}
        tipTitle={tipTitle}
      />
    </SimpleAccordion>
  )
}
