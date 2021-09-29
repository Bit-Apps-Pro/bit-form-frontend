import { useFela } from 'react-fela'
import ut from '../../../styles/2.utilities'
import { __ } from '../../../Utils/i18nwrap'
import CoolCopy from '../../Utilities/CoolCopy'
import Back2FldBtn from '../Back2FldBtn'

export default function FieldSettingTitle({ title, subtitle, fieldKey }) {
  const { css } = useFela()
  return (
    <>
      <div className={`${css(style.section)}`}>
        <div>
          <div className={css(style.mainTitle)}>{__(title, 'bitform')}</div>
          <span className={`${css(style.subtitle)} ${css(ut.fontBody)}`}>{__(subtitle[0].toUpperCase() + subtitle.slice(1), 'bitform')}</span>
        </div>
        <Back2FldBtn size="20" className={css(style.btn)} />
      </div>

      <hr className={css(style.divider)} />

      <div className={`${css(style.section)}`}>
        <span className={css(style.title)}>Field key</span>
        <CoolCopy value={fieldKey} />
      </div>

      <hr className={css(style.divider)} />
    </>
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
  title: { fs: 14, fw: 600 },
  mainTitle: { fs: 16, fw: 700 },
  divider: {
    my: 0,
    mx: 10,
    bb: '0.5px soild var(--white-0-83)',
  },
  subtitle: { fs: 12, fw: 500 },
  btn: {
    oe: 'none',
    flx: 'center-between',
    b: '1px solid var(--white-0-89)',
    bc: 'var(--white-0-97)',
    px: 4,
    brs: 8,
    cur: 'pointer',
    cr: 'var(--white-0-50)',
  },
}
