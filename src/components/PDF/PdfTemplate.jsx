import loadable from '@loadable/component'
import { useAtomValue } from 'jotai'
import { Route, Routes } from 'react-router-dom'
import { $formId } from '../../GlobalStates/GlobalStates'
import FSettingsLoader from '../Loaders/FSettingsLoader'
import AllPdfTemplates from './AllPdfTemplates'

const NewPdfTemplate = loadable(() => import('./NewPdfTemplate'), { fallback: <FSettingsLoader /> })
const EditPdfTemplate = loadable(() => import('./EditPdfTemplate'), { fallback: <FSettingsLoader /> })

export default function PdfTemplate() {
  const formID = useAtomValue($formId)
  return (
    <Routes>
      <Route index element={<AllPdfTemplates formID={formID} />} />
      <Route path="/new" element={<NewPdfTemplate />} />
      <Route path="/:id" element={<EditPdfTemplate />} />
    </Routes>
  )
}
