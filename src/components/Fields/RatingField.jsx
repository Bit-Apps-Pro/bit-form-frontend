/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { $fields } from '../../GlobalStates/GlobalStates'
import { reCalculateFldHeights } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { getCustomAttributes, getCustomClsName } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

export default function RatingField({ attr, onBlurHandler, resetFieldValue, formID, fieldKey, styleClasses }) {
  const fields = useAtomValue($fields)
  const [checkBoxes, setCheckBoxes] = useState({ checked: [] })
  const fieldData = deepCopy(fields[fieldKey])

  const onChangeHandler = (e, optKey) => {
    const { checked } = e.target
    if (checked) {
      checkBoxes.checked.push(optKey)
    } else {
      const getIndx = checkBoxes.checked.indexOf(optKey)
      checkBoxes.checked.splice(getIndx, 1)
      setCheckBoxes({ checked: checkBoxes.checked })
    }
    reCalculateFldHeights(fieldKey)
  }

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        // fieldKey={attr.name}
        fieldKey={fieldKey}
        fieldData={attr}
      >

        <div
          data-testid={`${fieldKey}-inp-fld-wrp`}
          // data-dev-inp-fld-wrp={fieldKey}
          className={`${fieldKey}-inp-fld-wrp ${getCustomClsName(fieldKey, 'inp-fld-wrp')}`}
          {...getCustomAttributes(fieldKey, 'inp-fld-wrp')}
        >
          <div
            data-testid={`${fieldKey}-rating-wrp`}
            data-dev-rating-wrp={fieldKey}
            className={`${fieldKey}-rating-wrp ${getCustomClsName(fieldKey, 'rating-wrp')}`}
            {...getCustomAttributes(fieldKey, 'rating-wrp')}
          >
            {attr.opt.reverse().map((itm, i) => (
              <>
                <input
                  type="radio"
                  className={`${fieldKey}-rating-input`}
                  name="rating"
                  value={itm.val}
                  aria-label={`rating-input-${i}`}
                  id={`${fieldKey}-rating-${i}`}
                />
                <label
                  className={`${fieldKey}-rating-lbl`}
                  htmlFor={`${fieldKey}-rating-${i}`}
                >
                  <img
                    className={`${fieldKey}-rating-img`}
                    src={itm.icn}
                    alt={itm?.lbl}
                    aria-label={itm?.lbl}
                  />
                </label>
              </>
            ))}
          </div>
        </div>
      </InputWrapper>
    </>
  )
}
