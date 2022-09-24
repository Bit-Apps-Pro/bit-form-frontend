export default function GridLayoutLoader() {
  return (
    <div style={s.wrp}>
      <div style={s.fldWrp}>
        <div style={{ ...s.fld, ...{ width: '60%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '40%' } }} className="loader" />
      </div>
      <div style={s.fldWrp}>
        <div style={{ ...s.fld, ...{ width: '40%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '60%' } }} className="loader" />
      </div>
      <div style={s.fldWrp}>
        <div style={{ ...s.fld, ...{ width: '30%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '40%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '30%' } }} className="loader" />
      </div>
      <div style={s.fldWrp}>
        <div style={{ ...s.fld, ...{ width: '50%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '50%' } }} className="loader" />
      </div>
      <div style={s.fldWrp}>
        <div style={{ ...s.fld, ...{ width: '70%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '30%' } }} className="loader" />
      </div>
      <div style={s.fldWrp}>
        <div style={{ ...s.fld, ...{ width: '20%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '30%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '50%' } }} className="loader" />
      </div>
      <div style={s.fldWrp}>
        <div style={{ ...s.fld, ...{ width: '30%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '30%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '30%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '10%' } }} className="loader" />
      </div>
      <div style={s.fldWrp}>
        <div style={{ ...s.fld, ...{ width: '40%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '60%' } }} className="loader" />
      </div>
      <div style={s.fldWrp}>
        <div style={{ ...s.fld, ...{ width: '20%' } }} className="loader" />
        <div style={{ ...s.fld, ...{ width: '80%' } }} className="loader" />
      </div>
    </div>
  )
}
const s = {
  wrp: { paddingBlock: 20 },
  fldWrp: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  fld: {
    height: 70,
    borderRadius: 5,
    margin: 5,
  },
}
