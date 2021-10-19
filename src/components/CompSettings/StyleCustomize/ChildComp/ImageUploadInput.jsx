import { useFela } from 'react-fela'
import CloseIcn from '../../../../Icons/CloseIcn'
import ut from '../../../../styles/2.utilities'
import imageUploadInputStyle from '../../../../styles/imageUploadInput.style'

export default function ImageUploadInput({ title, value, setValue }) {
  const { css } = useFela()

  const resetValue = () => {
    setValue('')
  }

  return (
    <div className={css(ut.flxcb)}>
      <span className={css(imageUploadInputStyle.title)}>{title}</span>
      <div className={css(imageUploadInputStyle.inputcontainer)}>
        <span
          className={css(imageUploadInputStyle.imagebox)}
        >
          <img src="" alt="" className={css(imageUploadInputStyle.image)} />
        </span>
        <input className={css(imageUploadInputStyle.input)} value={value} type="text" />
        <button type="button" className={css(imageUploadInputStyle.button)} onClick={resetValue}>
          <CloseIcn size={10} />
        </button>
      </div>
    </div>
  )
}
