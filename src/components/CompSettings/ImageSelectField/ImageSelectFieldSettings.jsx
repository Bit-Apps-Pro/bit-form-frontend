/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import { useAtom } from 'jotai'
import { create } from 'mutative'
import { memo, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import AddIcon from '../../../Icons/AddIcon'
import BottomLefArrowIcn from '../../../Icons/BottomLefArrowIcn'
import BottomRightArrowIcn from '../../../Icons/BottomRightArrowIcn'
import CloseIcn from '../../../Icons/CloseIcn'
import TopLeftArrowIcn from '../../../Icons/TopLeftArrowIcn'
import TopRightArrowIcn from '../../../Icons/TopRightArrowIcn'
import { addToBuilderHistory, deleteNestedObj, reCalculateFldHeights, setRequired } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import tippyHelperMsg from '../../../Utils/StaticData/tippyHelperMsg'
import { isDev } from '../../../Utils/config'
import { __ } from '../../../Utils/i18nwrap'
import FieldStyle from '../../../styles/FieldStyle.style'
import Btn from '../../Utilities/Btn'
import Modal from '../../Utilities/Modal'
import StyleSegmentControl from '../../Utilities/StyleSegmentControl'
import AdminLabelSettings from '../CompSettingsUtils/AdminLabelSettings'
import FieldHideSettings from '../CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from '../CompSettingsUtils/FieldLabelSettings'
import FieldSettingsDivider from '../CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from '../CompSettingsUtils/HelperTxtSettings'
import RequiredSettings from '../CompSettingsUtils/RequiredSettings'
import SubTitleSettings from '../CompSettingsUtils/SubTitleSettings'
import UniqFieldSettings from '../CompSettingsUtils/UniqFieldSettings'
import EditOptions from '../EditOptions/EditOptions'
import SimpleAccordion from '../StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from '../StyleCustomize/FieldSettingTitle'
import SizeAndPosition from '../StyleCustomize/StyleComponents/SizeAndPosition'
import AllowMultipleImage from './AllowMultipleImage'
import tickPosition from './tickPosition'
import { mergeNestedObj } from '../../../Utils/globalHelpers'
import { assignNestedObj } from '../../style-new/styleHelpers'
import OptionLableShowHide from './OptionLableShowHide'

function ImageSelectFieldSettings() {
  const { css } = useFela()
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useAtom($fields)
  const fieldData = deepCopy(fields[fldKey])
  const options = deepCopy(fields[fldKey].opt)
  const adminLabel = fieldData.adminLbl || ''
  const optionCol = fieldData?.optionCol === undefined ? '' : fieldData?.optionCol

  const dataSrc = fieldData?.customType?.type || 'fileupload'
  const [styles, setStyles] = useAtom($styles)

  let fieldObject = null
  let disabled = false
  if (fieldData?.customType?.type) {
    disabled = true
    fieldObject = fieldData?.customType
  }
  const [importOpts, setImportOpts] = useState({})
  const [optionMdl, setOptionMdl] = useState(false)
  useEffect(() => setImportOpts({ dataSrc, fieldObject, disabled }), [fldKey])

  const openOptionModal = () => {
    setOptionMdl(true)
  }

  const closeOptionModal = () => {
    setOptionMdl(false)
  }

  const handleOptions = newOpts => {
    const reqOpts = newOpts.filter(opt => opt.req)
    reqOpts.length && setRequired({ target: { checked: true } })
    const allFields = create(fields, draft => {
      draft[fldKey].opt = newOpts
      if (reqOpts.length && draft[fldKey].err.req) {
        draft[fldKey].err.req.custom = true
        draft[fldKey].err.req.msg = `<p style="margin:0">${reqOpts.map(opt => opt.lbl).join(',')} is required</p>`
      } else if (draft[fldKey].err.req) draft[fldKey].err.req.msg = '<p style="margin:0">This field is required</p>'
    })
    setFields(allFields)
    addToBuilderHistory({
      event: `Options List Moddified: ${fieldData.lbl || adminLabel || fldKey}`,
      type: 'option_list_modify',
      state: { fields: allFields, fldKey },
    })
    reCalculateFldHeights(fldKey)
  }

  function setColumn({ target: { value } }) {
    if (value === '') {
      delete fieldData.optionCol
    } else {
      fieldData.optionCol = value
    }
    const allFields = create(fields, draft => { draft[fldKey] = fieldData })

    const newStyles = create(styles, drft => {
      const repeat = `repeat(${value}, 1fr)`

      drft.fields[fldKey].classes[`.${fldKey}-ic`]['grid-template-columns'] = repeat
    })
    setFields(allFields)
    setStyles(newStyles)
    addToBuilderHistory({
      event: `Image Column Update to ${value}: ${fieldData.lbl || adminLabel || fldKey}`,
      type: 'image_columns_update',
      state: { fields: allFields, styles: newStyles, fldKey },
    })
    reCalculateFldHeights(fldKey)
  }
  if (isDev) {
    window.selectedFieldData = fieldData
  }

  const setTicPosition = position => {
    const allFields = create(fields, draft => {
      draft[fldKey].tickPosition = position
    })

    const getPosStyle = tickPosition(position)

    const newStyles = create(styles, drft => {
      const delProperties = ['top', 'left', 'right', 'bottom', 'transform']
      delProperties.forEach(prop => {
        if (styles.fields[fldKey].classes[`.${fldKey}-check-box`][prop]) {
          deleteNestedObj(drft, `fields->${fldKey}->classes->.${fldKey}-check-box->${prop}`)
        }
      })
      const prvStyle = drft.fields[fldKey].classes[`.${fldKey}-check-box`]
      const newProp = mergeNestedObj(prvStyle, getPosStyle)
      assignNestedObj(drft, `fields->${fldKey}->classes->.${fldKey}-check-box`, newProp)
    })

    setStyles(newStyles)
    setFields(allFields)
    addToBuilderHistory({
      event: `Tick Position Update to ${position}: ${fieldData.lbl || adminLabel || fldKey}`,
      type: 'tick_position_update',
      state: { fields: allFields, fldKey },
    })
    // reCalculateFldHeights(fldKey)
  }
  return (
    <div className="">
      <FieldSettingTitle
        title="Field Settings"
        subtitle="Image Select"
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

      <HelperTxtSettings />

      <FieldSettingsDivider />

      <RequiredSettings />

      <FieldSettingsDivider />

      <FieldHideSettings />

      <FieldSettingsDivider />

      <AllowMultipleImage />

      <FieldSettingsDivider />

      <SimpleAccordion
        id="opt-clm-stng"
        title={__('Options Column')}
        className={css(FieldStyle.fieldSection)}
        isPro
        proProperty="optionColumn"
        tip={__('Specify the number of columns to display the options in. Leave blank to display the options as needed space.')}
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            data-testid="opt-clm-stng-inp"
            aria-label="Option Column"
            className={css(FieldStyle.input)}
            min="1"
            type="number"
            value={optionCol}
            onChange={setColumn}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SimpleAccordion
        id="opt-clm-stng"
        title={__('Check Position')}
        className={css(FieldStyle.fieldSection)}
        isPro
        proProperty="optionColumn"
        tip={__('Specify the check position.')}
      >
        <div className={css(style.tikPosIcn)}>
          <StyleSegmentControl
            className={css({ w: 180 })}
            show={['icn']}
            tipPlace="right"
            size="120"
            h="37px"
            options={[
              { icn: <TopLeftArrowIcn size="30" />, label: 'top-left', tip: 'Top Left' },
              { icn: <TopRightArrowIcn size="30" />, label: 'top-right', tip: 'Top Right' },
              { icn: <AddIcon size="30" />, label: 'center', tip: 'Center' },
              { icn: <BottomLefArrowIcn size="30" />, label: 'bottom-left', tip: 'Bottom Left' },
              { icn: <BottomRightArrowIcn size="30" />, label: 'bottom-right', tip: 'Bottom Right' },
            ]}
            onChange={e => setTicPosition(e)}
            defaultActive={fieldData.tickPosition}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <OptionLableShowHide />

      <FieldSettingsDivider />

      <UniqFieldSettings
        type="entryUnique"
        title="Unique Entry"
        tipTitle={tippyHelperMsg.uniqueEntry}
        className={css(FieldStyle.fieldSection, FieldStyle.hover_tip)}
        isUnique="show"
      />

      <FieldSettingsDivider />

      <div className={css(FieldStyle.fieldSection)}>
        <Btn
          dataTestId="edt-opt-stng"
          variant="primary-outline"
          size="sm"
          className={css({ mt: 10 })}
          onClick={openOptionModal}
        >
          {__('Add/Edit Options')}
          <span className={css(style.plsIcn)}>
            <CloseIcn size="13" stroke="3" />
          </span>
        </Btn>
      </div>
      <FieldSettingsDivider />

      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={closeOptionModal}
        className="o-v"
        title={__('Options')}
        width="800px"
      >
        <EditOptions
          optionMdl={optionMdl}
          options={options}
          setOptions={newOpts => handleOptions(newOpts)}
          lblKey="lbl"
          valKey="val"
          imgKey="img"
          type={fieldData.typ}
          showUpload
          // hideNDisabledOptions
          onlyVisualOptionsTab
        />
      </Modal>
    </div>
  )
}

export default memo(ImageSelectFieldSettings)

const style = {
  plsIcn: {
    ml: 3, mt: 3, tm: 'rotate(45deg)',
  },
  tikPosIcn: {
    flx: 'align-center',
    mt: 10,
  },
  icn: {
    mr: 2,
  },
}
