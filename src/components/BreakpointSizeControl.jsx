import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $builderHelperStates } from '../GlobalStates'
import LaptopIcn from '../Icons/LaptopIcn'
import MobileIcon from '../Icons/MobileIcon'
import TabletIcon from '../Icons/TabletIcon'
import ut from '../styles/2.utilities'
import Cooltip from './Utilities/Cooltip'
import SingleToggle from './Utilities/SingleToggle'

export default function BreakpointSizeControl() {
  const { css } = useFela()
  const [builderHelperStates, setBuilderHelperStates] = useRecoilState($builderHelperStates)

  const toggleRespectOrder = () => setBuilderHelperStates(prv => ({ ...prv, respectLGLayoutOrder: !prv.respectLGLayoutOrder }))

  return (
    <div className={css(s.wraper)}>
      <h4 className={css(s.title)}>Breakpoint Sizes</h4>
      <div className={css(s.divider)} />
      <div className={css(ut.flxc, s.inputWrp)}>
        <span className={css(s.icon_wrp)}><LaptopIcn size="27" /></span>
        <input title="Large device breakpoint size" aria-label="Large device breakpoint size" value="1024" className={css(s.input)} type="number" />
        <span>px</span>
      </div>
      <div className={css(ut.flxc, s.inputWrp)}>
        <span className={css(s.icon_wrp)}><TabletIcon size="24" /></span>
        <input title="Medium device breakpoint size" aria-label="Medium device breakpoint size" value="1024" className={css(s.input)} type="number" />
        <span>px</span>
      </div>
      <div className={css(ut.flxc, s.inputWrp)}>
        <span className={css(s.icon_wrp)}><MobileIcon size="25" /></span>
        <input title="Mobile device breakpoint size" aria-label="Mobile device breakpoint size" value="1024" className={css(s.input)} type="number" />
        <span>px</span>
      </div>
      <div className={css(s.divider)} />
      <div className={css(ut.flxcb, ut.mt2, ut.mb1)}>
        <div className={css(ut.flxi, ut.w6)}>
          <span className={css(ut.fw500, ut.fs12)}>Respect Large Device Order</span>
          <Cooltip icnSize="15"><span className={css([ut.tipBody, ut.mr2])}>When this option is enabled tablet and mobile devices layout will auto genarate according to desktop device field order.</span></Cooltip>
        </div>
        <SingleToggle isChecked={builderHelperStates.respectLGLayoutOrder} action={toggleRespectOrder} />
      </div>
    </div>
  )
}

const s = {
  wraper: { w: 180 },
  title: {
    my: 5,
    fw: 600,
    fs: 14,
  },
  divider: {
    mt: 8,
    mb: 3,
    bb: '1px solid var(--white-0-78)',
  },
  input: {
    w: 70,
    b: '1px solid transparent !important',
    brs: '8px !important',
    fw: 500,
    ':hover:not(:focus)': { b: '1px solid gray !important' },
    ':focus': { b: '1px solid var(--b-50) !important' },
  },
  inputWrp: {
    mx: 5,
    my: 4,
  },
  icon_wrp: {
    w: 30,
    flx: 'center',
  },
}
