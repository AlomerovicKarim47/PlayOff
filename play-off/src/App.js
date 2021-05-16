import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Route, Switch } from 'react-router-dom'
import { configure } from 'mobx'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'

configure({
  enforceActions: "never"
})

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <ProtectedRoute exact path="/home" component={HomePage}></ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
