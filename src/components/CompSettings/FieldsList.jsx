import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import FieldLinkBtn from './FieldLinkButton'

export default function FieldsList() {
  const fields = useRecoilValue($fields)

  const hiddenFlds = Object.entries(fields).filter(([, fld]) => fld.hidden)
  const notHiddenFlds = Object.entries(fields).filter(([, fld]) => !fld.hidden)

  return (
    <>
      <FieldsList.Group title="Hidden Fields" filteredFields={hiddenFlds} />
      <FieldsList.Group title="All Fields List" filteredFields={notHiddenFlds} />
    </>
  )
}

const Group = ({ title, filteredFields }) => {
  const { css } = useFela()
  if (!filteredFields.length) return <> </>
  return (
    <div className={css(ut.mt5)}>
      <span className={css(s.title)}>{title}</span>
      {filteredFields.map(([fldKey, fldData]) => {
        let { lbl } = fldData
        const { typ, adminLbl } = fldData
        if (typ === 'decision-box') {
          lbl = adminLbl
        }
        return (
          <FieldLinkBtn
            fieldKey={fldKey}
            icn={typ}
            title={lbl || adminLbl || typ}
            subTitle={fldKey}
          />
        )
      })}
    </div>
  )
}
FieldsList.Group = Group

const s = {
  title: {
    fw: 500,
    fs: 16,
    mx: 10,
  },
}
