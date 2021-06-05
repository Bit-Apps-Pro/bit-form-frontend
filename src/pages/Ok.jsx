import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fieldLabels, $fields, $fieldsArr, $forms, $layouts, $newFormId, $reports, $uniqueFieldId } from '../GlobalStates'

function Ok() {
  console.log('render ok')
  const a = useParams()
  const [layout, setLay] = useRecoilState($layouts)
  const [forms, sforms] = useRecoilState($forms)
  const [reports, sreports] = useRecoilState($reports)
  const [fields, setFields] = useRecoilState($fields)
  const [fifieldLabelselds, ssfieldLabels] = useRecoilState($fieldLabels)
  const uniqueFieldId = useRecoilValue($uniqueFieldId)
  const newFormId = useRecoilValue($newFormId)
  const fieldsArr = useRecoilValue($fieldsArr)
  // const parm = useRecoilValue($param)

  console.log({ a })

  return (
    <div>
      ok
      {' '}
      {newFormId}
      {' '}
      {JSON.stringify(fields)}
    </div>
  )
}
export default memo(Ok)
