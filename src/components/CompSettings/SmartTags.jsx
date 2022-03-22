/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $fieldsArr } from '../../GlobalStates/GlobalStates'
import { deepCopy } from '../../Utils/Helpers'
import { SmartTagField } from '../../Utils/StaticData/SmartTagField'

function SmartTags({ fieldName }) {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const formFields = useRecoilValue($fieldsArr)
  const { css } = useFela()
  const addField = (key) => {
    fieldData[fieldName] += `{${key}}`
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const fieldsList = formFields.filter(f => !f.type.match(/^(file-up|recaptcha|title)$/))

  return (
    <div className={css(style.main)}>
      {!!fieldsList.length && (
        <ul className={css(style.ul)}>
          <h4 style={{ margin: 0 }}>Form Fields</h4>
          {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha|title)$/)
            && (
              <li className={css(style.li)}>
                <button
                  type="button"
                  className={`${css(style.button)} btnHover`}
                  title={f.name}
                  onClick={() => addField(f.key)}
                >
                  {f.name}
                </button>
              </li>
            ))}
        </ul>
      )}

      <ul className={css(style.ul)}>
        <h4 style={{ margin: 0 }}>Smart Tags</h4>
        {SmartTagField.map(f => (
          <li className={css(style.li)}>
            <button
              type="button"
              className={`${css(style.button)} btnHover`}
              title={f.label}
              onClick={() => addField(f.value)}
            >
              {f.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
const style = {
  main: {
    h: 300,
    ow: 'scroll',
  },
  ul: { mt: 10 },
  li: {
    mb: 0,
    mt: 5,
    ml: 5,
  },
  button: {
    fw: 'normal',
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
}

export default SmartTags
