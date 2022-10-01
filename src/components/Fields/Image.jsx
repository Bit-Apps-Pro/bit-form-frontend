/* eslint-disable react/jsx-props-no-spreading */
import produce from 'immer'
import { useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $breakpoint, $flags } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { getCustomAttributes, getCustomClsName } from '../../Utils/globalHelpers'
import { deepCopy } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'
import { assignNestedObj } from '../style-new/styleHelpers'

function Image({ fieldKey, attr: fieldData, styleClasses, resizingFld }) {
  const wrap = useRef()
  const tempData = useRef({ extarnalSource: 'https://via.placeholder.com/1000x40' })
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const setStyles = useSetRecoilState($styles)
  const isHidden = fieldData.valid.hidden?.includes(breakpoint) || false
  const styleClassesForRender = deepCopy(styleClasses)

  if (resizingFld.fieldKey === fieldKey) {
    tempData.current.resize = true
  }
  if (tempData.current.resize && !resizingFld.fieldKey) {
    tempData.current.resize = false
    const getPropertyPath = (cssProperty) => `fields->${fieldKey}->classes->.${fieldKey}-fld-wrp->${cssProperty}`
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      assignNestedObj(drftStyle, getPropertyPath('height'), `${wrap?.current?.parentElement.clientHeight}px`)
    }))
    tempData.current.extarnalSource = `https://via.placeholder.com/${wrap?.current?.parentElement.clientWidth}x${wrap?.current?.parentElement.clientHeight}`
  }
  return (
    <>
      <RenderStyle styleClasses={styleClassesForRender} />
      <div
        data-dev-fld-wrp={fieldKey}
        ref={wrap}
        className={`${fieldKey}-fld-wrp ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''} ${getCustomClsName(fieldKey, 'fld-wrp')}`}
        {...getCustomAttributes(fieldKey, 'fld-wrp')}
      >
        <img
          data-dev-img={fieldKey}
          className={`${fieldKey}-img ${getCustomClsName(fieldKey, 'img')}`}
          src={fieldData?.bg_img || tempData.current?.extarnalSource}
          alt="bg"
          {...getCustomAttributes(fieldKey, 'img')}
        />
      </div>
    </>
  )
}

export default Image
