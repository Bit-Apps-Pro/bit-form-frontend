/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAtom } from 'jotai'
import { create } from 'mutative'
import { memo, useState } from 'react'
import { useFela } from 'react-fela'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useParams } from 'react-router-dom'
import { $fields } from '../../../GlobalStates/GlobalStates'
import CloseIcn from '../../../Icons/CloseIcn'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import FieldStyle from '../../../styles/FieldStyle.style'
import Btn from '../../Utilities/Btn'
import Modal from '../../Utilities/Modal'
import AdminLabelSettings from '../CompSettingsUtils/AdminLabelSettings'
import FieldHideSettings from '../CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from '../CompSettingsUtils/FieldLabelSettings'
import FieldSettingsDivider from '../CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from '../CompSettingsUtils/HelperTxtSettings'
import RequiredSettings from '../CompSettingsUtils/RequiredSettings'
import SubTitleSettings from '../CompSettingsUtils/SubTitleSettings'
import EditOptions from '../EditOptions/EditOptions'
import FieldSettingTitle from '../StyleCustomize/FieldSettingTitle'
import SizeAndPosition from '../StyleCustomize/StyleComponents/SizeAndPosition'

function RatingFieldSettings() {
  const { fieldKey: fldKey } = useParams()

  if (!fldKey) return <>No field exist with this field key</>

  const { css } = useFela()

  const [fields, setFields] = useAtom($fields)
  const [optionMdl, setOptionMdl] = useState(false)

  const fieldData = deepCopy(fields[fldKey])
  const options = deepCopy(fields[fldKey].opt)
  const adminLabel = fieldData.adminLbl || ''

  const openOptionModal = () => {
    setOptionMdl(true)
  }

  const closeOptionModal = () => {
    setOptionMdl(false)
  }
  const handleEditOptions = newOpts => {
    console.log('newOpts', newOpts)
    const allFields = create(fields, draft => {
      draft[fldKey].opt = newOpts
    })
    setFields(allFields)
    addToBuilderHistory({ event: `Modify Option: ${fieldData.lbl || adminLabel || fldKey}`, type: 'modify_options_list', state: { fields: allFields, fldKey } })
  }
  return (
    <>
      <div className="">
        <FieldSettingTitle
          title="Field Settings"
          subtitle={fieldData.typ}
          fieldKey={fldKey}
        />

        <FieldLabelSettings />

        <FieldSettingsDivider />

        <SubTitleSettings />

        <FieldSettingsDivider />

        <AdminLabelSettings />

        <FieldSettingsDivider />

        <SizeAndPosition />

        <FieldSettingsDivider />
        <div className={css(FieldStyle.fieldSection)}>
          <Btn
            dataTestId="edt-opt-stng"
            variant="primary-outline"
            size="sm"
            className={css({ mt: 10 })}
            onClick={openOptionModal}
          >
            {__('Add/Edit Rating Options')}
            <span className={css(style.plsIcn)}>
              <CloseIcn size="13" stroke="3" />
            </span>
          </Btn>
        </div>
        <FieldSettingsDivider />
        <FieldSettingsDivider />

        <HelperTxtSettings />

        <FieldSettingsDivider />

        <RequiredSettings />

        <FieldSettingsDivider />

        <FieldHideSettings />

        <FieldSettingsDivider />

        {/* <FieldDisabledSettings />

        <FieldSettingsDivider /> */}

      </div>

      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={() => setOptionMdl(false)}
        className="o-v "
        title={__('Options')}
        width="740px"
      >
        <div className="pos-rel">
          <EditOptions
            optionMdl={optionMdl}
            options={options}
            setOptions={newOpts => handleEditOptions(newOpts)}
            lblKey="lbl"
            valKey="val"
            imgKey="img"
            isRating={fieldData.typ === 'rating'}
            type="rating"
            showUpload
          // hideNDisabledOptions
          />
        </div>
      </Modal>
    </>
  )
}

export default memo(RatingFieldSettings)

const style = {
  dotBtn: {
    b: 0,
    brs: 5,
    mr: 15,
    curp: 1,
  },
  button: {
    dy: 'block',
    w: '100%',
    ta: 'left',
    b: 0,
    bd: 'none',
    p: 3,
    curp: 1,
    '&:hover':
    {
      bd: 'var(--white-0-95)',
      cr: 'var(--black-0)',
      brs: 8,
    },
    fs: 11,
  },
  plsIcn: {
    ml: 8, mt: 3, tm: 'rotate(45deg)',
  },
}
