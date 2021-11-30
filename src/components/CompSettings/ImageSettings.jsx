import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId, $styles } from '../../GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import EditIcn from '../../Icons/EditIcn'
import ut from '../../styles/2.utilities'
import { deepCopy } from '../../Utils/Helpers'
import BorderControl from '../style-new/BorderControl'
import ShadowControl from '../style-new/ShadowControl'
import Modal from '../Utilities/Modal'
import Icons from './Icons'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'

function ImageSettings() {
  const { css } = useFela()
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [icnMdl, setIcnMdl] = useState('')
  const [styles, setStyles] = useRecoilState($styles)

  const imgClass = `.${fldKey}-img`
  const { border, 'border-width': borderWidth, 'border-radius': borderRadius, 'box-shadow': boxShadow } = styles.fields[fldKey].classes[imgClass]

  const removeImage = (name) => {
    if (fieldData[name]) {
      delete fieldData[name]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
    }
  }

  const path = `fields->${fldKey}->classes->${imgClass}`

  const objectPaths = {
    object: 'styles',
    paths: {
      border: `${path}->border`,
      borderWidth: `${path}->border-width`,
      borderRadius: `${path}->border-radius`,
      shadow: `${path}->box-shadow`,
    },
  }

  return (
    <div>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />
      <br />

      <SimpleAccordion
        title="Image"
        className={css(ut.ml2, ut.mr2)}
      >

        <div className={css(ut.flxcb, ut.mt2)}>
          <span className={css(ut.fw500, ut.ml2)}>Background Image</span>
          <div className={css(ut.flxcb, ut.mr2)}>
            {fieldData?.bg_img && (
              <img src={fieldData?.bg_img} alt="icon" width="25" height="25" />
            )}
            <button type="button" onClick={() => setIcnMdl(true)} className={css(ut.icnBtn)}>
              <EditIcn size={22} />
            </button>
            {fieldData?.bg_img && (
              <button onClick={() => removeImage('bg_img')} className={css(ut.icnBtn)} type="button">
                <CloseIcn size="13" />
              </button>
            )}

          </div>
        </div>
        <div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500, ut.ml2)}>Border</span>
            <div className={css(ut.flxcb, ut.mr2)}>
              <BorderControl subtitle="Image Border" value={border} objectPaths={objectPaths} />
            </div>
          </div>
        </div>
        <br />
        <div>
          <div className={css(ut.flxcb)}>
            <span className={css(ut.fw500, ut.ml2)}>Shadow</span>
            <div className={css(ut.flxcb, ut.mr2)}>
              <ShadowControl subtitle="Border Shadow" value={boxShadow} objectPaths={objectPaths} />
            </div>
          </div>
        </div>
      </SimpleAccordion>
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