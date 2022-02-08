import RenderStyle from '../style-new/RenderStyle'

function Divider({ fieldKey, styleClasses, formID, attr }) {
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div className={`${fieldKey}-fld-wrp drag`}>
        <div className={`${fieldKey}-divider`} />
      </div>
    </>
  )
}
export default Divider
