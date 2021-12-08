import { useFela } from 'react-fela'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Scrollbars from 'react-custom-scrollbars-2'
import FocusIcn from '../../Icons/FocusIcn'
import TweaksIcn from '../../Icons/TweaksIcn'
import { $fields } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import LayerAccordion from '../CompSettings/StyleCustomize/ChildComp/LayerAccordion'
import { highlightElm, removeHightlight } from '../style-new/styleHelpers'

export default function StyleLayers() {
  const { css } = useFela()
  const fields = useRecoilValue($fields)
  const activeFields = Object.entries(fields).filter(([, fld]) => !fld.hidden)

  return (
    <div className={css(s.con)}>
      <h4 className={css(s.title)}>Elements & Layers</h4>
      <div className={css(s.divider)} />
      <Scrollbars style={{ height: 'calc(100% - 120px' }} autoHide>
        <div className={css(s.scrollDiv)}>

          <h5 className={css(s.subtitle, ut.mt1, ut.fontH)}>Common Elements</h5>
          <NavBtn route="quick-tweaks" label={<span className={css({ fw: 500 })}>Theme Quick Tweaks</span>} icn={<TweaksIcn size={13} />} />
          <NavBtn route="field-container" label="Field Blocks" highlightSelector="[data-dev-fld-wrp]" offset="3" />
          <NavBtn route="label-container" label="Label Containers" offset="3" highlightSelector="[data-dev-lbl-wrp]" />
          <NavBtn route="label" label="Labels" offset="3" highlightSelector="[data-dev-lbl]" />
          <NavBtn route="subtitle" label="Sub Labels" offset="3" highlightSelector="[data-dev-sub-titl]" />
          <NavBtn route="helper-text" label="Helper Texts" offset="3" highlightSelector="[data-dev-hlp-txt]" />
          <NavBtn route="error-messages" label="Error Messages" offset="3" highlightSelector="[data-dev-err-msg]" />

          <h5 className={css(s.subtitle, ut.fontH, { mt: 12 })}>Individual Elements</h5>
          {activeFields.map(([fldKey, fldData]) => (
            <LayerAccordion title={fldData.typ} tag={fldKey} key={`${fldKey}`}>
              <NavBtn subRoute={fldKey} route="field-container" label="Field Container" offset="2.5" highlightSelector={`[data-dev-fld-wrp="${fldKey}"]`} />
              <NavBtn subRoute={fldKey} route="label-subtitle-container" label="Label Container" offset="2.5" highlightSelector={`[data-dev-lbl-wrp="${fldKey}"]`} />
              <NavBtn subRoute={fldKey} route="label" label="Label" offset="2.5" highlightSelector={`[data-dev-lbl="${fldKey}"]`} />
              <NavBtn subRoute={fldKey} route="subtitle" label="Subtitle" offset="2.5" highlightSelector={`[data-dev-sub-titl="${fldKey}"]`} />
              <NavBtn subRoute={fldKey} route="helper-text" label="Helper Text" offset="2.5" highlightSelector={`[data-dev-hlp-txt="${fldKey}"]`} />
              <NavBtn subRoute={fldKey} route="Error Message" label="Error Message" offset="2.5" highlightSelector={`[data-dev-err-msg="${fldKey}"]`} />
            </LayerAccordion>
          ))}
        </div>
      </Scrollbars>
    </div>
  )
}
function NavBtn({ route, subRoute, label, offset = 1, icn, highlightSelector }) {
  const { formType, formID, fldKey, element } = useParams()
  let active = false
  console.log({ fldKey, element, route, subRoute })
  if (!subRoute && element === route) {
    active = true
  } else if (subRoute === fldKey && route === element) {
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
      </div>
      <div className={css(s.navActionBtn)} data-action-btn>
        {highlightSelector && (
          <div
            onMouseEnter={() => highlightElm(highlightSelector)}
            onFocus={() => highlightElm(highlightSelector)}
            onMouseLeave={() => removeHightlight()}
            onBlur={() => removeHightlight()}
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
  scrollDiv: { ow: 'hidden' },
  divider: { bb: '1px solid var(--white-0-83)' },
}
