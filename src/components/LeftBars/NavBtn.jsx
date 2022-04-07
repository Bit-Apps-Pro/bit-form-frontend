import { useFela } from 'react-fela'
import { useHistory, useParams } from 'react-router-dom'
import FocusIcn from '../../Icons/FocusIcn'
import ut from '../../styles/2.utilities'
import { highlightElm, removeHighlight } from '../style-new/styleHelpers'
import Cooltip from '../Utilities/Cooltip'

export default function NavBtn({ route, subRoute, cssSelector, label, offset = 1, icn, highlightSelector, styleOverride }) {
  const { formType, formID, fieldKey, element, rightBar } = useParams()

  let active = false
  if (rightBar === 'theme-customize' && !fieldKey && !subRoute && element === route) {
    active = true
  } else if (rightBar === 'field-theme-customize' && subRoute && subRoute === fieldKey && element === route) {
    active = true
  }
  const history = useHistory()
  const styleHandler = () => {
    if (!subRoute) history.push(`/form/builder/${formType}/${formID}/theme-customize/${route}`)
    else history.push(`/form/builder/${formType}/${formID}/field-theme-customize/${route}/${subRoute}`)
  }
  const { css } = useFela()
  return (
    <div
      className={css(s.navBtn, active && s.navBtnActive)}
      style={{ paddingLeft: offset * 10 }}
      type="button"
      value={route}
      onClick={styleHandler}
      onKeyPress={styleHandler}
      role="button"
      tabIndex="0"
    >
      <div className={css(ut.flxc)}>
        {icn && <span className={css(ut.flxc, { mr: 5 })}>{icn}</span>}
        {label}
        {styleOverride && <span className={css(s.overrideIndicator)} title="Theme styles overrided" />}
      </div>
      <div className={css(s.navActionBtn, ut.mr2)} data-action-btn>
        {cssSelector && (
          <Cooltip width={180} icnSize={15} className={`${css(ut.mr2)} hovertip`}>
            <div className={css(s.tipBody)}>
              {`CSS Selector: ${cssSelector}`}
            </div>
          </Cooltip>
        )}
        {highlightSelector && (
          <div
            onMouseEnter={() => highlightElm(highlightSelector)}
            onFocus={() => highlightElm(highlightSelector)}
            onMouseLeave={() => removeHighlight()}
            onBlur={() => removeHighlight()}
            role="button"
            tabIndex="0"
            className={css(s.highlightBtn)}
            title="Highlight Element in Builder"
          >
            <FocusIcn size={15} stroke="2.5" />
          </div>
        )}
      </div>
    </div>
  )
}

const s = {
  navBtn: {
    w: '100%',
    h: 26,
    fs: 13,
    ta: 'left',
    p: 0,
    pl: 13,
    lh: 2,
    cr: 'inherit',
    flx: 'center-between',
    wb: 'keep-all',
    ws: 'nowrap',
    pn: 'relative',
    us: 1,
    curp: 1,
    ':focus-within': { '& div[data-action-btn]': { dy: 'flex' } },
    ':focus-visible': {
      focusShadow: 1,
      '& div[data-action-btn]': { dy: 'flex' },
    },
    '& .hovertip': { oy: 0 },
    ':hover': {
      '& .hovertip': { oy: 1 },
      bd: '#eeeff7',
      '& div[data-action-btn]': { dy: 'flex' },
    },
  },
  navBtnActive: { bd: '#eeeff7' },
  navActionBtn: {
    h: '100%',
    b: 'none',
    pn: 'absolute',
    bd: 'linear-gradient(90deg, transparent, #eeeff7 45%)',
    rt: 0,
    jc: 'center',
    ai: 'center',
    dy: 'none',
    pl: 15,
  },
  highlightBtn: {
    flx: 'center',
    brs: 5,
    h: 20,
    w: 20,
    curp: 1,
    ':focus-visible': { focusShadow: 1 },
    ':hover': { bd: '#d3d3d3' },
  },
  tipBody: {
    lh: '1.1',
    fs: '12.5px',
    fw: 100,
    ff: '"Roboto", sans-serif',
  },
  overrideIndicator: {
    w: '5px',
    h: '5px',
    brs: '50%',
    bc: '#ffd64f',
    ml: '3px',
    px: 2,
  },
}
