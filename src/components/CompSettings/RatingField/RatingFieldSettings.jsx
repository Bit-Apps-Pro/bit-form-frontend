/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAtom, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { memo, useState } from 'react'
import { useFela } from 'react-fela'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useParams } from 'react-router-dom'
import { $fields } from '../../../GlobalStates/GlobalStates'
import CloseIcn from '../../../Icons/CloseIcn'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import tippyHelperMsg from '../../../Utils/StaticData/tippyHelperMsg'
import { __ } from '../../../Utils/i18nwrap'
import FieldStyle from '../../../styles/FieldStyle.style'
import Btn from '../../Utilities/Btn'
import Modal from '../../Utilities/Modal'
import SingleToggle from '../../Utilities/SingleToggle'
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
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import { $styles } from '../../../GlobalStates/StylesState'

function RatingFieldSettings() {
  const { fieldKey: fldKey } = useParams()
  const setStyles = useSetAtom($styles)

  if (!fldKey) return <>No field exist with this field key</>

  const { css } = useFela()

  const [fields, setFields] = useAtom($fields)
  const [optionMdl, setOptionMdl] = useState(false)

  const fieldData = deepCopy(fields[fldKey])
  const options = deepCopy(fields[fldKey].opt)
  const isReviewLblShowOnHover = fieldData?.showReviewLblOnHover || false
  const isReviewLblShowOnSelect = fieldData?.showReviewLblOnSelect || false
  const adminLabel = fieldData.adminLbl || ''
  const ratingPos = fieldData?.ratingPos || 'start'

  const pos = [
    { name: __('Left'), value: 'start' },
    { name: __('Center'), value: 'center' },
    { name: __('Right'), value: 'end' },
  ]

  const openOptionModal = () => {
    setOptionMdl(true)
  }

  const handleEditOptions = newOpts => {
    const allFields = create(fields, draft => {
      draft[fldKey].opt = newOpts
    })
    setFields(allFields)
    addToBuilderHistory({ event: `Modify Option: ${fieldData.lbl || adminLabel || fldKey}`, type: 'modify_options_list', state: { fields: allFields, fldKey } })
  }

  const setReviewLblOnHover = ({ target }) => {
    const { checked } = target
    const allFields = create(fields, draft => {
      const fldData = draft[fldKey]

      if (checked) {
        fldData.showReviewLblOnHover = true
      } else {
        fldData.showReviewLblOnHover = false
      }
    })
    const req = checked ? 'show' : 'hide'
    setFields(allFields)
    addToBuilderHistory({ event: `Review Label ${req}`, type: 'review_lbl_show_hide', state: { fields: allFields, fldKey } })
  }
  const setReviewLblOnSelect = ({ target }) => {
    const { checked } = target
    const allFields = create(fields, draft => {
      const fldData = draft[fldKey]

      if (checked) {
        fldData.showReviewLblOnSelect = true
      } else {
        fldData.showReviewLblOnSelect = false
      }
    })
    const req = checked ? 'show' : 'hide'
    setFields(allFields)
    addToBuilderHistory({ event: `Review Label ${req}`, type: 'review_lbl_show_hovsr_hide', state: { fields: allFields, fldKey } })
  }

  const setRatiogPos = ({ target }) => {
    const { value } = target
    const allFields = create(fields, draft => {
      draft[fldKey].ratingPos = value
    })

    setStyles(prev => create(prev, draft => {
      draft.fields[fldKey].classes[`.${fldKey}-inp-fld-wrp`]['justify-content'] = value
    }))
    const req = value
    setFields(allFields)
    addToBuilderHistory({ event: `Review start position change to ${req}`, type: 'review_start_pos', state: { fields: allFields, fldKey } })
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
        <SimpleAccordion
          id="rating-algn"
          title={__('Rating Position')}
          className={css(FieldStyle.fieldSection)}
          open
        >
          <div className={css(FieldStyle.placeholder)}>
            <select
              data-testid="rating-algn-slct"
              className={css(FieldStyle.input)}
              name=""
              id=""
              value={ratingPos}
              onChange={setRatiogPos}
            >
              {pos.map(itm => <option key={`btcd-k-${itm.name}`} value={itm.value}>{itm.name}</option>)}
            </select>
          </div>
        </SimpleAccordion>
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
        <div className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}>
          <SingleToggle
            id="fld-rating-lbl-hover"
            tip={tippyHelperMsg.ratingLbl}
            title={__('Show Rating Label On hover')}
            action={setReviewLblOnHover}
            isChecked={isReviewLblShowOnHover}
            isPro
            proProperty="hidden"
          />
        </div>
        <FieldSettingsDivider />
        <div className={css(FieldStyle.fieldSection, FieldStyle.hover_tip, FieldStyle.singleOption)}>
          <SingleToggle
            id="fld-rating-lbl-select"
            tip={tippyHelperMsg.ratingLbl}
            title={__('Show Rating Label On Select')}
            action={setReviewLblOnSelect}
            isChecked={isReviewLblShowOnSelect}
            isPro
            proProperty="hidden"
          />
        </div>
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
