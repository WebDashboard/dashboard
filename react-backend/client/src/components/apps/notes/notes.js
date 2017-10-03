import React from 'react';
import './notes.css';
import {
  Link
} from 'react-router-dom'

export default class NotesApp extends React.Component {
    constructor(props) {
     super(props);
     this.state = {testState: ""};
   }
 
   componentDidMount() {
     this.getNotes();
   }
 
   formatNotesJson(data) {
    var titles = [];
    data.forEach(function(temp) {
      titles.push(
      <div>
        <p className = "notes-title" key = {temp.id + "-title"}>{temp.title.toString()}</p>
        <p className = "notes-desc" key = {temp.id + "-desc"}>{temp.desc.toString()}</p>
      </div>
      );
    })
    var response = <div>{titles}</div>
    return response;
   }

   getNotes() {
     fetch('/notesapp/notes')
     .then(res => res.json())
     .then(notes => this.setState({testState: this.formatNotesJson(notes)}));
   }

   //Returns 3 divs, one for today's notes, one for tomorrow's, and one for the future
   //Each div contains a variable which contains the corresponding notes.
   //These variables are set in the function "getNotes()"
   render() {
     return <div>
       <div className = "today">
         <p className = "todayTitle">Today</p>
         {this.state.testState}
         <Link to={`/`} className = "testingLink clickable"></Link>
        </div>
       <div className = "future">
       <p className = "futureTitle">Future</p>
         {this.state.testState}
       </div>
     </div>;
   }
 }