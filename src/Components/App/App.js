import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'

import Classes from '../Classes/Classes'

export default function AppRouter() {
  return(
    <Router>
      <div>
        <Route path="/" exact component = {Classes}></Route>
      </div>
    </Router>
  )
}
