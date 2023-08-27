export default function moveStepToFirstErrFld(props, fldKeys = []) {
  const layouts = props?.layout || []
  if (Array.isArray(layouts) && layouts.length > 1) {
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
