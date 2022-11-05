/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Modal from '../Utilities/Modal'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import Icons from './Icons'
import FieldIconSettings from './StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'
import SizeAndPosition from './StyleCustomize/StyleComponents/SizeAndPosition'

function ImageSettings() {
  const { css } = useFela()
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [icnMdl, setIcnMdl] = useState(false)
  const alt = fieldData.alt || ''

  const removeImage = (name) => {
    if (fieldData[name]) {
      delete fieldData[name]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
      addToBuilderHistory(
        {
          event: `Background Image Deleted: ${fieldData.lbl || fldKey}`,
          type: `delete_${name}`,
          state: { fldKey, fields: allFields },
        },
      )
    }
  }

  function setAlt(e) {
    const { value } = e.target
    if (value === '') {
      delete fieldData.alt
    } else {
      fieldData.alt = value.replace(/\\\\/g, '$_bf_$')
    }
    // eslint-disable-next-line no-param-reassign
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({
      event: `Field alt Change ${fieldData.alt || fldKey}`,
      type: 'field_alt_change',
      state: { fields: allFields, fldKey },
    })
  }

  return (
    <div>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />
      <SizeAndPosition />
      <FieldSettingsDivider />
      <FieldIconSettings
        classNames={css(style.section)}
        labelClass={css(style.logoLabel)}
        label="Background Image"
        iconSrc={fieldData?.bg_img}
        styleRoute="img"
        setIcon={() => setIcnMdl(true)}
        removeIcon={() => removeImage('bg_img')}
      />

      <FieldSettingsDivider />
      <SimpleAccordion
        id="nam-stng"
        title={__('Image Alt Text')}
        className={css(FieldStyle.fieldSection)}
      >
        <div>
          <div className={css({ w: '97%', mx: 5 })}>
            <AutoResizeInput
              id="fld-lbl-stng"
              ariaLabel="Label input"
              changeAction={setAlt}
              value={alt.replace(/\$_bf_\$/g, '\\')}
              placeholder="e.g: Image of Bitform"
            />
          </div>
        </div>
      </SimpleAccordion>
      <FieldSettingsDivider />

      <Modal
        md
        autoHeight
        show={icnMdl}
        setModal={setIcnMdl}
        className="o-v"
        title="Background Image"
      >
        <div className="pos-rel" />

        <Icons
          iconType="bg_img"
          selected="Upload Image"
          uploadLbl="Upload Image"
          setModal={setIcnMdl}
        />
      </Modal>
    </div>
  )
}
export default ImageSettings

const style = {
  section: {
    my: 5,
    mx: 15,
  },
  logoLabel: {
    flx: 'center-between',
    ml: '0px !important',
    my: 5,
    brs: 8,
    fw: '600 !important',
  },
}
