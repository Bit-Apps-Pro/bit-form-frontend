/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

export default function HtmlField({ attr, onBlurHandler, resetFieldValue, formID }) {
  return (
    <div
      className={`fld-wrp fld-wrp-${formID} drag ${attr.valid.hide ? 'btcd-hidden' : ''}`}
      btcd-fld="decisionbox"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: attr.content || attr?.info?.content }}
    />
  )
}
