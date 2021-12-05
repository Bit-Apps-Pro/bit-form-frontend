import RenderStyle from '../style-new/RenderStyle'

function Image({ fieldKey, attr, styleClasses }) {
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div className="drag">
        <div className={`${fieldKey}-wrp`}>
          <img className={`${fieldKey}-img`} src={attr?.bg_img || 'https://via.placeholder.com/150x75'} width="100%" height="100%" alt="bg" />
        </div>
      </div>
    </>
  )
}

export default Image
