import RenderStyle from '../style-new/RenderStyle'

function Divider({ fieldKey, styleClasses }) {
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div className={`${fieldKey}-wrp drag`}>
        <div className={`${fieldKey}-divider`} />
      </div>
    </>
  )
}
export default Divider
