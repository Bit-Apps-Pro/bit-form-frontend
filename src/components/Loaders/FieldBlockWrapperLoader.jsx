export default function FieldBlockWrapperLoader({ layout: { h, i } }) {
  return (
    <div className={`${i}-fld-wrp`}>
      <div style={{ width: '100%', height: h, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loader" style={{ width: '99%', height: '95%', borderRadius: 5 }} />
      </div>
    </div>
  )
}
