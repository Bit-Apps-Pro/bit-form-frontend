import { useFela } from 'react-fela'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $fields, $selectedFieldId } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import FieldLinkBtn from './FieldLinkButton'

export default function FieldsList() {
  const fields = useRecoilValue($fields)
  const selectedFieldId = useRecoilValue($selectedFieldId)
  const history = useHistory()
  const { formType, formID } = useParams()

  if (selectedFieldId) {
    history.push(`/form/builder/${formType}/${formID}/field-settings/${selectedFieldId}`)
    return <></>
  }

  const hiddenFlds = Object.entries(fields).filter(([, fld]) => fld.hidden)
  const notHiddenFlds = Object.entries(fields).filter(([, fld]) => !fld.hidden)

  return (
    <>
      <FieldListSection title="Hidden Fields" filteredFields={hiddenFlds} />
      <FieldListSection title="All Fields List" filteredFields={notHiddenFlds} />
    </>
  )
}

const FieldListSection = ({ title, filteredFields }) => {
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const { css } = useFela()
  if (!filteredFields.length) return <></>
  return (
    <div className={css(ut.mt5)}>
      <span className={css(s.title)}>{title}</span>
      {filteredFields.map(([fldKey, fldData]) => {
        let { lbl } = fldData
        const { typ, adminLbl } = fldData
        if (typ === 'decision-box') {
          lbl = adminLbl
        }
        return <FieldLinkBtn key={fldKey} icn={typ} title={lbl || adminLbl || typ} sub={fldKey} action={() => setSelectedFieldId(fldKey)} />
      })}
    </div>
  )
}

const s = {
  title: {
    fw: 500,
    fs: 16,
    mx: 10,
  },
}
