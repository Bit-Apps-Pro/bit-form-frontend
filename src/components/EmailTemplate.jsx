import { Suspense, lazy } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import AllEmailTemplates from './AllEmailTemplates'
import FSettingsLoader from './Loaders/FSettingsLoader'

const EmailTemplateNew = lazy(() => import('./EmailTemplateNew'))
const EmailTemplateEdit = lazy(() => import('./EmailTemplateEdit'))
export default function EmailTemplate({ formID, saveForm }) {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <AllEmailTemplates formID={formID} />
      </Route>
      <Route path={`${path}/:new`}>
        <Suspense fallback={<FSettingsLoader />}>
          <EmailTemplateNew saveForm={saveForm} />
        </Suspense>
      </Route>
      <Route path={`${path}/:id`}>
        <Suspense fallback={<FSettingsLoader />}>
          <EmailTemplateEdit saveForm={saveForm} />
        </Suspense>
      </Route>
    </Switch>
  )
}
