import React from 'react';
import App from './components/tile-view/tile-view.js';
import WeatherApp from './components/apps/weather/weather.js';
import NotesApp from './components/apps/notes/notes.js';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/weather" component={Weather}/>
      <Route path="/notes/today" component={NotesToday}/>
      <Route path="/notes/tomorrow" component={NotesTomorrow}/>
    </div>
  </Router>
)
//Home
const Home = ({match}) => (
  <div>
    <App />
  </div>
)
//Apps
const Weather = () => (
  <div>
    <WeatherApp />
  </div>
)
const NotesToday = () => (
  <div>
    <NotesApp currentDay = "today" />
  </div>
)
const NotesTomorrow = () => (
  <div>
    <NotesApp currentDay = "tomorrow" />
  </div>
)
export default BasicExample