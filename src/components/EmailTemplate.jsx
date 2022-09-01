import loadable from '@loadable/component'
import { Route, Routes } from 'react-router-dom'
import AllEmailTemplates from './AllEmailTemplates'
import FSettingsLoader from './Loaders/FSettingsLoader'

const EmailTemplateNew = loadable(() => import('./EmailTemplateNew'), { fallback: <FSettingsLoader /> })
const EmailTemplateEdit = loadable(() => import('./EmailTemplateEdit'), { fallback: <FSettingsLoader /> })

export default function EmailTemplate({ formID }) {
  return (
    <Routes>
      <Route index element={<AllEmailTemplates formID={formID} />} />
      <Route path="/new" element={<EmailTemplateNew />} />
      <Route path="/:id" element={<EmailTemplateEdit />} />
    </Routes>
  )
}
