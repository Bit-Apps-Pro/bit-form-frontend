import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import CoolCopy from './Utilities/CoolCopy'
import Downmenu from './Utilities/Downmenu'

export default function PublishBtn() {
  const { css } = useFela()
  const { formID } = useParams()

  return (
    <Downmenu>
      <button type="button" className={css(style.shareIcn)}>
        Publish
      </button>
      <div className={css(style.downmenu)}>
        <div className={css(style.title)}>Short Code</div>
        <CoolCopy cls={css(style.downmenuinput)} value={`[bitform id='${formID}']`} />
      </div>
    </Downmenu>
  )
}

const style = {
  title: {
    fs: 14,
    mb: 5,
    fw: 600,
  },
  shareIcn: {
    bd: 'none',
    px: 15,
    py: 7,
    oe: 'none',
    b: 'none',
    cr: 'var(--white-100)',
    flx: 'align-center',
    fs: 12,
    fw: 400,
    tn: 'background 0.2s',
    mx: 10,
    my: 5,
    brs: 8,
    curp: 1,
    ':hover': { bd: 'var(--b-35-33)' },
  },
  downmenu: {
    w: 200,
    px: 5,
    py: 8,
  },
  downmenuinput: {
    w: '100% !important',
    fs: 12,
  },
}
