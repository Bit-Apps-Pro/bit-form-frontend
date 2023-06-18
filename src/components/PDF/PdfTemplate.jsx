import loadable from '@loadable/component'
import { Route, Routes } from 'react-router-dom'
import AllPdfTemplates from './AllPdfTemplates'
import FSettingsLoader from '../Loaders/FSettingsLoader'

const NewPdfTemplate = loadable(() => import('./NewPdfTemplate'), { fallback: <FSettingsLoader /> })
const EditPdfTemplate = loadable(() => import('./EditPdfTemplate'), { fallback: <FSettingsLoader /> })

export default function PdfTemplate({ formID }) {
  return (
    <Routes>
      <Route index element={<AllPdfTemplates formID={formID} />} />
      <Route path="/new" element={<NewPdfTemplate />} />
      <Route path="/:id" element={<EditPdfTemplate />} />
    </Routes>
  )
}
