/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { create } from 'mutative'
import { memo, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useParams } from 'react-router-dom'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { $fields, $selectedFieldId, $updateBtn } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import BdrDottedIcn from '../../../Icons/BdrDottedIcn'
import CloseIcn from '../../../Icons/CloseIcn'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../../Utils/FormBuilderHelper'
import { deepCopy, IS_PRO } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import autofillList from '../../../Utils/StaticData/autofillList'
import predefinedPatterns from '../../../Utils/StaticData/patterns.json'
import tippyHelperMsg from '../../../Utils/StaticData/tippyHelperMsg'
import { addDefaultStyleClasses, iconElementLabel, isStyleExist, paddingGenerator, setIconFilterValue, styleClasses } from '../../style-new/styleHelpers'
import Btn from '../../Utilities/Btn'
import Downmenu from '../../Utilities/Downmenu'
import Modal from '../../Utilities/Modal'
import SingleInput from '../../Utilities/SingleInput'
import TableCheckBox from '../../Utilities/TableCheckBox'
import AdminLabelSettings from '../CompSettingsUtils/AdminLabelSettings'
import AutoResizeInput from '../CompSettingsUtils/AutoResizeInput'
import ErrorMessageSettings from '../CompSettingsUtils/ErrorMessageSettings'
import FieldDisabledSettings from '../CompSettingsUtils/FieldDisabledSettings'
import FieldHideSettings from '../CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from '../CompSettingsUtils/FieldLabelSettings'
import FieldReadOnlySettings from '../CompSettingsUtils/FieldReadOnlySettings'
import FieldSettingsDivider from '../CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from '../CompSettingsUtils/HelperTxtSettings'
import PlaceholderSettings from '../CompSettingsUtils/PlaceholderSettings'
import RequiredSettings from '../CompSettingsUtils/RequiredSettings'
import SubTitleSettings from '../CompSettingsUtils/SubTitleSettings'
import UniqFieldSettings from '../CompSettingsUtils/UniqFieldSettings'
import EditOptions from '../EditOptions/EditOptions'
import Icons from '../Icons'
import FieldIconSettings from '../StyleCustomize/ChildComp/FieldIconSettings'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from '../StyleCustomize/FieldSettingTitle'
import SizeAndPosition from '../StyleCustomize/StyleComponents/SizeAndPosition'
import UndoBtnSetting from './UndoBtnSetting'
import ClearBtnSetting from './ClearBtnSetting'
import ControlBtnPosition from './ControlBtnPosition'
import SignaturePadSetting from './SignaturePadSetting'

function SignatureFieldSettings() {
  const { fieldKey: fldKey } = useParams()

  if (!fldKey) return <>No field exist with this field key</>
  const setUpdateBtn = useSetAtom($updateBtn)
  const [optionMdl, setOptionMdl] = useState(false)
  const [icnMdl, setIcnMdl] = useState(false)
  const [icnType, setIcnType] = useState('')
  const [styles, setStyles] = useAtom($styles)
  const [fields, setFields] = useAtom($fields)
  const fieldData = deepCopy(fields[fldKey])

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

        <SignaturePadSetting />

        <FieldSettingsDivider />

        <ControlBtnPosition />

        <FieldSettingsDivider />

        <ClearBtnSetting />

        <FieldSettingsDivider />

        <UndoBtnSetting />

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
        show={icnMdl}
        setModal={setIcnMdl}
        className="o-v"
        title={__('Icons')}
      >
        <div className="pos-rel" />

        <Icons iconType={icnType} setModal={setIcnMdl} />
      </Modal>
    </>
  )
}

export default memo(SignatureFieldSettings)

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
