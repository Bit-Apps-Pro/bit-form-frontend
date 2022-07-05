import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $updateBtn } from '../../../GlobalStates/GlobalStates'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory, reCalculateFieldHeights } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import SingleToggle from '../../Utilities/SingleToggle'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import ErrorMessageSettings from './ErrorMessageSettings'

export default function OtherOptionSettings() {
  console.log('%cRander Other Option Setting', 'background:green;padding:3px;border-radius:5px;color:white')
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const { css } = useFela()
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)

  const adminLabel = fieldData.adminLbl || ''

  const toggleAddOtherOption = (e) => {
    if (e.target.checked) {
      fieldData.addOtherOpt = true
      fieldData.valid.otherOptReq = true
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.otherOptReq) fieldData.err.otherOptReq = {}
      fieldData.err.otherOptReq.dflt = '<p>Custom Option Required</p>'
      fieldData.err.otherOptReq.show = true
    } else {
      fieldData.valid.otherOptReq = false
      delete fieldData.addOtherOpt
    }
    const evnt = e.target.checked ? 'Add' : 'Remove'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${evnt} Other Option: ${fieldData.lbl || adminLabel || fldKey}`, type: `${evnt.toLowerCase()}_Other_Option`, state: { fields: allFields, fldKey } }, setUpdateBtn)
    reCalculateFieldHeights(fldKey)
  }

  const toggleOtherOptReq = (e) => {
    if (e.target.checked) {
      fieldData.valid.otherOptReq = true
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.otherOptReq) fieldData.err.otherOptReq = {}
      fieldData.err.otherOptReq.dflt = '<p>Custom Option Required</p>'
      fieldData.err.otherOptReq.show = true
    } else {
      fieldData.valid.otherOptReq = false
    }

    const evnt = e.target.checked ? 'Requred' : 'Optional'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${evnt} Required Other Option: ${fieldData.lbl || adminLabel || fldKey}`, type: `${evnt.toLowerCase()}_Other_Option`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const toggleOtherInpPh = (e) => {
    if (e.target.checked) {
      fieldData.otherInpPh = 'Write Custom Option...'
      fieldData.otherPhShow = true
    } else {
      fieldData.otherPhShow = false
      delete fieldData.otherInpPh
    }
    const req = e.target.checked ? 'Show' : 'Hide'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${req} Placeholder: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_placeholder`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setOtherInpPlaceholder(e) {
    if (e.target.value === '') {
      delete fieldData.otherInpPh
    } else {
      fieldData.otherInpPh = e.target.value
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Other Input Placeholder updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_placeholder', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <SimpleAccordion
      id="other-opt-stng"
      title={__('Add Other Option')}
      className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
      switching
      tip="By enable this settings, a option will added with name 'Other'"
      tipProps={{ width: 250, icnSize: 17 }}
      toggleAction={toggleAddOtherOption}
      toggleChecked={fieldData?.addOtherOpt}
      open={fieldData?.addOtherOpt}
      disable={!fieldData?.addOtherOpt}
    >
      <div className={css(FieldStyle.placeholder)}>
        <div className={css({ flx: 'center-between', my: 5 })}>
          <span>Required Custom Input</span>
          <SingleToggle id="req-other-opt" className={css(ut.mr2)} name="req-other-opt" action={toggleOtherOptReq} isChecked={fieldData.valid.otherOptReq} />
        </div>
        {fieldData.valid.otherOptReq && (
          <ErrorMessageSettings
            id="other-opt-stng"
            type="otherOptReq"
            title="Error Message"
            tipTitle="By enabling this feature, user will see the error message when input is empty"
          />
        )}

        <div className={css({ flx: 'center-between', my: 5 })}>
          <span>Input Placeholder</span>
          <SingleToggle id="other-inp-ph" className={css(ut.mr2)} name="other-inp-ph" action={toggleOtherInpPh} isChecked={fieldData.otherPhShow} />
        </div>

        {fieldData.otherPhShow && (
          <input
            data-testid="othep-ph-inp"
            aria-label="Placeholer for Other Input"
            placeholder="Type Placeholder here..."
            className={css(FieldStyle.input)}
            type="text"
            value={fieldData.otherInpPh || ''}
            onChange={setOtherInpPlaceholder}
          />
        )}
      </div>
    </SimpleAccordion>
  )
}
