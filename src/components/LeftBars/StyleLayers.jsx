import { useFela } from 'react-fela'
import { useHistory, useParams } from 'react-router-dom'
import FocusIcn from '../../Icons/FocusIcn'
import TweaksIcn from '../../Icons/TweaksIcn'
// import SettingsIcn from '../../Icons/SettingsIcn'
import ut from '../../styles/2.utilities'
// import ut from '../../styles/2.utilities'
import LayerAccordion from '../CompSettings/StyleCustomize/ChildComp/LayerAccordion'
import { highlightElm, removeHightlight } from '../style-new/styleHelpers'

export default function StyleLayers() {
  const { css } = useFela()

  return (
    <div className={css(s.con)}>
      <h4 className={css(s.title)}>Elements & Layers</h4>
      <div className={css(s.divider)} />
      <h5 className={css(s.subtitle, ut.mt1, ut.fontH)}>Common Elements</h5>
      <NavBtn route="theme-customization" label="Theme Quick Tweaks asdasdasdasd" icn={<TweaksIcn size={13} />} />
      <NavBtn route="field-container" label="Field Blocks" />
      <NavBtn route="label-subtitle-container" label="Label Containers" />
      <NavBtn route="label" label="Labels" />
      <NavBtn route="subtitle" label="Sub Labels" />
      <NavBtn route="helper-text" label="Helper Texts" />
      <NavBtn route="error-messages" label="Error Messages" />

      <h5 className={css(s.subtitle, ut.fontH, { mt: 12 })}>Individual Elements</h5>

      <LayerAccordion title="Texfield">
        <NavBtn route="error-messages" label="Quick Tweaks" offset="2.5" icn={<TweaksIcn size={13} />} />
        <NavBtn route="error-messages" label="Field Container" offset="2.5" />
        <NavBtn route="error-messages" label="Label Container" offset="2.5" />
        <NavBtn route="error-messages" label="Label" offset="2.5" />
        <NavBtn route="error-messages" label="Sub Label" offset="2.5" />
        <NavBtn route="error-messages" label="Helper Text" offset="2.5" />
        <NavBtn route="error-messages" label="Error Message" offset="2.5" />
      </LayerAccordion>
      <LayerAccordion title="Checkbox">
        <NavBtn route="error-messages" label="Quick Tweaks" offset="2.5" titleClass={{ fw: 600 }} />
        <NavBtn route="error-messages" label="Field Container" offset="2.5" />
        <NavBtn route="error-messages" label="Label Container" offset="2.5" />
        <NavBtn route="error-messages" label="Label" offset="2.5" />
        <NavBtn route="error-messages" label="Sub Label" offset="2.5" />
        <NavBtn route="error-messages" label="Helper Text" offset="2.5" />
        <NavBtn route="error-messages" label="Error Message" offset="2.5" />
      </LayerAccordion>

    </div>
  )
}
function NavBtn({ route, label, offset = 1, icn, highlightSelector }) {
  const { formType, formID } = useParams()
  const history = useHistory()
  const styleHandler = () => {
    history.push(`/form/builder/${formType}/${formID}/theme-customize/${route}`)
  }
  const { css } = useFela()
  return (
    <div
      className={css(s.navBtn)}
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
      </div>
      <div className={css(s.navActionBtn)} data-action-btn>
        <div
          onMouseOver={() => highlightElm('highlightSelector')}
          onFocus={() => highlightElm('highlightSelector')}
          onMouseLeave={() => removeHightlight()}
          onBlur={() => removeHightlight()}
          role="button"
          tabIndex="0"
          className={css(s.highlightBtn)}
          title="Highlight Element in Builder"
        >
          <FocusIcn size={15} stroke="2.5" />
        </div>
      </div>
    </div>
  )
}

const s = {
  con: {
    ff: 'Roboto, sans-serif',
    mxw: 250,
    h: '100%',
    bs: '0 0 0 1px var(--b-44-87)',
    ow: 'hidden',
    '& .toggle-icn': { oy: '0' },
    ':hover': { '& .toggle-icn': { oy: '1' } },
  },
  title: {
    ff: '"Montserrat", sans-serif',
    mt: 7,
    bs: 'none',
    mb: 10,
    mx: 8,
    wb: 'keep-all',
    ws: 'nowrap',
  },
  subtitle: {
    mx: 8,
    mb: 8,
    fs: 14,
    fw: 500,
    cr: '#9a9fb9',
    wb: 'keep-all',
    ws: 'nowrap',
  },
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
    ':hover': {
      bd: '#eeeff7',
      '& div[data-action-btn]': { dy: 'flex' },
    },
  },
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
  divider: { bb: '1px solid var(--white-0-83)' },
}
