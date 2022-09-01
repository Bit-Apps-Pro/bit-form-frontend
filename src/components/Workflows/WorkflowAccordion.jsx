import { useState } from 'react'
import { useFela } from 'react-fela'
import ChevronDownIcn from '../../Icons/ChevronDownIcn'

export default function WorkflowAccordion({ title, titleOutline, accordionActions, children }) {
  const { css } = useFela()
  const [showAccordion, setShowAccordion] = useState(true)

  const toggleAccordion = () => {
    setShowAccordion(prv => !prv)
  }

  return (
    <div className={css(accordionStyle.section)}>
      <div className={`${css(accordionStyle.titleWrp)}`}>
        <button
          type="button"
          className={`${css(accordionStyle.title, titleOutline ? accordionStyle.titleOutline : {})} btcd-logic-blk`}
          onClick={toggleAccordion}
        >
          {title}
          <span className={css(accordionStyle.titleIcn)}>
            <ChevronDownIcn
              size={15}
              rotate={!showAccordion}
            />
          </span>
        </button>
        <div className={`${css(accordionStyle.accrActions)} accr-actions`}>
          {accordionActions}
        </div>
      </div>

      {showAccordion && (
        <div className={css(accordionStyle.content)}>
          {children}
        </div>
      )}
      {!showAccordion && (
        <div className={css(accordionStyle.content)}>
          <button className={css(accordionStyle.collapsedAccrdn)} type="button" onClick={toggleAccordion}>
            <span className={css(accordionStyle.collapsedCrl)} />
            <span className={css(accordionStyle.collapsedCrl)} />
            <span className={css(accordionStyle.collapsedCrl)} />
          </button>
        </div>
      )}
    </div>
  )
}

const accordionStyle = {
  section: { pb: 12 },
  accrActions: { dy: 'none' },
  titleWrp: {
    flx: 1,
    ':hover .accr-actions': { flx: 1 },
  },
  title: {
    bc: 'var(--b-50)',
    h: 35,
    fs: 14,
    p: '0 15px',
    brs: 30,
    cr: '#fff',
    fw: 600,
    lh: '29px',
    cur: 'pointer',
    us: 'none',
    b: 0,
    oe: 0,
    flx: 'center',
  },

  titleOutline: {
    b: '2px solid var(--b-50)',
    bc: '#fff',
    cr: 'var(--b-50)',
    p: '0 13px',
  },

  titleIcn: { ml: 8, flx: 'center' },

  content: {
    my: 5,
    ml: 45,
  },

  collapsedAccrdn: {
    b: 0,
    oe: 0,
    bc: '#D9D9D9',
    w: 65,
    brs: 10,
    h: 20,
    flx: 'center',
    rg: 5,
    cg: 5,
    curp: 1,
    mt: 15,

    ':focus': { oe: 'none' },
  },

  collapsedCrl: {
    dy: 'inline-block',
    w: 5,
    h: 5,
    bc: '#AAAAAA',
    brs: '50%',
  },
}
