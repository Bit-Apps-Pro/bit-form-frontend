/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import EditIcn from '../../Icons/EditIcn'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Modal from '../Utilities/Modal'
import Tip from '../Utilities/Tip'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import Icons from './Icons'
import IconStyleBtn from './IconStyleBtn'
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

  const sizeHandler = (e) => {
    const { name, value } = e.target
    fieldData[name] = value
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory({
      event: `Field ${name} Change ${fieldData.lbl || fldKey}`,
      type: `field_${name}_change`,
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
      <SimpleAccordion
        id="nam-stng"
        title={__('Background Image')}
        className={css(FieldStyle.fieldSection)}
      >

        <div className={css(ut.flxc, { jc: 'end' })}>
          {fieldData?.bg_img && (
            <>
              <img
                src={fieldData?.bg_img}
                alt="Background Image"
                width="18"
                height="18"
              />
              <Tip msg="Style">
                <IconStyleBtn route="img" />
              </Tip>
            </>
          )}

          <Tip msg="Change">
            <button
              data-testid="img-edt-btn"
              type="button"
              onClick={() => setIcnMdl(true)}
              className={css(ut.icnBtn)}
            >
              <EditIcn size={22} />
            </button>
          </Tip>
          {fieldData?.bg_img && (
            <Tip msg="Remove">
              <button
                data-testid="img-rmv-btn"
                onClick={() => removeImage('bg_img')}
                className={css(ut.icnBtn)}
                type="button"
              >
                <CloseIcn size="13" />
              </button>
            </Tip>
          )}
        </div>

        <div className={css(ut.flxcb, ut.ml1)}>
          <label htmlFor="alt" className={css(ut.mr1)}>
            {__('Width')}
          </label>
          <input
            type="number"
            name="width"
            data-testid="img-width"
            aria-label="Image Width"
            placeholder="auto"
            className={css(ut.w4, FieldStyle.input)}
            value={fieldData.width}
            onChange={sizeHandler}
          />
        </div>
        <div className={css(ut.flxcb, ut.ml1)}>
          <label htmlFor="alt" className={css(ut.mr1)}>
            {__('Height')}
          </label>
          <input
            type="number"
            name="height"
            data-testid="img-height"
            aria-label="Image Height"
            placeholder="auto"
            className={css(ut.w4, FieldStyle.input)}
            value={fieldData.height}
            onChange={sizeHandler}
          />
        </div>
      </SimpleAccordion>
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
          unsplash
        />
      </Modal>
    </div>
  )
}
export default ImageSettings
