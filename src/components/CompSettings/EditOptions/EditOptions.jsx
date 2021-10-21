import produce from 'immer'
import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $fields, $selectedFieldId } from '../../../GlobalStates'
import StyleSegmentControl from '../../Utilities/StyleSegmentControl'
import { convertOptionsToText, convertTextToOptions, flattenOptions, formatOptions } from './editOptionsHelper'
import ImportOptionsTab from './ImportOptionsTab'
import TextOptionsTab from './TextOptionsTab'
import VisualOptionsTab from './VisualOptionsTab'

export default function EditOptions({ optionMdl, options, type, lblKey, valKey, hasGroup }) {

  const optKey = useRef(1)
  const { css } = useFela()
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const [editOptionType, setEditOptionType] = useState('Visual')
  const [tabChanged, setTabChanged] = useState('')
  const [option, setOption] = useState(() => flattenOptions(options, optKey) || [])
  const [optionTxt, setOptionTxt] = useState(() => convertOptionsToText(flattenOptions(options, optKey), lblKey, valKey))


  console.log('edit options', { fields })



  useEffect(() => {
    if (tabChanged || !optionMdl) {
      console.log('test field change')
      const tab = tabChanged || editOptionType
      if (tab === 'Visual') {
        setFields(allFields => produce(allFields, draft => { draft[fldKey].opt = formatOptions(option, lblKey) }))
      }

      if (tab === 'Text') {
        setFields(allFields => produce(allFields, draft => { draft[fldKey].opt = formatOptions(convertTextToOptions(optionTxt, optKey, lblKey, valKey), lblKey) }))
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
        <VisualOptionsTab optKey={optKey} options={options} option={option} setOption={setOption} type={type} lblKey={lblKey} valKey={valKey} hasGroup={hasGroup} />
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
