export default function moveStepToFirstErrFld(props, fldKeys = []) {
  const layouts = props?.layout || []
  const nestedLayouts = props?.nestedLayout || {}
  if (Array.isArray(layouts) && layouts.length > 1) {
    Object.entries(nestedLayouts).forEach(([key, lay]) => {
      const flds = lay.lg.map(l => l.i)
      if (flds.find(fld => fldKeys.includes(fld))) {
        fldKeys.push(key)
      }
    })
    const fldMinStep = layouts.findIndex((lay) => {
      const { layout } = lay
      const flds = layout.lg.map(l => l.i)
      return flds.find(fld => fldKeys.includes(fld))
    })
    if (fldMinStep > -1) {
      props.inits.multi_step_form.step = fldMinStep + 1
    }
  }
}
