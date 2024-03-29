/* eslint-disable no-param-reassign */
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom, useAtomValue } from 'jotai'
import { $fields, $selectedFieldId } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import TxtAlignLeftIcn from '../../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../../Icons/TxtAlignRightIcn'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory, setRequired } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import tippyHelperMsg from '../../../Utils/StaticData/tippyHelperMsg'
import { addDefaultStyleClasses, assignNestedObj } from '../../style-new/styleHelpers'
import CheckBoxMini from '../../Utilities/CheckBoxMini'
import StyleSegmentControl from '../../Utilities/StyleSegmentControl'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import ErrorMessageSettings from './ErrorMessageSettings'

export default function RequiredSettings({ asteriskIsAllow = true }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useAtom($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [styles, setStyles] = useAtom($styles)
  const { css } = useFela()
  const isRequired = fieldData.valid.req || false
  const adminLabel = fieldData.adminLbl || ''
  const selectedFieldId = useAtomValue($selectedFieldId)

  const getPropertyPath = (elementKey, cssProperty, state = '') => `fields->${fldKey}->classes->.${fldKey}-${elementKey}${state && `:${state}`}->${cssProperty}`

  const setReqShow = e => {
    const { checked } = e.target
    if (checked) {
      fieldData.valid.reqShow = true
      addDefaultStyleClasses(selectedFieldId, 'reqSmbl')
    } else {
      delete fieldData.valid.reqShow
    }
    // eslint-disable-next-line no-param-reassign
    // setFields(allFields => create(allFields, draft => { draft[fldKey] = fieldData }))
    const allFields = create(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    const req = checked ? 'on' : 'off'
    addToBuilderHistory({ event: `Asterisk Show ${req}: ${adminLabel || fieldData.lbl || fldKey}`, type: `asterisk_show_${req}`, state: { fields: allFields, fldKey } })
  }

  const setAsteriskPos = (posValue) => {
    fieldData.valid.reqPos = posValue
    const allFields = create(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    let newStyles = styles
    if (posValue === 'left') {
      newStyles = create(styles, drftStyles => {
        assignNestedObj(drftStyles, getPropertyPath('lbl', 'position'), 'relative')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'position'), 'absolute')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'right'), 'unset')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'left'), '0px')
      })
    } else if (posValue === 'right') {
      newStyles = create(styles, drftStyles => {
        assignNestedObj(drftStyles, getPropertyPath('lbl', 'position'), 'relative')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'position'), 'absolute')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'right'), '0px')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'left'), 'unset')
      })
    } else {
      newStyles = create(styles, drftStyles => {
        assignNestedObj(drftStyles, getPropertyPath('lbl', 'position'), 'unset')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'position'), 'unset')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'left'), 'unset')
        assignNestedObj(drftStyles, getPropertyPath('req-smbl', 'right'), 'unset')
      })
    }
    setStyles(newStyles)
    addToBuilderHistory({ event: `Asterisk Position ${posValue}: ${adminLabel || fieldData.lbl || fldKey}`, type: 'asterisk_position_change', state: { fields: allFields, styles: newStyles, fldKey } })
  }

  return (
    <SimpleAccordion
      id="rqrd-stng"
      title={__('Required')}
      // eslint-disable-next-line react/jsx-no-bind
      toggleAction={setRequired}
      toggleChecked={isRequired}
      className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
      switching
      tip={tippyHelperMsg.required}
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
      {asteriskIsAllow && (
        <>
          <CheckBoxMini
            id="rqrd-stng-shw-strsk"
            className={`${css(ut.mr2, ut.mt2, { ml: 7 })} ${css(ut.fw500)} `}
            name="reqShow"
            checked={fieldData?.valid?.reqShow || false}
            title={__('Show Asterisk Symbol')}
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
        </>
      )}

    </SimpleAccordion>
  )
}
