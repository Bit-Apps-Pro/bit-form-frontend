/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { deepCopy } from '../../Utils/Helpers'
import Modal from '../Utilities/Modal'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import Icons from './Icons'
import FieldIconSettings from './StyleCustomize/ChildComp/FieldIconSettings'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

function ImageSettings() {
  const { css } = useFela()
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const [icnMdl, setIcnMdl] = useState('')

  const removeImage = (name) => {
    if (fieldData[name]) {
      delete fieldData[name]
      const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
      setFields(allFields)
    }
  }

  return (
    <div>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />

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
