import RenderStyle from '../style-new/RenderStyle'

function TitleField({ fieldKey, attr, styleClasses }) {
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div className="drag">
        <div className={`${fieldKey}-wrp`}>
          <img src={attr?.title_img} alt="img" width="40" height="40" />
          <div className={`${fieldKey}-txt-wrp`}>
            <h1 className={`${fieldKey}-title`}>{attr.title}</h1>
            <span>{attr?.subTitle}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default TitleField
