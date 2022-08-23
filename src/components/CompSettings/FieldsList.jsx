import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import FieldLinkBtn from './FieldLinkButton'

export default function FieldsList() {
  const fields = useRecoilValue($fields)

  const hiddenFlds = Object.entries(fields).filter(([, fld]) => fld.hidden)
  const notHiddenFlds = Object.entries(fields).filter(([, fld]) => !fld.hidden)

  return (
    <>
      <FieldsList.Group title={`Hidden Fields (${hiddenFlds.length})`} filteredFields={hiddenFlds} />
      <FieldsList.Group title={`Fields (${notHiddenFlds.length})`} filteredFields={notHiddenFlds} />
    </>
  )
}

const Group = ({ title, filteredFields }) => {
  const { css } = useFela()
  if (!filteredFields.length) return <> </>
  return (
    <div>
      <div className={css(s.title)}>{title}</div>
      {filteredFields.map(([fldKey, fldData]) => {
        let { lbl } = fldData
        const { typ, adminLbl } = fldData
        if (typ === 'decision-box') {
          lbl = adminLbl
        }
        return (
          <FieldLinkBtn
            key={fldKey}
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
    mx: 8,
    pn: 'sticky',
    pt: 14,
    tp: 0,
    bd: 'var(--white)',
    h: 40,
  },
}
