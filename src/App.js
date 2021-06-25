import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.less';
import PageLayout from './components/PageLayout';
import AuthContext from './context/AuthContext';
import RouteMap from './pages/base/RouteMap';
import { get, LocalStorageKey, put } from './utils/Storage';


class App extends Component {

  state = {
    user: JSON.parse(get(LocalStorageKey.USER)),
  }

  login = user => {
    this.setState({ user }, () => {
      put(LocalStorageKey.USER, JSON.stringify(this.state.user))
    })
  }

  logout = () => {
    this.setState({ user: null })
  }

  render() {
    const { user } = this.state
    console.log(user)
    return (
      <div className="App">
        <AuthContext.Provider value={{ user, login: this.login, logout: this.logout }}>
          <Router>
            {
              user ? <PageLayout><RouteMap /></PageLayout> : <RouteMap />
            }
          </Router>
        </AuthContext.Provider>
      </div>
    )
  }
}

export default App;