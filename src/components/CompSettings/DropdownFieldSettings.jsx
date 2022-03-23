import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $updateBtn } from '../../GlobalStates/GlobalStates'
import EditIcn from '../../Icons/EditIcn'
import TrashIcn from '../../Icons/TrashIcn'
import ut from '../../styles/2.utilities'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import CheckBox from '../Utilities/CheckBox'
import Modal from '../Utilities/Modal'
import SingleToggle from '../Utilities/SingleToggle'
import AdminLabelSettings from './CompSettingsUtils/AdminLabelSettings'
import FieldDisabledSettings from './CompSettingsUtils/FieldDisabledSettings'
import FieldHideSettings from './CompSettingsUtils/FieldHideSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import FieldReadOnlySettings from './CompSettingsUtils/FieldReadOnlySettings'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import HelperTxtSettings from './CompSettingsUtils/HelperTxtSettings'
import PlaceholderSettings from './CompSettingsUtils/PlaceholderSettings'
import RequiredSettings from './CompSettingsUtils/RequiredSettings'
import SubTitleSettings from './CompSettingsUtils/SubTitleSettings'
import UniqFieldSettings from './CompSettingsUtils/UniqFieldSettings'
import EditOptions from './EditOptions/EditOptions'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'

export default function DropdownSettings() {
  const { fieldKey: fldKey } = useParams()
  if (!fldKey) return <>No field exist with this field key</>
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const { css } = useFela()
  const [fields, setFields] = useRecoilState($fields)
  const [optionMdl, setOptionMdl] = useState(false)
  const [duplicateListName, setDuplicateListName] = useState(false)
  const [currentOptList, setCurrentOptList] = useState(0)
  const fieldData = deepCopy(fields[fldKey])
  const adminLabel = fieldData.adminLbl || ''

  const openOptionModal = () => {
    setOptionMdl(true)
  }

  const { optionsList } = fieldData

  const { selectedOptImage, selectedOptClearable, searchClearable,
    optionIcon,
    showSearchPh,
    searchPlaceholder, multipleSelect, closeOnSelect, activeList } = fieldData.config

  const handleConfigChange = (val, name) => {
    fieldData.config[name] = val
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const toggleSearchPlaceholder = (e) => {
    if (e.target.checked) {
      fieldData.config.searchPlaceholder = 'Search Country Here...'
      fieldData.config.showSearchPh = true
    } else {
      fieldData.config.searchPlaceholder = ''
      fieldData.config.showSearchPh = false
    }
    const req = e.target.checked ? 'Show' : 'Hide'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${req} Search Placeholder: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_placeholder`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setSearchPlaceholder(e) {
    fieldData.config.searchPlaceholder = e.target.value
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Search Placeholder updated: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_placeholder', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }
  const handleOptionList = ({ target }, index) => {
    fieldData.config.activeList = index
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }
  const handleEditOptions = newOpts => {
    setFields(allFields => produce(allFields, draft => { draft[fldKey].optionsList[currentOptList][Object.keys(fieldData.optionsList[currentOptList])[0]] = newOpts }))
  }

  const handleAddNewOptionList = () => {
    let newKey = `List-${Object.keys(optionsList).length + 1}`
    while (isListNameExist(newKey)) { newKey = `${newKey}1` }
    fieldData.optionsList = [
      ...optionsList, {
        [newKey]: [
          { lbl: 'Option 1', val: 'Option 1' },
          { lbl: 'Option 2', val: 'Option 2' },
          { lbl: 'Option 3', val: 'Option 3' },
        ],
      },
    ]
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const isListNameExist = (listName) => {
    const len = optionsList.length
    for (let i = 0; i < len; i += 1) {
      if (Object.keys(optionsList[i])[0] === listName) {
        return true
      }
    }
    return false
  }

  const handleRemoveList = (index) => {
    fieldData.optionsList.splice(index, 1)
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const handleListNameChange = (e, index) => {
    const { target } = e
    if (!isListNameExist(target.value)) {
      fieldData.optionsList[index] = { [target.value]: fieldData.optionsList[index][target.defaultValue] }
      setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
      setDuplicateListName(false)
    } else {
      e.preventDefault()
      setDuplicateListName(index)
    }
  }

  return (
    <>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />

      <FieldLabelSettings />

      <FieldSettingsDivider />

      <AdminLabelSettings />

      <FieldSettingsDivider />

      <SubTitleSettings />

      <FieldSettingsDivider />

      <HelperTxtSettings />

      <FieldSettingsDivider />

      <RequiredSettings />

      <FieldSettingsDivider />

      <FieldReadOnlySettings />

      <FieldSettingsDivider />

      <FieldDisabledSettings />

      <FieldSettingsDivider />

      <PlaceholderSettings />

      <FieldSettingsDivider />

      <SimpleAccordion
        title={__('Search Placeholder', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={toggleSearchPlaceholder}
        toggleChecked={showSearchPh}
        open={showSearchPh}
        disable={!showSearchPh}
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            aria-label="Placeholer for Country Search"
            placeholder="Type Placeholder here..."
            className={css(FieldStyle.input)}
            type="text"
            value={searchPlaceholder}
            onChange={setSearchPlaceholder}
          />
        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Show Selected Option Image:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'selectedOptImage')}
        isChecked={selectedOptImage}
      />

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Selected Option Clearable:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'selectedOptClearable')}
        isChecked={selectedOptClearable}
      />

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Search Clearable:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'searchClearable')}
        isChecked={searchClearable}
      />

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Option Icon:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'optionIcon')}
        isChecked={optionIcon}
      />

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Allow Custom Option:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'allowCustomOption')}
        isChecked={closeOnSelect}
      />

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Multiple Select:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'closeOnSelect')}
        isChecked={closeOnSelect}
      />

      <FieldSettingsDivider />

      <SingleToggle
        className={css(FieldStyle.fieldSection, FieldStyle.singleOption)}
        title={__('Close On Select:', 'bitform')}
        action={e => handleConfigChange(e.target.checked, 'multipleSelect')}
        isChecked={multipleSelect}
      />

      <FieldSettingsDivider />

      <UniqFieldSettings
        type="entryUnique"
        title="Validate as Entry Unique"
        tipTitle="Enabling this option will check from the entry database whether its value is duplicate."
        className={css(FieldStyle.fieldSection)}
        isUnique="show"
      />
      <FieldSettingsDivider />

      <FieldHideSettings />

      <FieldSettingsDivider />

      <SimpleAccordion
        title="Lists & Options"
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css({ p: '5px 10px' })}>
          <span>Options Lists</span>

          {optionsList.map((listObj, index) => {
            const listName = Object.keys(listObj)

            return (
              <>

                <div className={css(ut.flxcb)}>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={listName}
                    className={css(FieldStyle.input, { mr: 10, mt: 3 })}
                    onChange={e => handleListNameChange(e, index)}
                  />
                  <CheckBox
                    radio
                    name="option-list"
                    className={css({ p: 0 })}
                    onChange={e => handleOptionList(e, index)}
                    checked={index === activeList}
                    value={index}
                  />
                  <button
                    type="button"
                    className={css(c.delBtn)}
                    onClick={() => {
                      setCurrentOptList(index)
                      openOptionModal()
                    }}
                  >
                    <EditIcn size={19} />
                  </button>

                  <button
                    type="button"
                    className={css(c.delBtn)}
                    onClick={() => handleRemoveList(index)}
                  >
                    <TrashIcn size={19} />
                  </button>
                </div>
                {duplicateListName === index && <span className={css({ cr: 'red', ml: 5 })}>Duplicate List Name Not Allowed</span>}
              </>
            )
          })}
          <button onClick={handleAddNewOptionList} className={css(app.btn, { my: 0 })} type="button">
            &nbsp;
            {__('Add Options List', 'bitform')}
          </button>

        </div>
      </SimpleAccordion>

      <FieldSettingsDivider />

      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={() => setOptionMdl(false)}
        className="o-v"
        title={__('Options', 'bitform')}
      >
        <div className="pos-rel">
          <EditOptions
            optionMdl={optionMdl}
            options={Object.values(optionsList[currentOptList])[0]}
            setOptions={newOpts => handleEditOptions(newOpts)}
            lblKey="lbl"
            valKey="val"
            type="radio"
          />
        </div>
      </Modal>
    </>
  )
}

const c = {
  delBtn: {
    se: 25,
    flx: 'center',
    b: 'none',
    p: 3,
    mr: 1,
    tn: '.2s all',
    curp: 1,
    brs: '50%',
    bd: 'none',
    ':hover': { bd: '#7ea8ff', cr: '#460000' },
  },
}
