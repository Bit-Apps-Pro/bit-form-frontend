import { useState } from 'react'
import { useFela } from 'react-fela'
import WarningIcn from '../../Icons/WarningIcn'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import Btn from './Btn'

export default function FeedBack({ className }) {
  const { css } = useFela()

  const [feedback, setFeedback] = useState({
    option: 'issue',
    body: '',
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFeedback({
      ...feedback,
      [name]: value,
    })
  }

  const sendFeedback = () => {
    console.log(feedback)
    // fetch('https://webhook.site/4c1b6854-a522-463d-af1d-5f4b7e10d26e', {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(feedback),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data)
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error)
    //   })
  }

  const msg = {
    issue: "I'm having an issue with...",
    idea: "I'd like to suggest...",
    other: "Anything else you'd like to share?",
  }

  return (
    <div className={className}>
      <div className={css(feedbackStyle.flx)}>
        <label
          htmlFor="issue"
          className={css(feedbackStyle.lbl, feedback.option === 'issue' && feedbackStyle.active)}
        >
          <input
            id="issue"
            type="radio"
            name="option"
            onChange={onChangeHandler}
            value="issue"
          />
          <WarningIcn size="15" />
          <span className={css(feedbackStyle.title)}>{__('Issue')}</span>
        </label>

        <label
          htmlFor="idea"
          className={css(feedbackStyle.lbl, feedback.option === 'idea' && feedbackStyle.active)}
        >
          <input
            id="idea"
            type="radio"
            name="option"
            value="idea"
            onChange={onChangeHandler}
          />
          <WarningIcn size="15" />
          <span className={css(feedbackStyle.title)}>{__('Idea')}</span>
        </label>

        <label
          htmlFor="other"
          className={css(feedbackStyle.lbl, feedback.option === 'other' && feedbackStyle.active)}
        >
          <input
            id="other"
            type="radio"
            name="option"
            value="other"
            onChange={onChangeHandler}
          />
          <WarningIcn size="15" />
          <span className={css(feedbackStyle.title)}>{__('Other')}</span>
        </label>
      </div>
      <div className={css(feedbackStyle.bodyContain)}>
        <textarea
          placeholder={msg[feedback.option]}
          name="body"
          onChange={onChangeHandler}
          className={css(feedbackStyle.body)}
          rows="5"
        />
      </div>
      <Btn
        onClick={sendFeedback}
        size="sm"
        width="100%"
        className={css(ut.mt1)}
      >
        {__('Send')}
      </Btn>
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
    // b: '1px solid var(--blue)',
    '>input[type="radio"]': {
      dy: 'none',
    },
    '&:hover': {
      bd: 'var(--b-79-96)',
      cr: 'var(--blue)',
    },
  },
  active: {
    bd: 'var(--b-79-96)',
    cr: 'var(--blue)',
    focusShadow: '',
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
