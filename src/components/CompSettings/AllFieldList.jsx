import React from 'react'

export default function AllFieldList() {
  const fields = useRecoilValue($fields)
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)

  const hiddenFlds = Object.entries(fields).filter(fld => fld[1].hidden)
  const notHiddenFlds = Object.entries(fields).filter(fld => !fld[1].hidden)

  const FieldListSection = ({ title, filteredFields }) => {
    if (!filteredFields.length) return ''
    return (
      <div className="mt-5">
        <span>{title}</span>
        {filteredFields.map(([fldKey, fldData]) => {
          let { lbl } = fldData
          const { typ, adminLbl } = fldData
          if (typ === 'decision-box') {
            lbl = adminLbl
          }
          return <FieldOptionBtn key={fldKey} icn={typ} title={lbl || adminLbl || typ} sub={fldKey} action={() => setSelectedFieldId(fldKey)} />
        })}
      </div>
    )
  }
