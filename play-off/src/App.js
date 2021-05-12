import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import {Route, Switch} from 'react-router-dom'
import {configure} from 'mobx'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'

configure({
    enforceActions:"never"
})

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = "/" component={LoginPage}/>
        <ProtectedRoute exact path = "/home" component = {HomePage}></ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
