import React from 'react';
import './notes.css';
import {
  Link
} from 'react-router-dom'

  class FormatNotes extends React.Component {
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
      <div key = {temp.id + "-div"}>
        <p className = "notes-title" key = {temp.id + "-title"}>{temp.title.toString()}</p>
        <p className = "notes-desc" key = {temp.id + "-desc"}>{temp.desc.toString()}</p>
      </div>
      );
    })
    var response = <div>{titles}</div>
    return response;
   }

   getNotes() {
    return (this.formatNotesJson(this.props.notes));
   }

   notesToday() {
     return <div className = "today">
              <Link to={`/`} className = "testingLink clickable"></Link>
              <p className = "todayTitle">Today</p>
              {this.getNotes()}
              <Link to={`/notes/tomorrow`} className = "openNextDay clickable"></Link>
            </div>
   }

   notesTomorrow() {
    return <div className = "today">
             <Link to={`/`} className = "testingLink clickable"></Link>
             <Link to={`/notes/today`} className = "openPreviousDay clickable"></Link>
             <p className = "todayTitle">Tomorrow</p>
             {this.getNotes()}
           </div>
  }

  chooseDay(day) {
    switch (day) {
      case "today": return this.notesToday();
      case "tomorrow": return this.notesTomorrow();
    }
  }

   render() {
     return <div>
       {this.chooseDay(this.props.day)}
       <div className = "future">
       <p className = "futureTitle">Future</p>
         
       </div>
     </div>;
   }
 }
export default class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {testState: [{id: 8876586758,isDaily: true,title: "",desc: ""}, {id: 87858786,isDaily: true,title: "",desc: ""}]};
  }
  
  componentDidMount() {
    this.getNotes();
  }

  getNotes() {
    fetch('/notesapp/notes')
    .then(res => res.json())
    .then(notes => {
      this.setState({testState: notes})
    })
  }

  render() {
    return <FormatNotes notes = {this.state.testState} day = {this.props.currentDay}/>;
  }
}