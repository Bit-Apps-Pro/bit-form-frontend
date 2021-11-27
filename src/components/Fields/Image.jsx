import RenderStyle from '../style-new/RenderStyle'

function Image({ fieldKey, attr, styleClasses }) {
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div className="drag">
        <div className={`${fieldKey}-wrp`}>
          <img className={`${fieldKey}-img`} src={attr?.bg_img || 'https://www.newhopelanding.com/app/uploads/2019/11/1024.png'} height="100%" width="100%" alt="bg" />
        </div>
      </div>
    </>
  )
}

export default Image
