import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Back2FldBtn from './Back2FldBtn'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'

export default function ReCaptchaSettigns() {
  const { css } = useFela()
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const onInput = ({ target: { name, value } }) => {
    fieldData[name] = value
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  return (
    <div>
      <div className={css(style.section, style.flxColumn)}>
        <Back2FldBtn size="20" className={css(style.btn)} />
        <div>
          <div className={css(style.mainTitle)}>{__('Field Settings', 'bitform')}</div>
          <span className={css(style.subtitle, ut.fontBody)}>{__('reCAPTCHA', 'bitform')}</span>
        </div>
      </div>
      <hr className={css(style.divider)} />

      {/* <Back2FldList />
      <div className="mb-2">
        <span className="font-w-m">
          {__('Field Type :', 'bitform')}
        </span>
        {__('reCAPTCHA', 'bitform')}
      </div> */}
      <SimpleAccordion
        title="Theme"
        className={css(FieldStyle.fieldSection)}
      >
        <select onChange={onInput} name="theme" value={fieldData.theme} className={css(style.input, ut.w10)}>
          <option value="dark">{__('Dark', 'bitform')}</option>
          <option value="light">{__('Light', 'bitform')}</option>
        </select>
      </SimpleAccordion>
      <hr className={css(style.divider)} />
      {/* <div className={css(style.section)}>
        <label htmlFor="recap-thm">
          {__('Theme', 'bitform')}
          <select onChange={onInput} name="theme" value={fieldData.theme} className={css(style.input, ut.w10)}>
            <option value="dark">{__('Dark', 'bitform')}</option>
            <option value="light">{__('Light', 'bitform')}</option>
          </select>
        </label>
      </div> */}
    </div>
  )
}

const style = {
  section: {
    flx: 'center-between',
    mx: 10,
    my: 5,
    brs: 8,
    fw: 600,
  },
  input: {
    fs: 14,
    fw: 400,
    w: '96%',
    bd: 'var(--b-79-96) !important',
    oe: 'none !important',
    mx: 'auto',
    dy: 'block',
    my: 10,
    b: 'none !important',
    brs: '8px !important',
    ':focus': { bs: '0 0 0 2px var(--b-50) !important' },
  },
  flxColumn: {
    fd: 'column',
    jc: 'start !important',
    ai: 'self-start',
  },
  title: {
    fs: 14,
    fw: 600,
  },
  mainTitle: {
    fs: 16,
    fw: 700,
  },
  divider: {
    my: 0,
    mx: 10,
    bb: '0.5px soild var(--white-0-83)',
  },
  subtitle: { fs: 12, fw: 500 },
  btn: {
    oe: 'none',
    flx: 'center-between',
    tn: 'background 0.2s',
    // b: '1px solid var(--white-0-89)',
    // bc: 'var(--white-0-97)',
    bc: 'none',
    px: 4,
    brs: 8,
    cur: 'pointer',
    cr: 'var(--white-0-50)',
    bd: 'none !important',
    b: 'none',
    pl: '0 !important',
    ml: '-5px',
    mb: 5,
    fw: 400,
    '&:hover': { bc: 'var(--white-0-97) !important' },
  },
}
