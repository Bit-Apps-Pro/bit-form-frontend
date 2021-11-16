import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import StyleSegmentControl from '../../Utilities/StyleSegmentControl'
import { convertOptionsToText, convertTextToOptions, flattenOptions, formatOptions } from './editOptionsHelper'
import ImportOptionsTab from './ImportOptionsTab'
import TextOptionsTab from './TextOptionsTab'
import VisualOptionsTab from './VisualOptionsTab'

export default function EditOptions({ optionMdl, options, setOptions, type, lblKey, valKey, checkByDefault = true, hasGroup }) {
  const optKey = useRef(1)
  const { css } = useFela()
  const [editOptionType, setEditOptionType] = useState('Visual')
  const [tabChanged, setTabChanged] = useState('')
  const [option, setOption] = useState(() => flattenOptions(options, optKey) || [])
  const [optionTxt, setOptionTxt] = useState(() => convertOptionsToText(flattenOptions(options, optKey), lblKey, valKey))

  useEffect(() => {
    if (tabChanged || !optionMdl) {
      const tab = tabChanged || editOptionType
      if (tab === 'Visual') {
        setOptions(formatOptions(option, lblKey))
      }

      if (tab === 'Text') {
        setOptions(formatOptions(convertTextToOptions(optionTxt, optKey, lblKey, valKey), lblKey))
      }

      setTabChanged('')
    }
  }, [tabChanged, optionMdl])

  const handleSegment = lbl => {
    setEditOptionType(oldLbl => {
      setTabChanged(oldLbl)
      return lbl
    })
  }

  console.log({ options })

  return (
    <div className={css(style.wrapper)}>

      <StyleSegmentControl options={[{ label: 'Visual' }, { label: 'Text' }, { label: 'Import' }]} onChange={lbl => handleSegment(lbl)} activeValue={editOptionType} wideTab />

      {editOptionType === 'Visual' && (
        <VisualOptionsTab optKey={optKey} options={options} option={option} setOption={setOption} type={type} lblKey={lblKey} valKey={valKey} checkByDefault={checkByDefault} hasGroup={hasGroup} />
      )}
      {editOptionType === 'Text' && (
        <TextOptionsTab options={options} optionTxt={optionTxt} setOptionTxt={setOptionTxt} lblKey={lblKey} valKey={valKey} />
      )}
      {editOptionType === 'Import' && (
        <ImportOptionsTab lblKey={lblKey} valKey={valKey} setEditOptionType={setEditOptionType} />
      )}

    </div>
  )
}

const style = { wrapper: { scrollBehavior: 'auto !important', '& *': { scrollBehavior: 'auto !important' } } }
