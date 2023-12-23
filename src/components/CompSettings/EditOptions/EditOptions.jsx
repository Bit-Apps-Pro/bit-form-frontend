/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { IS_PRO } from '../../../Utils/Helpers'
import StyleSegmentControl from '../../Utilities/StyleSegmentControl'
import ProOverlay from '../StyleCustomize/ChildComp/ProOverlay'
import ImportOptionsTab from './ImportOptionsTab'
import TextOptionsTab from './TextOptionsTab'
import VisualOptionsTab from './VisualOptionsTab'
import { convertOptionsToText, convertTextToOptions, flattenOptions, formatOptions } from './editOptionsHelper'

export default function EditOptions({
  optionMdl, options, setOptions, type, lblKey, valKey, imgKey, isPro, isRating, checkByDefault = true, hasGroup, showUpload = false, onlyVisualOptionsTab = false, hideNDisabledOptions = false, customType, setCustomType,
}) {
  const optKey = useRef(1)
  const { css } = useFela()
  const [editOptionType, setEditOptionType] = useState('Visual')
  const [tabChanged, setTabChanged] = useState('')
  const [option, setOption] = useState(() => flattenOptions(options, optKey) || [])
  const [optionTxt, setOptionTxt] = useState(() => convertOptionsToText(flattenOptions(options, optKey), lblKey, valKey, imgKey))

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

  return (
    <div className={css(style.wrapper)}>
      {isPro && !IS_PRO && <ProOverlay />}
      {onlyVisualOptionsTab ? (
        <VisualOptionsTab
          optKey={optKey}
          options={options}
          option={option}
          setOption={setOption}
          type={type}
          lblKey={lblKey}
          valKey={valKey}
          imgKey={imgKey}
          checkByDefault={checkByDefault}
          isRating={isRating}
          hasGroup={hasGroup}
          showUpload={showUpload}
          hideNDisabledOptions={hideNDisabledOptions}
        />
      ) : (
        <>
          <StyleSegmentControl
            options={[{ label: 'Visual' }, { label: 'Text' }, { label: 'Import' }]}
            onChange={lbl => handleSegment(lbl)}
            defaultActive={editOptionType}
            wideTab
          />
          {editOptionType === 'Visual' && (
            <VisualOptionsTab
              optKey={optKey}
              options={options}
              option={option}
              setOption={setOption}
              type={type}
              lblKey={lblKey}
              valKey={valKey}
              imgKey={imgKey}
              checkByDefault={checkByDefault}
              hasGroup={hasGroup}
              isRating={isRating}
              showUpload={showUpload}
              hideNDisabledOptions={hideNDisabledOptions}
            />
          )}

          {editOptionType === 'Text' && (
            <TextOptionsTab
              options={options}
              optionTxt={optionTxt}
              setOptionTxt={setOptionTxt}
              lblKey={lblKey}
              valKey={valKey}
              imgKey={imgKey}
              isPro
            />
          )}
          {editOptionType === 'Import' && (
            <ImportOptionsTab
              setOptions={setOptions}
              lblKey={lblKey}
              valKey={valKey}
              setEditOptionType={setEditOptionType}
              isPro
              customType={customType}
              setCustomType={setCustomType}
            />
          )}
        </>
      )}
    </div>
  )
}

const style = {
  wrapper: {
    scrollBehavior: 'auto !important',
    mt: 10,
    '& *': {
      scrollBehavior: 'auto !important',
    },
  },
}
