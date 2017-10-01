import React from 'react';
import './notes.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class NotesApp extends React.Component {
    constructor(props) {
     super(props);
   }
 
   componentDidMount() {
   }
 
   //Returns 3 divs, one for today's notes, one for tomorrow's, and one for the future
   //Each div contains a variable which contains the corresponding notes.
   //These variables are set in the function "*******"
   render() {
     return <div>
       <div className = "today"></div>
       <div className = "future"></div>
     </div>;
   }
 }