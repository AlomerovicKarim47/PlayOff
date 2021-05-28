import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <ProtectedRoute path="/home" component={HomePage}></ProtectedRoute>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
