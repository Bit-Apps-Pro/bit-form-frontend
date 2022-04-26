/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $updateBtn } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import TxtAlignLeftIcn from '../../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../../Icons/TxtAlignRightIcn'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory, assignNestedObj } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import CheckBoxMini from '../../Utilities/CheckBoxMini'
import StyleSegmentControl from '../../Utilities/StyleSegmentControl'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import ErrorMessageSettings from './ErrorMessageSettings'

export default function RequiredSettings() {
  console.log('%cRander Required Setting', 'background:green;padding:3px;border-radius:5px;color:white')
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const setStyles = useSetRecoilState($styles)
  const { css } = useFela()
  const isRequired = fieldData.valid.req || false
  const adminLabel = fieldData.adminLbl || ''

  const getPropertyPath = (elementKey, cssProperty, state = '') => `fields->${fldKey}->classes->.${fldKey}-${elementKey}${state && `:${state}`}->${cssProperty}`

  function setRequired(e) {
    if (e.target.checked) {
      const tmp = { ...fieldData.valid }
      tmp.req = true
      tmp.reqShow = true
      tmp.reqPos = 'after'
      fieldData.valid = tmp
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.req) fieldData.err.req = {}
      fieldData.err.req.dflt = '<p>This field is required</p>'
      fieldData.err.req.show = true
    } else {
      delete fieldData.valid.req
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    const req = e.target.checked ? 'on' : 'off'
    addToBuilderHistory(setBuilderHistory, { event: `Field required ${req}: ${adminLabel || fieldData.lbl || fldKey}`, type: `required_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setReqShow = e => {
    const { checked } = e.target
    if (checked) {
      fieldData.valid.reqShow = true
    } else {
      delete fieldData.valid.reqShow
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    const req = checked ? 'on' : 'off'
    addToBuilderHistory(setBuilderHistory, { event: `Asterisk Show ${req}: ${adminLabel || fieldData.lbl || fldKey}`, type: `asterisk_show_${req}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setAsteriskPos = (posValue) => {
    fieldData.valid.reqPos = posValue
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Asterisk Position ${posValue}: ${adminLabel || fieldData.lbl || fldKey}`, type: `asterisk_position_${posValue}`, state: { fields: allFields, fldKey } }, setUpdateBtn)

    if (posValue === 'left') {
      setStyles(prvState => produce(prvState, drftStyles => {
        assignNestedObj(drftStyles, getPropertyPath('lbl', 'position'), 'relative')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'position'), 'absolute')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'right'), 'unset')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'left'), '0px')
      }))
    } else if (posValue === 'right') {
      setStyles(prvState => produce(prvState, drftStyles => {
        assignNestedObj(drftStyles, getPropertyPath('lbl', 'position'), 'relative')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'position'), 'absolute')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'right'), '0px')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'left'), 'unset')
      }))
    } else {
      setStyles(prvState => produce(prvState, drftStyles => {
        assignNestedObj(drftStyles, getPropertyPath('lbl', 'position'), 'unset')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'position'), 'unset')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'left'), 'unset')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'right'), 'unset')
      }))
    }
  }

  return (
    <SimpleAccordion
      id="rqrd-stng"
      title={__('Required', 'bitform')}
      // eslint-disable-next-line react/jsx-no-bind
      toggleAction={setRequired}
      toggleChecked={isRequired}
      className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
      switching
      tip="By enabling this feature, user will see the error message when input is empty"
      tipProps={{ width: 200, icnSize: 17 }}
      open={isRequired}
      disable={!isRequired}
    >
      <ErrorMessageSettings
        id="rqrd-stng"
        type="req"
        title="Error Message"
        tipTitle="By enabling this feature, user will see the error message when input is empty"
      />
      <CheckBoxMini
        id="rqrd-stng-shw-strsk"
        className={`${css(ut.mr2, ut.mt2, { ml: 7 })} ${css(ut.fw500)} `}
        name="reqShow"
        checked={fieldData?.valid?.reqShow || false}
        title={__('Show Asterisk Symbol', 'bitform')}
        onChange={setReqShow}
      />
      {fieldData?.valid?.reqShow && (
        <div className={css(ut.flxcb, ut.pl3, ut.px10, ut.mt1)}>
          <span className={css(ut.fs12, ut.fw500)}>Asterisk Position</span>
          <StyleSegmentControl
            className={css({ w: 120 })}
            show={['icn']}
            tipPlace="bottom"
            options={[
              { icn: <TxtAlignLeftIcn size="17" />, label: 'left', tip: 'left' },
              { icn: <TxtAlignLeftIcn size="17" />, label: 'before', tip: 'before' },
              { icn: <TxtAlignRightIcn size="17" />, label: 'after', tip: 'after' },
              { icn: <TxtAlignRightIcn size="17" />, label: 'right', tip: 'right' },
            ]}
            onChange={e => setAsteriskPos(e)}
            defaultActive={fieldData.valid.reqPos}
          />
        </div>
      )}

    </SimpleAccordion>
  )
}
