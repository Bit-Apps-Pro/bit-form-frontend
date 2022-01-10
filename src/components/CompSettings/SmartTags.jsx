/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $fieldsArr } from '../../GlobalStates/GlobalStates'
import { deepCopy } from '../../Utils/Helpers'

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

  const others = [
    { label: 'Administrator Email', value: 'bf_admin_email' },
    { label: 'Date(mm/dd/yyy)', value: 'bf_date.m/d/Y' },
    { label: 'Date(dd/mm/yyy)', value: 'bf_date.d/m/Y' },
    { label: 'Embedded Post/Page ID', value: 'bf_emabedded_page_id' },
    { label: 'Embedded Post/Page Title', value: 'bf_emabedded_page_title' },
    { label: 'Embedded URL', value: 'bf_embedded_url' },
    { label: 'Form Name', value: 'bf_form_name' },
    { label: 'Form ID', value: 'bf_form_id' },
    { label: 'Referer URL', value: 'bf_http_referer_url' },
    { label: 'User IP Address', value: 'bf_ip_address' },
    { label: 'User ID', value: 'bf_user_id' },
    { label: 'Author Display Name', value: 'bf_user_display_name' },
    { label: 'Author Email', value: 'bf_user_display_name' },
    { label: 'Author First Name', value: 'bf_user_first_name' },
    { label: 'Author Last Name', value: 'bf_user_last_name' },
    { label: 'User Browser Client', value: 'bf_user_browser_client' },
    { label: 'User Operating System', value: 'bf_user_operating_system' },
    { label: 'Site URL', value: 'bf_site_url' },
    { label: 'Site Title', value: 'bf_site_title' },
  ]

  return (
    <div className={css(style.main)}>
      <ul>
        <h4 style={{ margin: 0 }}>Form Fields</h4>
        {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha|title)$/)
          && (
            <li>
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
      <ul>
        <h4 style={{ margin: 0 }}>Smart Tags</h4>
        {others !== null && others.map(f => (
          <li>
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
}

export default SmartTags
