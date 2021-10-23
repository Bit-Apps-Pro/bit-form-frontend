import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { CSSTransition } from 'react-transition-group'
import CloseIcn from '../../Icons/CloseIcn'
import ChevronLeft from '../../Icons/ChevronLeft'
import ut from '../../styles/2.utilities.js'
export default function SliderModal({ show = true, setModal, children, isInfinite = true }) {
  const { css } = useFela()
  const [step, setStep] = useState(0)
  const handleKeys = ({ type, code }) => {
    if (type === 'keyup') {
      if (code === 'Escape') {
        setModal(prv => ({ ...prv, show: false }))
      }
      if (code === 'ArrowRight') {
        setNewStep('inc')
      }
      if (code === 'ArrowLeft') {
        setNewStep('dec')
      }
    }
  }

  const closeModal = () => {
    setModal(prv => ({ ...prv, show: false }))
  }


  useEffect(() => {
    document.addEventListener('keyup', handleKeys)
    return () => {
      document.removeEventListener('keyup', handleKeys), true
    }
  }, [])

  const setNewStep = (type) => {
    switch (type) {
      case 'inc':
        setStep(prv => {
          if (prv === children.length - 1) {
            console.log('1', isInfinite ? 0 : prv)
            return isInfinite ? 0 : prv
          } else {
            console.log('2', prv + 1)
            return prv + 1
          }
        })
        break
      case 'dec':
        setStep(prv => {
          if (prv < 1) {
            console.log('3', isInfinite ? children.length - 1 : prv)
            return isInfinite ? children.length - 1 : prv
          } else {
            console.log('4', prv, prv - 1)
            return prv - 1
          }
        })
        break
    }
  }

  const handleStep = (type) => {
    setNewStep(type)
  }

  return (
    <CSSTransition
      in={show}
      timeout={400}
      classNames="btc-slider-modal"
      unmountOnExit
    >
      <div className={css()}>
        <div tabIndex="0" />
        <div
          aria-labelledby="title"
          aria-describedby="description"
          role="dialog"
          aria-modal="true"
          data-modal
          className={css(s.modal)}
        >
          <div className={css(s.leftArrwWrp)}>
            <button
              onClick={() => handleStep('dec')}
              className={css(s.arrwBtn)}
              type="button"
              aria-label="Previous"
              title="Previous"
            >
              <ChevronLeft size="30" />
            </button>
          </div>
          <div className={css(s.rightArrwWrp)}>
            <button
              onClick={() => handleStep('inc')}
              className={css(s.arrwBtn, s.rightArw)}
              type="button"
              aria-label="Next"
              title="Next"
            >
              <ChevronLeft size="30" />
            </button>
          </div>
          {step}
          <div className={css(ut.flxcb, ut.px10)}>
            <h2 id="title" className={css(s.title)}>Title</h2>
            <div>
              <button onClick={closeModal} className={css(s.closeBtn)} type="button" aria-label="Close Modal" title="Close modal   Esc"><CloseIcn size="12" /></button>
            </div>
          </div>

          <div className={css(s.sliderContentWrp)} id="description">
            {children.map((slideItem, i) => (
              <div className={css(s.sliderContent)} style={{ transform: `translate3d(${step * -100}%,0,0)` }}>{slideItem}</div>
            ))}
          </div>
        </div>
        <div
          role="button"
          onClick={closeModal}
          onKeyPress={closeModal}
          className={css(s.backdrop)}
          aria-label="Close modal"
          data-backdrop
        />

        <div tabIndex="0" />
      </div >
    </CSSTransition >
  )
}

const s = {
  backdrop: {
    pn: 'fixed',
    tp: 0,
    lt: 0,
    w: '100vw',
    h: '100vw',
    zx: 9999,
    flx: 'center',
    tn: 'background .3s'
  },
  modalWrapper: {
    pn: 'relative'
  },
  modal: {
    w: 500,
    h: 200,
    bd: 'var(--white-100)',
    zx: 99999,
    pn: 'fixed',
    tp: '50%',
    lt: '50%',
    tm: 'transform(-50%, -50%)',
    ml: '-250px',
    mt: '-100px',
    brs: 14,
    tm: 'scale(0)',
    oy: 1,
    bs:
      `0px 3px 0.5px rgba(0, 0, 0, 0.034),
    0px 6.1px 2.9px rgba(0, 0, 0, 0.049),
    0px 10.1px 8.8px rgba(0, 0, 0, 0.061),
    0px 16.9px 24.3px rgba(0, 0, 0, 0.076),
    0px 47px 93px rgba(0, 0, 0, 0.11)`,
    tn: 'transform 0.4s cubic-bezier(0, 1.02, 0.2, 1.1) 0s, opacity .3s'
  },
  title: {
    my: 10
  },
  closeBtn: {
    w: 25,
    h: 25,
    b: 'none',
    brs: 500,
    flx: 'center',
    cr: 'var(--white-0-0-64)',
    vd: 'var(--white-0-86)',
    curp: 1,
    ':hover': {
      cr: 'var(--white-0-9)',
    }
  },
  leftArrwWrp: {
    w: 60,
    h: 70,
    flx: 'center',
    pn: 'absolute',
    tp: '50%',
    tm: 'translateY(-50%)',
    lt: '-60px'
  },
  rightArrwWrp: {
    w: 60,
    h: 70,
    flx: 'center',
    pn: 'absolute',
    tp: '50%',
    tm: 'translateY(-50%)',
    rt: '-60px'
  },
  rightArw: {
    tm: 'rotate(180deg)'
  },
  arrwBtn: {
    w: 40,
    h: 40,
    brs: 500,
    b: 'none',
    flx: 'center',
    bd: 'var(--white-0-89)',
    pr: 10,
    curp: 1,
    tn: 'background .3s',
    ':hover': {
      bd: 'var(--white-100)',
      bs: '0 0 10px -3px black'
    }
  },
  sliderContentWrp: {
    pn: 'relative',
    h: 'calc(100% - 42px)',
    flx: 1,
    ow: 'hidden',
    brs: '0 0 14px 14px'
  },
  sliderContent: {
    w: '100%',
    bd: 'red',
    h: '100%',
    mnw: '100%',
    tn: 'transform .4s'
  }
}
