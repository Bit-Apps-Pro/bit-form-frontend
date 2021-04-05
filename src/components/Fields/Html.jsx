/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, useEffect } from 'react'

export default function HtmlField({ attr, onBlurHandler, resetFieldValue, formID }) {
  return (
    <div className={`fld-wrp fld-wrp-${formID} drag ${attr.valid.hide ? 'btcd-hidden' : ''}`} btcd-fld="decisionbox" dangerouslySetInnerHTML={{ __html: attr.content || attr?.info?.content }} />
  )
}
