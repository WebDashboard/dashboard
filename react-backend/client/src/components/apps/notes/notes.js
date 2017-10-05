import React from 'react';
import './notes.css';
import {
  Link
} from 'react-router-dom'

  class FormatNotes extends React.Component {
    constructor(props) {
     super(props);
     this.state = {testState: "", dayNumber: 0};
   }
 
   componentDidMount() {
    this.getNotes();
   }
   //Converts an epoch number to a natural date
   epochToNatural(unix) {
    var date = new Date(0);
    date.setUTCSeconds(unix)
    var strDate = date.toDateString();
    strDate = strDate.substr(0,10)
    return (strDate)
   }
   //Takes an array of JSON objects and fromats it into HTML tags to be rendered, and a dayNumber for which days notes to use, 0 = today, 1 = tomorrow, etc.
   formatNotesJson(data, dayNumber) {
    var that = this;
    //Gets the current date, adds 24 hours (86400 seconds) per dayNumber
    var currentDate = Math.round((new Date()).getTime() / 1000);
    currentDate += (86400 * dayNumber);
    currentDate = this.epochToNatural(currentDate)

    var titles = [];
    data.forEach(function(temp) {
      if (temp.date) {
        var noteDate = that.epochToNatural(temp.date);
      }
      if (noteDate === currentDate) {
        titles.push(
        <div key = {temp.id + "-div"}>
          <p className = "notes-title" key = {temp.id + "-title"}>{temp.title.toString()}</p>
          <p className = "notes-desc" key = {temp.id + "-desc"}>{temp.desc.toString()}</p>
        </div>
        );
      }
    })
    var response = <div>{titles}</div>
    return response;
   }

   getNotes(dayNumber) {
    return (this.formatNotesJson(this.props.notes,dayNumber));
   }

   changeDayNumber(value) {
     var currentDayNumber = this.state.dayNumber + value;
     this.setState({dayNumber: currentDayNumber});
   }

   getDayName (dayNum) {
     switch (dayNum) {
       case 0: return "Today";
       case 1: return "Tomorrow";
       default: return this.epochToNatural(Math.round((new Date()).getTime() / 1000) + (86400 * dayNum))
     }
   }

   notesToday(dayNumber) {
     var day = this.getDayName(dayNumber[0]);
     console.log(day)
     return <div className = "today">
              <Link to={`/`} className = "testingLink clickable"></Link>
              <div onClick={() => {if (this.state.dayNumber > 0){this.changeDayNumber(-1)}}} className = "openPreviousDay clickable"></div>
              <p className = "todayTitle">{day}</p>
              {this.getNotes(dayNumber)}
              <div onClick={() => {if (this.state.dayNumber < 13){this.changeDayNumber(1)}}} className = "openNextDay clickable"></div>
            </div>
   }

   render() {
     return <div>
       {this.notesToday([this.state.dayNumber])}
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