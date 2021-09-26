import { useFela } from 'react-fela'
import { hideAll } from 'tippy.js'
import CloseIcn from '../../Icons/CloseIcn'
import ut from '../../styles/2.utilities'
import DownMenu from '../Utilities/Downmenu'

export default function SimpleColorPicker() {
  const { css } = useFela()
  return (
    <div>
      <DownMenu place="left">
        <div className={css(c.preview_wrp)}>
          <button type="button" className={css(c.pickrBtn)}>
            <div className={css(c.preview)} />
            <span className={css(c.clrVal)}>#ssdasdasdasdf98s</span>
          </button>
          <button className={css(c.clearBtn)} type="button" aria-label="Clear Color">
            <CloseIcn size="12" />
          </button>
        </div>
        <div className={css([ut.flxcb, c.container])}>
          <span>Color Picker</span>
          <button onClick={hideAll} type="button" aria-label="Close Color picker"><CloseIcn size="20" /></button>
        </div>
      </DownMenu>
    </div>
  )
}
const c = {
  container: { w: 300 },
  preview_wrp: {
    bd: 'var(--white-0-95)',
    w: 150,
    brs: 10,
    p: 3,
    flx: 'center-between',
  },
  preview: {
    w: 25,
    h: 25,
    b: '1px solid gray',
    brs: 7,
    curp: 1,
    mr: 7,
  },
  clearBtn: {
    brs: '50%',
    w: 20,
    h: 20,
    b: 'none',
    flx: 'center',
    bd: 'transparent',
    cr: 'var(--white-0-50)',
    curp: 1,
    ':hover': { cr: 'var(--black-0)' },
  },
  pickrBtn: {
    b: 'none',
    curp: 1,
    flx: 'center',
    bd: 'transparent',
    p: 0,
  },
  clrVal: {
    w: 80,
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
}
