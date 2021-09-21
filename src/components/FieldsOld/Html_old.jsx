/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */

import OldInputWrapper from '../OldInputWrapper'

export default function HtmlField_old({ attr, formID }) {
  return (
    <OldInputWrapper
      formID={formID}
      fieldData={attr}
      noLabel
    >
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: attr.content || attr?.info?.content }}
      />
    </OldInputWrapper>
  )
}
