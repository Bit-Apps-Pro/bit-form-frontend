/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import { memo } from 'react'
import BackgroundImageControl from '../CompSettings/StyleCustomize/ChildComp/BackgroundImageControl'

function BackgroundControlMenu({ stateObjName,
  propertyPath,
  objectPaths,
  id,
  fldKey }) {
  return <BackgroundImageControl stateObjName={stateObjName} propertyPath={propertyPath} objectPaths={objectPaths} id={id} fldKey={fldKey} />
}

export default memo(BackgroundControlMenu)
