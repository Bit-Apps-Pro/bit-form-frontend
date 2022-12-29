import { useFela } from 'react-fela'
import Downmenu from './Utilities/Downmenu'
import FeedBack from './Utilities/FeedBack'

export default function FeedbackBtn() {
  const { css } = useFela()

  return (
    <Downmenu>
      <button type="button" className={css(style.feedbackBtn)}>
        Feedback
      </button>
      <div className={css(style.downmenu)}>
        <div className={css(style.title)}>Send feedback</div>
        <FeedBack />
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
  feedbackBtn: {
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
    w: 250,
    px: 5,
    py: 8,
  },
  downmenuinput: {
    w: '100% !important',
    fs: 12,
  },
}
