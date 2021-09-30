import { useFela } from 'react-fela'
import ut from '../../../styles/2.utilities'
import { __ } from '../../../Utils/i18nwrap'
import CoolCopy from '../../Utilities/CoolCopy'
import Back2FldBtn from '../Back2FldBtn'

export default function FieldSettingTitle({ title, subtitle, fieldKey }) {
  const { css } = useFela()
  return (
    <>
      <div className={`${css(style.section)} ${css(style.flxColumn)}`}>
        <Back2FldBtn size="20" className={css(style.btn)} />
        <div>
          <div className={css(style.mainTitle)}>{__(title, 'bitform')}</div>
          <span className={`${css(style.subtitle)} ${css(ut.fontBody)}`}>{__(subtitle[0].toUpperCase() + subtitle.slice(1), 'bitform')}</span>
        </div>
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
