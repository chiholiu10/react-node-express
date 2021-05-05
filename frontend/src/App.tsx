import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ReviewPage from './components/ReviewPage/ReviewPage';

export const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/music/:id">
            <ReviewPage />
          </Route>
          <Route path="*" render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};



export default App;
