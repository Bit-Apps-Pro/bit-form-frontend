/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

import BitRatingField from 'bit-rating-field/src/bit-rating-field'
import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { $fields, $flags } from '../../GlobalStates/GlobalStates'
import { getCustomAttributes, getCustomClsName, selectInGrid } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

export default function RatingField({ attr, formID, fieldKey, styleClasses }) {
  const { '*': rightBarUrl } = useParams()
  const flags = useAtomValue($flags)
  const { styleMode } = flags
  const [rightBar, element] = rightBarUrl.split('/')
  const showRatingMsg = styleMode && rightBar === 'field-theme-customize' && element === 'rating-msg'
  const fields = useAtomValue($fields)
  const fieldData = fields[fieldKey]

  const ratingWrapElmRef = useRef(null)
  const ratingFieldRef = useRef(null)

  useEffect(() => {
    if (!ratingWrapElmRef?.current) {
      ratingWrapElmRef.current = selectInGrid(`.${fieldKey}-inp-fld-wrp`)
    }
    const fldConstructor = ratingFieldRef.current
    const fldElm = ratingWrapElmRef.current
    if (fldConstructor && fldElm && 'destroy' in fldConstructor) {
      fldConstructor.destroy()
    }
    const config = {
      options: attr.opt,
      showReviewLblOnHover: attr.showReviewLblOnHover,
      showReviewLblOnSelect: attr.showReviewLblOnSelect,
      selectedRating: attr.selectedRating,
      fieldKey,
      document: document.getElementById('bit-grid-layout')?.contentDocument,
    }
    ratingFieldRef.current = new BitRatingField(fldElm, config)
  }, [fieldData])

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <div
          data-testid={`${fieldKey}-inp-fld-wrp`}
          data-dev-inp-fld-wrp={fieldKey}
          className={`${fieldKey}-inp-fld-wrp ${getCustomClsName(fieldKey, 'inp-fld-wrp')}`}
          {...getCustomAttributes(fieldKey, 'inp-fld-wrp')}
          ref={ratingWrapElmRef}
        >
          <div
            data-testid={`${fieldKey}-rating-wrp`}
            data-dev-rating-wrp={fieldKey}
            className={`${fieldKey}-rating-wrp ${getCustomClsName(fieldKey, 'rating-wrp')}`}
            {...getCustomAttributes(fieldKey, 'rating-wrp')}
          >
            {
              attr.opt.map((itm, i) => (
                <label
                  key={itm.val}
                  className={`${fieldKey}-rating-lbl ${getCustomClsName(fieldKey, 'rating-lbl')}`}
                  data-testid={`${fieldKey}-rating-lbl`}
                  data-dev-rating-lbl={fieldKey}
                  htmlFor={`${fieldKey}-rating-${i}`}
                  {...getCustomAttributes(fieldKey, 'rating-lbl')}
                  data-indx={i}
                >
                  <input
                    type="radio"
                    className={`${fieldKey}-rating-input`}
                    name="rating"
                    value={itm.val}
                    aria-label={`rating-input-${i}`}
                    id={`${fieldKey}-rating-${i}`}
                    {...itm.check && { checked: true }}
                  />
                  <img
                    className={`${fieldKey}-rating-img  ${getCustomClsName(fieldKey, 'rating-img')}`}
                    src={itm.img}
                    alt={itm?.lbl}
                    aria-label={itm?.lbl}
                    {...getCustomAttributes(fieldKey, 'rating-img')}
                    data-testid={`${fieldKey}-rating-input`}
                    data-dev-rating-img={fieldKey}
                  />
                </label>
              ))
            }
          </div>

          <span
            className={`${fieldKey}-rating-msg ${getCustomClsName(fieldKey, 'rating-msg')}`}
            data-testid={`${fieldKey}-rating-msg`}
            data-dev-rating-msg={fieldKey}
            {...getCustomAttributes(fieldKey, 'rating-msg')}
          >
            {showRatingMsg && (fieldData.showReviewLblOnSelect || fieldData.showReviewLblOnHover) && 'Rating Message'}
          </span>
        </div>
      </InputWrapper>
    </>
  )
}
