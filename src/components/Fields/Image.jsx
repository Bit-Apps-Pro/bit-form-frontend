/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import produce from 'immer'
import { useEffect, useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $breakpoint, $fields, $flags } from '../../GlobalStates/GlobalStates'
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
  const setFields = useSetRecoilState($fields)
  const { width, height } = fieldData
  const getPropertyPath = (cssProperty) => `fields->${fieldKey}->classes->.${fieldKey}-fld-wrp->${cssProperty}`

  if (resizingFld.fieldKey === fieldKey) {
    tempData.current.resize = true
  }
  if (tempData.current.resize && !resizingFld.fieldKey) {
    tempData.current.resize = false
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      assignNestedObj(drftStyle, getPropertyPath('height'), `${wrap?.current?.parentElement.clientHeight}px`)
    }))

    setFields(prvFields => produce(prvFields, drftFields => {
      drftFields[fieldKey].height = wrap?.current?.parentElement.clientHeight
      drftFields[fieldKey].width = wrap?.current?.parentElement.clientWidth
    }))
    tempData.current.extarnalSource = `https://via.placeholder.com/${wrap?.current?.parentElement.clientWidth}x${wrap?.current?.parentElement.clientHeight}`
  }

  useEffect(() => {
    tempData.current.extarnalSource = `https://via.placeholder.com/${wrap?.current?.parentElement.clientWidth}x${wrap?.current?.parentElement.clientHeight}`
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
    tempData.current.extarnalSource = `https://via.placeholder.com/${width}x${height}`
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
