import { useFela } from 'react-fela'
import WarningIcn from '../../Icons/WarningIcn'
import ut from '../../styles/2.utilities'
import Btn from './Btn'

export default function FeedBack({ className }) {
  const { css } = useFela()

  return (
    <div className={className}>
      <div className={css(feedbackStyle.flx)}>
        <label htmlFor="issue" className={css(feedbackStyle.lbl)}>
          <input id="issue" type="radio" name="issue" checked />
          <WarningIcn size="15" />
          <span className={css(feedbackStyle.title)}>Issue</span>
        </label>

        <label htmlFor="idea" className={css(feedbackStyle.lbl)}>
          <input id="idea" type="radio" name="idea" />
          <WarningIcn size="15" />
          <span className={css(feedbackStyle.title)}>Idea</span>
        </label>

        <label htmlFor="other" className={css(feedbackStyle.lbl)}>
          <input id="other" type="radio" name="other" />
          <WarningIcn size="15" />
          <span className={css(feedbackStyle.title)}>Other</span>
        </label>
      </div>
      <div className={css(feedbackStyle.bodyContain)}>
        <textarea className={css(feedbackStyle.body)} rows="5" />
      </div>
      <Btn size="sm" width="100%" className={css(ut.mt1)}>Send</Btn>
    </div>
  )
}

const feedbackStyle = {
  flx: {
    flx: 'center-between',
  },
  lbl: {
    curp: 1,
    flx: 'align-center',
    brs: 5,
    bd: '#EFF2F7',
    p: '5px 10px',
    tn: 'background 0.2s',
    '>input[type="radio"]': {
      dy: 'none',
    },
    '&:hover': {
      bd: 'var(--b-79-96)',
      cr: 'var(--blue)',
    },
    'input:checked + *': {
      bd: 'var(--b-79-96)',
      cr: 'var(--blue)',
    },
  },
  title: {
    ml: 5,
  },
  bodyContain: {
    mt: 10,
  },
  body: {
    w: '100%',
    oe: 'none',
    b: '1px solid var(--white-0-75) !important',
    brs: '9px !important',
    tn: 'all 0.2s',
    ':focus': {
      focusShadow: '',
    },
  },

}
//   .img - btn img{
//     width:100px;
// height: 50px;
// }
// .img - btn > input{
//   display: none
// }
// .img - btn > img{
//   cursor: pointer;
//   border: 5px solid transparent;
// }
// .img - btn > input: checked + img{
//   border - color: black;
//   border - radius: 10px;
// }
