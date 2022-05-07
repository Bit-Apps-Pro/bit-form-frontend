import { useEffect } from 'react'
import { useFela } from 'react-fela'
import { convertOptionsToText } from './editOptionsHelper'

export default function TextOptionsTab({ options, optionTxt, setOptionTxt, lblKey, valKey }) {
  const { css } = useFela()

  useEffect(() => { setOptionTxt(convertOptionsToText(options, lblKey, valKey)) }, [options])

  const handleOptionText = e => {
    setOptionTxt(e.target.value)
  }

  return (
    <div>
      <textarea data-testid="txt-optns-tab-area" className={css(styles.textarea)} onChange={handleOptionText} value={optionTxt} />
    </div>
  )
}

const styles = {
  textarea: {
    w: '100%',
    p: 5,
    mt: 10,
    h: 200,
  },
}
