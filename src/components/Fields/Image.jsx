/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import { produce } from 'immer'
import { useEffect, useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $breakpoint, $fields, $flags } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { getCustomAttributes, getCustomClsName } from '../../Utils/globalHelpers'
import { deepCopy } from '../../Utils/Helpers'
import RenderStyle from '../style-new/RenderStyle'
import { assignNestedObj } from '../style-new/styleHelpers'

// const placeholderImgUrl = (h, w) => `https://via.placeholder.com/${w}x${h}`
const placeholderImgUrl = (h, w) => `https://fakeimg.pl/${h}x${w}/?text=${h} x ${w}`

function Image({ fieldKey, attr: fieldData, styleClasses, resizingFld }) {
  const wrap = useRef()
  const tempData = useRef({ extarnalSource: placeholderImgUrl(100, 40) })
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const setStyles = useSetRecoilState($styles)
  const isHidden = fieldData.valid.hidden?.includes(breakpoint) || false
  const styleClassesForRender = deepCopy(styleClasses)
  const setFields = useSetRecoilState($fields)
  const { width, height } = fieldData
  const getPropertyPath = (cssProperty) => `fields->${fieldKey}->classes->.${fieldKey}-fld-wrp->${cssProperty}`

  if (resizingFld.fieldKey === fieldKey) {
    tempData.current.resize = true
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      assignNestedObj(drftStyle, getPropertyPath('max-height'), '')
    }))
  }
  if (tempData.current.resize && !resizingFld.fieldKey) {
    tempData.current.resize = false
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      assignNestedObj(drftStyle, getPropertyPath('height'), `${wrap?.current?.parentElement.clientHeight}px`)
      assignNestedObj(drftStyle, getPropertyPath('width'), `${wrap?.current?.parentElement.clientWidth}px`)
      assignNestedObj(drftStyle, getPropertyPath('max-height'), `${wrap?.current?.parentElement.clientHeight}px`)
    }))

    setFields(prvFields => produce(prvFields, drftFields => {
      drftFields[fieldKey].height = wrap?.current?.parentElement.clientHeight
      drftFields[fieldKey].width = wrap?.current?.parentElement.clientWidth
    }))
    tempData.current.extarnalSource = placeholderImgUrl(wrap?.current?.parentElement.clientWidth, wrap?.current?.parentElement.clientHeight)
  }

  useEffect(() => {
    tempData.current.extarnalSource = placeholderImgUrl(wrap?.current?.parentElement.clientWidth, wrap?.current?.parentElement.clientHeight)
    setFields(prvFields => produce(prvFields, drftFields => {
      drftFields[fieldKey].height = wrap?.current?.parentElement.clientHeight
      drftFields[fieldKey].width = wrap?.current?.parentElement.clientWidth
    }))
    // setStyles(prvStyle => produce(prvStyle, drftStyle => {
    //   assignNestedObj(drftStyle, getPropertyPath('height'), `${wrap?.current?.parentElement.clientHeight}px`)
    //   assignNestedObj(drftStyle, getPropertyPath('width'), `${wrap?.current?.parentElement.clientWidth}px`)
    // }))
  }, [])

  useEffect(() => {
    tempData.current.extarnalSource = placeholderImgUrl(width, height)
  }, [width, height])

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
          alt={fieldData?.alt}
          {...getCustomAttributes(fieldKey, 'img')}
          width={fieldData?.width}
          height={fieldData?.height}
          draggable={false}
        />
      </div>
    </>
  )
}

export default Image
