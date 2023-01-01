import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $breakpoint, $fields, $layouts } from '../../GlobalStates/GlobalStates'
import { deepCopy } from '../../Utils/Helpers'
import { sortArrOfObjByMultipleProps } from '../style-new/styleHelpers'
import FieldLinkBtn from './FieldLinkButton'

export default function FieldsList() {
  const fields = useRecoilValue($fields)
  const layouts = useRecoilValue($layouts)
  const breakpoint = useRecoilValue($breakpoint)
  const sortedLayouts = deepCopy(layouts[breakpoint]).sort(sortArrOfObjByMultipleProps(['y', 'x']))
  const sortedFields = sortedLayouts.reduce((acc, lay) => ({ ...acc, [lay.i]: fields[lay.i] }), {})

  const hiddenFlds = Object.entries(sortedFields).filter(([, fld]) => fld.valid?.hide)
  const notHiddenFlds = Object.entries(sortedFields).filter(([, fld]) => !fld.valid.hide)

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
