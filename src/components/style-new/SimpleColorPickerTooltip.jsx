import { useFela } from 'react-fela'
import ut from '../../styles/2.utilities'
import Downmenu from '../Utilities/Downmenu'
import ColorPreview from './ColorPreview'
import SimpleColorPickerMenuV2 from './SimpleColorPickerMenuV2'

export default function SimpleColorPickerTooltip({ action, value }) {
  const { css } = useFela()
  return (
    <div className={css(c.preview_wrp)}>

      <Downmenu place="right-start" arrow={false} trigger="click">
        <button
          type="button"
          className={css(c.pickrBtn)}
        >
          <ColorPreview bg={value} h={25} w={25} className={css(ut.mr2)} />
          <span className={css(c.clrVal)}>{value?.replaceAll(/\(|var|\)/gi, '')}</span>
        </button>
        <SimpleColorPickerMenuV2 action={action} value={value} />
      </Downmenu>

      {/* <button className={css(c.clearBtn)} type="button" aria-label="Clear Color">
        <CloseIcn size="12" />
      </button> */}
    </div>
  )
}

const c = {
  preview_wrp: {
    bd: 'var(--white-0-95)',
    w: 130,
    mnw: 130,
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
    fs: 12,
    w: 90,
    ws: 'nowrap',
    textOverflow: 'ellipsis',
    ow: 'hidden',
  },
}
