import React from 'react';
import App from './components/tile-view/tile-view.js';
import WeatherApp from './components/apps/weather/weather.js';
import NotesApp from './components/apps/notes/notes.js';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/weather" component={Weather}/>
    </div>
  </Router>
)

const Home = ({match}) => (
  <div>
    <App />
    <Link to={`/about`}>
      About
    </Link>
  </div>
)

const Weather = () => (
  <div>
    <WeatherApp />
    <Link to={`/`}>
      Home
    </Link>
  </div>
)

export default BasicExample