/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import { $fields, $selectedFieldId } from '../../../GlobalStates/GlobalStates'
import ut from '../../../styles/2.utilities'
import FieldStyle from '../../../styles/FieldStyle.style'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import SizeControl from '../StyleCustomize/ChildComp/SizeControl'
import TableCheckBox from '../../Utilities/TableCheckBox'

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
  }

  const sizeHandler = (e, typ) => {
    const val = findValue(fieldData.config, typ)
    fieldData.config[typ] = val.toString().concat(e.target.value)
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const inputHandler = (e, typ) => {
    fieldData.config[typ] = e.toString().concat(findByte(fieldData.config, typ))
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const findByte = (data, typ) => {
    const val = data?.[typ]?.match(/KB|MB|GB/)
    if (val) {
      return val[0]
    }
    return 'MB'
  }

  const findValue = (data, typ) => {
    const val = data?.[typ]?.split(findByte(data, typ))
    if (val) {
      return val[0]
    }
    return 1
  }

  return (
    <div className={css(ut.mt2, ut.px10)}>
      <div>
        <div className={css(ut.flxcb, ut.mt2)}>
          <TableCheckBox
            cls={css(ut.mr2)}
            name="minFileSize"
            onChange={fileSizeChange}
            title={__('Min File Size', 'bitform')}
            checked={fieldData?.config?.minFileSize || false}
          />

          {fieldData?.config?.minFileSize && (
            <SizeControl
              className={css(ut.mt1)}
              width={94}
              options={['MB', 'KB']}
              sizeHandler={(e) => sizeHandler(e, 'minFileSize')}
              byteType={findByte(fieldData?.config, 'minFileSize')}
              value={findValue(fieldData?.config, 'minFileSize')}
              inputHandler={(e) => inputHandler(e, 'minFileSize')}
            />
          )}
        </div>
        {fieldData?.config?.minFileSize && (
          <>
            <div className={css(FieldStyle.placeholder)}>
              <input
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
            cls={css(ut.mr2)}
            name="maxFileSize"
            onChange={fileSizeChange}
            title={__('Max File Size', 'bitform')}
            checked={fieldData?.config?.maxFileSize || false}
          />
          {fieldData?.config?.maxFileSize && (
            <SizeControl
              className={css(ut.mt1)}
              label=""
              width={94}
              options={['MB', 'KB']}
              sizeHandler={(e) => sizeHandler(e, 'maxFileSize')}
              sizeVal={findByte(fieldData?.config, 'maxFileSize')}
              value={findValue(fieldData?.config, 'maxFileSize')}
              inputHandler={(e) => inputHandler(e, 'maxFileSize')}
            />
          )}
        </div>
        {fieldData?.config?.maxFileSize && (
          <>
            <div className={css(FieldStyle.placeholder)}>
              <input
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
            cls={css(ut.mr2)}
            name="maxTotalFileSize"
            onChange={fileSizeChange}
            title={__('Max Total File Size', 'bitform')}
            checked={fieldData?.config?.maxTotalFileSize || false}
          />
          {fieldData?.config?.maxTotalFileSize && (
            <SizeControl
              className={css(ut.mt1)}
              label=""
              width={94}
              options={['MB', 'KB']}
              sizeHandler={(e) => sizeHandler(e, 'maxTotalFileSize')}
              sizeVal={findByte(fieldData?.config, 'maxTotalFileSize')}
              value={findValue(fieldData?.config, 'maxTotalFileSize')}
              inputHandler={(e) => inputHandler(e, 'maxTotalFileSize')}
            />
          )}
        </div>
        {fieldData?.config?.maxTotalFileSize && (
          <>
            <div className={css(FieldStyle.placeholder)}>
              <input
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
