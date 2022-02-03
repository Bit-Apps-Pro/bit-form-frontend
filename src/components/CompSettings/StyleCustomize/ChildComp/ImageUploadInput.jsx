import { useFela } from 'react-fela'
import CloseIcn from '../../../../Icons/CloseIcn'
import ut from '../../../../styles/2.utilities'
import imageUploadInputStyle from '../../../../styles/imageUploadInput.style'

export default function ImageUploadInput({ title, imageSrc, value, clickAction, setValue, clearAction }) {
  const { css } = useFela()

  const resetValue = () => {
    setValue('')
  }

  // <div className={css(ut.flxcb)}>
  //             {fieldData?.subTlePreIcn && (
  //               <img src={fieldData?.subTlePreIcn} alt="start icon" width="18" height="18" />
  //             )}

  //             <button type="button" onClick={() => setIconModel('subTlePreIcn')} className={css(ut.icnBtn)}>
  //               <EditIcn size={22} />
  //             </button>
  //             {fieldData.subTlePreIcn && (
  //               <button onClick={() => removeIcon('subTlePreIcn')} className={css(ut.icnBtn)} type="button">
  //                 <CloseIcn size="13" />
  //               </button>
  //             )}

  //           </div>

  return (
    <div className={css(ut.flxcb)}>
      <span className={css(imageUploadInputStyle.title)}>{title}</span>
      <div className={css(imageUploadInputStyle.inputcontainer)} role="button" tabIndex={0} onClick={clickAction} onKeyUp={clickAction}>
        <span
          className={css(imageUploadInputStyle.imagebox)}
        >
          <img src={imageSrc} alt="" className={css(imageUploadInputStyle.image)} />
        </span>
        <input className={css(imageUploadInputStyle.input)} value={value} type="text" readOnly placeholder="ex: Image.png" />
        <button type="button" className={css(imageUploadInputStyle.button)} onClick={clearAction}>
          <CloseIcn size={10} />
        </button>
      </div>
    </div>
  )
}
