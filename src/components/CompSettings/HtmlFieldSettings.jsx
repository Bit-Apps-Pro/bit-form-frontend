import { useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates'
import TinyMCE from '../Utilities/TinyMCE'
import Back2FldList from './Back2FldList'

export default function HtmlFieldSettings({ setElementSetting, elm, updateData }) {
  const elmId = elm.id
  const fields = useRecoilValue($fields)
  const elmData = { ...fields[elmId] }

  const setContent = val => {
    elmData.content = val

    updateData({ id: elmId, data: elmData })
  }

  return (
    <div className="mr-4 ml-2">
      <Back2FldList />
      <div className="mb-2">
        <span className="font-w-m">Field Type :</span>
        {' '}
        {elmData.typ.charAt(0).toUpperCase() + elmData.typ.slice(1)}
      </div>
      <div className="mt-3">
        <b>Content: </b>
        <br />
        <br />
        <TinyMCE
          id={elmId}
          value={elmData.content || elmData?.info?.content}
          onChangeHandler={setContent}
        />
      </div>
    </div>
  )
}
