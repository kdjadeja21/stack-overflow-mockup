import React from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store';
import SplashScreen from './components/splashScreen/SplashScreen'

const Login = React.lazy(() => import('./components/login/Login'));
const Questions = React.lazy(() => import('./components/question-page/Questions'));
const Profile = React.lazy(() => import('./components/profile/Profile'));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <React.Suspense fallback={<SplashScreen />}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <Redirect to="/login" />
                )
              }}
            />

            <Route exact path="/login" component={Login} />
            <Route exact path="/questions" component={Questions} />
            <Route exact path="/user-profile/:userId" component={Profile} />
          </Switch>
        </React.Suspense>
      </div>
    </Provider>
  );
}

export default App;
