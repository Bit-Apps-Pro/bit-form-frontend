import LaptopIcn from '../../../../Icons/LaptopIcn'
import MobileIcon from '../../../../Icons/MobileIcon'
import TabletIcon from '../../../../Icons/TabletIcon'
import { __ } from '../../../../Utils/i18nwrap'

export default function ResponsiveBtns({ brkPoint, setResponsiveView }) {
  return (
    <div className="resp-btn pos-rel flx">

      {[
        { lbl: 'sm', icn: <MobileIcon size="15" />, tip: __('Phone View', 'bitform') },
        { lbl: 'md', icn: <TabletIcon size="15" />, tip: __('Tablet View', 'bitform') },
        { lbl: 'lg', icn: <LaptopIcn size="17" />, tip: __('Laptop View', 'bitform') }]
        .map(itm => (
          <button
            key={`${itm.lbl}+${Math.random()}`}
            title={itm.tip}
            onClick={() => setResponsiveView(itm.lbl)}
            className={`br-50 flx mr-1 ${itm.lbl === brkPoint && 'blue'}`}
            type="button"
            aria-label="reponcive view"
          >
            {itm.icn}
          </button>
        ))}
    </div>
  )
}
