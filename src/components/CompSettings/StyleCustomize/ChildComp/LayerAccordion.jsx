/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState, useRef } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import FocusIcn from '../../../../Icons/FocusIcn'
import SortIcn from '../../../../Icons/SortIcn'
import ut from '../../../../styles/2.utilities'
import { highlightElm, lowerCaseAllAndReplaceSpaceToHipen, removeHighlight } from '../../../style-new/styleHelpers'
import Cooltip from '../../../Utilities/Cooltip'

export default function LayerAccordion({
  className,
  route,
  title,
  children,
  childrenAccodin = false,
  fldData,
  open = false,
  actionComponent,
  offset = 0,
  tag,
  highlightSelector,
  onClick,
  styleOverride,
}) {
  const [tgl, setTgl] = useState(open)
  const [H, setH] = useState(open ? 'auto' : 0)
  const nodeRef = useRef(null)

  const { css } = useFela()
  const { '*': rightBarUrl } = useParams()
  const [rightBar, element] = rightBarUrl.split('/')

  const dataTestId = `${tag ? `${tag}-` : ''}${lowerCaseAllAndReplaceSpaceToHipen(title)}-acc`
  const dataTestFocusId = `${tag ? `${tag}-` : ''}${lowerCaseAllAndReplaceSpaceToHipen(title)}-acc-focus`
  useEffect(() => {
    setTgl(open)
  }, [open])

  let active

  if (rightBar === 'theme-customize' && element === route) {
    active = true
  }
  const toggleAccordion = (e) => {
    // e.preventDefault()

    if (e.type === 'keypress') {
      if (e.code === 'Space' || e.code === 'Enter') {
        setTgl(prv => !prv)
        return
      }
    }
    if (e.type === 'keyup') {
      if (e.code === 'Escape') {
        setTgl(false)
        return
      }
    }
    if (e.type === 'click') {
      setTgl(prv => !prv)
    }
  }

  const cancelBubble = (e) => e.stopPropagation()

  const getAbsoluteHeight = (el) => {
    const styles = window.getComputedStyle(el)
    const margin = parseFloat(styles.marginTop)
      + parseFloat(styles.marginBottom)
    return Math.ceil(el.offsetHeight + margin)
  }

  const setAccHeight = () => setH(getAbsoluteHeight(nodeRef.current))

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyUp={toggleAccordion}
      onKeyPress={toggleAccordion}
      className={`${className} ${tgl && css(cls.active)} ${css(cls.accordionLbl)}`}
      onClick={onClick}
      data-testid={dataTestId}
    >
      <div
        className={`btgl ${css({ w: '100%' })}`}
        tabIndex="-1"
        role="button"
        onClick={toggleAccordion}
        onKeyPress={toggleAccordion}
      >
        <div className={`${css(ut.flxc, cls.titlebar)} ${css(active && { bd: 'hsl(233deg 36% 95%)' })}`} style={{ paddingLeft: offset * 2 }}>
          <div>
            <SortIcn className={`toggle-icn ${css(cls.icn)} `} size="9" style={{ transform: `rotate(${tgl ? 180 : 90}deg)` }} />
          </div>
          <div className={css(cls.flxbwn)}>
            <div className={css(ut.flxc, ut.mr2)}>
              <span className={`title ${css(cls.dflx, !childrenAccodin && ut.fw500)}`}>
                {title}
              </span>
              {tag && (
                <span title={`Field key: ${tag}`} className={css(cls.titleTag)}>{tag}</span>
              )}
              {styleOverride && <span className={css(cls.overrideIndicator)} title="Theme styles override" />}
              {fldData && (
                <Cooltip width={150} icnSize={15} className={`${css(ut.mr2)} hovertip`}>
                  <div className={css(cls.tipBody)}>
                    {(fldData?.lbl || fldData?.txt || fldData?.adminLbl) && (
                      fldData.lbl || fldData.txt || fldData.adminLbl
                    )}
                  </div>
                </Cooltip>
              )}
              <div className={css(cls.navActionBtn)} data-action-btn-lbl>
                {highlightSelector && (
                  <div
                    onMouseEnter={() => highlightElm(highlightSelector)}
                    onFocus={() => highlightElm(highlightSelector)}
                    onMouseLeave={() => removeHighlight()}
                    onBlur={() => removeHighlight()}
                    role="button"
                    tabIndex="0"
                    className={css(cls.highlightBtn)}
                    title="Highlight Element in Builder"
                    data-testid={dataTestFocusId}
                  >
                    <FocusIcn size={15} stroke="2.5" />
                  </div>
                )}
              </div>
            </div>
            <div onClick={cancelBubble} onKeyPress={cancelBubble} role="button" tabIndex="-1">
              {actionComponent && actionComponent}
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: H, transition: 'height 300ms', overflow: H === 'auto' ? 'auto' : 'hidden' }}>
        <CSSTransition
          nodeRef={nodeRef}
          in={tgl}
          timeout={300}
          onEntering={setAccHeight}
          onEntered={() => setH('auto')}
          onExit={() => setH(nodeRef.current.offsetHeight)}
          onExiting={() => setH(0)}
          unmountOnExit
          style={{ overflow: tgl ? 'auto' : 'hidden' }}
        >
          <div
            ref={nodeRef}
            className={`body ${css(cls.body)}`}
            onClick={cancelBubble}
            onKeyPress={cancelBubble}
            style={{ paddingLeft: offset * 4 }}
          >
            {children}
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}
const cls = {
  flxbwn: { flx: 'between' },
  titlebar: {
    ws: 'nowrap',
    fw: 500,
    ow: 'hidden',
    ':hover': { bd: '#eeeff7' },
    '& .hovertip': { oy: 0 },
  },
  dflx: {
    flx: 'align-center',
    fw: 400,
    fs: 13,
    lh: 2,
    curp: 1,
    '& .hover-tip': { oy: 0 },
  },
  ':hover': { bd: 'var(--b-50-95)' },
  icn: {
    cr: '#c6c6c6',
    mr: 4,
    ml: 4,
    mt: -1,
    tn: 'transform 250ms',
  },
  body: { fs: 12 },
  titleTag: {
    p: '1px 5px',
    bd: '#EDF2F7',
    brs: 5,
    cr: 'gray',
    fs: 11,
    fw: 400,
    b: '1px solid #d8dde2',
    ml: '7px',
    curp: 1,
  },
  tipBody: {
    lh: '1.1',
    fs: '12.5px',
    fw: 100,
    ff: '"Roboto", sans-serif',
  },
  accordionLbl: {
    ':focus-within': { '& div[data-action-btn-lbl]': { dy: 'flex' } },
    ':focus-visible': {
      focusShadow: 1,
      '& div[data-action-btn-lbl]': { dy: 'flex' },
    },
    ':hover': {
      bd: '#f8f8f8',
      '& div[data-action-btn-lbl]': { dy: 'flex' },
    },
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
  navActionBtn: {
    b: 'none',
    pn: 'absolute',
    rt: 10,
    jc: 'center',
    ai: 'center',
    dy: 'none',
    pl: 15,
  },
  overrideIndicator: {
    w: '5px',
    h: '5px',
    brs: '50%',
    bc: '#ffd64f',
    ml: '3px',
    px: 2,
  },
  active: {
    bd: 'hsl(0deg 13% 97%)',
  },
}
