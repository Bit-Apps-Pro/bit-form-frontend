import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import EditIcn from '../../Icons/EditIcn'
import ut from '../../styles/2.utilities'
import style from '../../styles/FieldSettingTitle.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Cooltip from '../Utilities/Cooltip'
import Back2FldBtn from './Back2FldBtn'
import HTMLContentModal from './CompSettingsUtils/HTMLContentModal'

export default function HtmlFieldSettings() {
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [labelModal, setLabelModal] = useState(false)
  const { css } = useFela()

  const setContent = val => {
    const fdata = deepCopy(fieldData)
    fdata.content = val
    setFields(allFields => ({ ...allFields, ...{ [fldKey]: fdata } }))
  }

  return (
    <div>

      <div className={css(style.section, style.flxColumn)}>
        <Back2FldBtn size="20" className={css(style.btn)} />
        <div>
          <div className={css(style.mainTitle)}>{__('Field Settings', 'bitform')}</div>
          <span className={css(style.subtitle, ut.fontBody)}>{__(fieldData.typ.charAt(0).toUpperCase() + fieldData.typ.slice(1), 'bitform')}</span>
        </div>
      </div>
      <hr className={css(style.divider)} />
      {/* 
      <div className="mb-2">
        <span className="font-w-m">Field Type :</span>
        {' '}
        {fieldData.typ.charAt(0).toUpperCase() + fieldData.typ.slice(1)}
      </div> */}
      <div className={css(FieldStyle.fieldSection)}>
        <div className={css(ut.flxcb)}>
          <div className={css(ut.flxc)}>
            <b>Content: </b>
            <Cooltip width={250} icnSize={17} className={css(ut.ml2)}>
              <div className={css(ut.tipBody)}>{__('Edit the HTML field content by clicking on edit icon', 'bitform')}</div>
            </Cooltip>
          </div>
          <span
            role="button"
            tabIndex="-1"
            className={css(ut.mr2, ut.cp)}
            onClick={() => setLabelModal(true)}
            onKeyPress={() => setLabelModal(true)}
          >
            <EditIcn size={19} />
          </span>
        </div>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: fieldData.content }}
          className={css(FieldStyle.input, ut.px10, ut.py5, ut.pmt0)}
        />
      </div>
      <HTMLContentModal labelModal={labelModal} setLabelModal={setLabelModal} />
    </div>
  )
}
