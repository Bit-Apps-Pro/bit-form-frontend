import React, { Suspense, lazy } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  useRouteMatch as match
} from "react-router-dom";

const Home = lazy(() => import("./views/App"));
const FormBuilder = lazy(() => import("./views/FormBuilder"));

const PageNotFound = () => (
    <div>404</div>
);

function Test() {
  console.log("OOOOLLOO:::: " + process.env.PUBLIC_URL);
  return "GOO"+ location+"</br>"+match.pathname;
}
function App() {
  return (
    <Router basename={bits.baseURL}>      
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/help" component={FormBuilder} />
          <Route exact path="/" component={Home} />
          <Route  component={Test} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
