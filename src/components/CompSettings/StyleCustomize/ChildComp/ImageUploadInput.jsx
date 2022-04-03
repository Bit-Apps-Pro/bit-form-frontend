import { useFela } from 'react-fela'
import CloseIcn from '../../../../Icons/CloseIcn'
import ut from '../../../../styles/2.utilities'
import imageUploadInputStyle from '../../../../styles/imageUploadInput.style'

export default function ImageUploadInput({ title, imageSrc, value, clickAction, setValue, clearAction }) {
  const { css } = useFela()

  const placeholderImgUrl = 'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='

  const resetValue = () => {
    setValue('')
  }

  // <div className={css(ut.flxcb)}>
  //             {fieldData?.subTlePreIcn && (
  //               <img src={fieldData?.subTlePreIcn} alt="Prefix Icon" width="18" height="18" />
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
          <img src={imageSrc || placeholderImgUrl} alt="" className={css(imageUploadInputStyle.image)} />
        </span>
        <input aria-label="Background image upload" className={css(imageUploadInputStyle.input)} value={value} type="text" readOnly placeholder="ex: Image.png" />
        {imageSrc && (
          <button type="button" className={css(imageUploadInputStyle.button)} onClick={clearAction}>
            <CloseIcn size={10} />
          </button>
        )}
      </div>
    </div>
  )
}
