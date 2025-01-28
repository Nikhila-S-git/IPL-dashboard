import {Route, Switch, BrowserRouter} from 'react-router-dom'

import Home from './components/Home'
import Teammatches from './components/TeamMatches'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/team-matches/:id" component={Teammatches} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
