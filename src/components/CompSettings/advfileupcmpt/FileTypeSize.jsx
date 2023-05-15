/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $fields } from '../../../GlobalStates/GlobalStates'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import { getNumFromStr, getStrFromStr } from '../../style-new/styleHelpers'
import TableCheckBox from '../../Utilities/TableCheckBox'
import SizeControl from '../StyleCustomize/ChildComp/SizeControl'

function FileTypeSize({ action }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const { css } = useFela()
  const fileSizeChange = (e) => {
    const { name } = e.target
    if (e.target.checked) {
      fieldData.config[name] = '1MB'
    } else {
      delete fieldData.config[name]
    }
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    addToBuilderHistory(generateHistoryData('', fldKey, 'File Size', e.target.checked, { fields: getLatestState('fields') }))
  }

  const sizeHandler = (value, unit, typ) => {
    const newVal = `${value}${unit}`
    fieldData.config[typ] = newVal
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    addToBuilderHistory(generateHistoryData('', fldKey, typ, newVal, { fields: getLatestState('fields') }))
  }
  const getNumberValue = (propName) => getNumFromStr(fieldData.config[propName])
  const getUnit = (propName) => getStrFromStr(fieldData.config[propName])

  return (
    <div className={css(ut.mt2, ut.px10)}>
      <div>
        <div className={css(ut.flxcb, ut.mt2)}>
          <TableCheckBox
            id="min-fil-siz"
            cls={css(ut.mr2)}
            name="minFileSize"
            onChange={fileSizeChange}
            title={__('Min File Size')}
            checked={fieldData?.config?.minFileSize || false}
          />

          {fieldData?.config?.minFileSize && (
            <SizeControl
              className={css(ut.mt1)}
              width={94}
              options={['MB', 'KB']}
              sizeHandler={({ unitKey, unitValue }) => sizeHandler(unitValue, unitKey, 'minFileSize')}
              value={getNumberValue('minFileSize')}
              unit={getUnit('minFileSize')}
              inputHandler={({ unit, value }) => sizeHandler(value, unit, 'minFileSize')}
              dataTestId="min-fil-siz"
            />
          )}
        </div>
        {fieldData?.config?.minFileSize && (
          <>
            <div className={css(FieldStyle.placeholder)}>
              <input
                data-testid="min-fil-siz-excd-inp"
                placeholder="File is too small"
                className={css(FieldStyle.input)}
                type="text"
                name="labelMinFileSizeExceeded"
                value={fieldData?.config?.labelMinFileSizeExceeded}
                onChange={action}
              />
            </div>
            <div className={css(FieldStyle.placeholder)}>
              <input
                data-testid="min-fil-siz-lbl-inp"
                placeholder="Minimum file size is {filesize}"
                className={css(FieldStyle.input)}
                type="text"
                name="labelMinFileSize"
                value={fieldData?.config?.labelMinFileSize}
                onChange={action}
              />
            </div>
          </>
        )}
      </div>
      <div>
        <div className={css(ut.flxcb, ut.mt2)}>
          <TableCheckBox
            id="max-fil-siz"
            cls={css(ut.mr2)}
            name="maxFileSize"
            onChange={fileSizeChange}
            title={__('Max File Size')}
            checked={fieldData?.config?.maxFileSize || false}
          />
          {fieldData?.config?.maxFileSize && (
            <SizeControl
              className={css(ut.mt1)}
              label=""
              width={94}
              options={['MB', 'KB']}
              sizeHandler={({ unitKey, unitValue }) => sizeHandler(unitValue, unitKey, 'maxFileSize')}
              value={getNumberValue('maxFileSize')}
              unit={getUnit('maxFileSize')}
              inputHandler={({ unit, value }) => sizeHandler(value, unit, 'maxFileSize')}
              dataTestId="max-fil-siz"
            />
          )}
        </div>
        {fieldData?.config?.maxFileSize && (
          <>
            <div className={css(FieldStyle.placeholder)}>
              <input
                data-testid="max-fil-siz-excd-inp"
                placeholder="File is too large"
                className={css(FieldStyle.input)}
                type="text"
                name="labelMaxFileSizeExceeded"
                value={fieldData?.config?.labelMaxFileSizeExceeded}
                onChange={action}
              />
            </div>
            <div className={css(FieldStyle.placeholder)}>
              <input
                data-testid="max-fil-siz-lbl-inp"
                placeholder="Maximum file size is {filesize}"
                className={css(FieldStyle.input)}
                type="text"
                name="labelMaxFileSize"
                value={fieldData?.config?.labelMaxFileSize}
                onChange={action}
              />
            </div>
          </>
        )}
      </div>
      <div>
        <div className={css(ut.flxcb, ut.mt2)}>
          <TableCheckBox
            id="max-totl-fil-siz"
            cls={css(ut.mr2)}
            name="maxTotalFileSize"
            onChange={fileSizeChange}
            title={__('Max Total File Size')}
            checked={fieldData?.config?.maxTotalFileSize || false}
          />
          {fieldData?.config?.maxTotalFileSize && (
            <SizeControl
              className={css(ut.mt1)}
              label=""
              width={94}
              options={['MB', 'KB']}
              sizeHandler={({ unitKey, unitValue }) => sizeHandler(unitValue, unitKey, 'maxTotalFileSize')}
              value={getNumberValue('maxTotalFileSize')}
              unit={getUnit('maxTotalFileSize')}
              inputHandler={({ unit, value }) => sizeHandler(value, unit, 'maxTotalFileSize')}
              dataTestId="max-totl-fil-siz"
            />
          )}
        </div>
        {fieldData?.config?.maxTotalFileSize && (
          <>
            <div className={css(FieldStyle.placeholder)}>
              <input
                data-testid="max-totl-fil-siz-excd-inp"
                placeholder="Maximum total size exceeded"
                className={css(FieldStyle.input)}
                type="text"
                name="labelMaxTotalFileSizeExceeded"
                value={fieldData?.config?.labelMaxTotalFileSizeExceeded}
                onChange={action}
              />
            </div>
            <div className={css(FieldStyle.placeholder)}>
              <input
                data-testid="max-totl-fil-siz-lbl-inp"
                placeholder="Maximum total file size is {filesize}"
                className={css(FieldStyle.input)}
                type="text"
                name="labelMaxTotalFileSize"
                value={fieldData?.config?.labelMaxTotalFileSize}
                onChange={action}
              />
            </div>
          </>
        )}
      </div>

    </div>
  )
}
export default FileTypeSize
