import React from 'react';
import Main from './features/train/components/Main';
import Review from  './features/review/components/Review';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        
              <Link to="/review">Review</Link>
            
        <div className="App-content">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/review">
            <Review />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
      </div>
    </Router>
  )
}

export default App;
