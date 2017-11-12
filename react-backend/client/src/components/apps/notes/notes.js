import React from 'react';
import './notes.css';
import {
  Link
} from 'react-router-dom'
  // Pass in true or fals to props.isOpen to toggle, and props.day for which day is being edited.
export class NewNoteMenu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {noteName: '', isDaily: false}
      this.reRenderNotes = this.reRenderNotes.bind(this);
    }

    reRenderNotes() {
      this.props.getNoteData();
    }

    toggleMenu() {
      this.props.toggleIsOpen();
    }

    newNote(noteName, noteDesc) {
      fetch('/notesapp/new/daily', {
          dataType:"json",
          method: 'post',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: noteName,curDate: ''})
        })
      .then(res => res.json())
      .then(notes => {
      })
    }
    
    onChange = (e) => {
      const state = this.state;
      console.log(e.target.value)
      state[e.target.name] = e.target.value;
      this.setState(state);
    }

    onToggle = (e) => {
      this.setState({isDaily: !this.state.isDaily})
    }

    onSubmit = (e) => {
      e.preventDefault();
      if (this.state.noteName.replace(/\s/g, '').length) {
        fetch('/notesapp/new/' + this.props.collection, {
          dataType:"json",
          method: 'post',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({date: this.props.curDate, isDaily: this.state.isDaily, name: this.state.noteName,})
        })
        this.setState({noteName: '',noteDesc: '', isDaily: false});
        this.reRenderNotes();
        this.toggleMenu();
      }
    }

    render() {
      if (this.props.isOpen) {
        return <div className = "notes-new-note-menu">
          <p className = "notes-new-title">New Note</p>
          <form onSubmit={this.onSubmit}>
            Note Title:<br/>
            <input type="text" name="noteName"  value = {this.state.noteName} onChange = {this.onChange}/>
            <br/>
            <input type="checkbox" name="isDaily" value = {this.state.isDaily} onChange = {this.onToggle}/>
            <input type="submit" value="Submit"/>
          </form> 
        </div>
      }
      else {
        return <div></div>
      }
    }
  }
export class NewNoteMenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false, noteJson: "rfrfrf"}
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  toggleIsOpen() {
    this.setState({isOpen: false});
  }

  render () {
    return <div><div className = "new-note-button clickable" onClick={ () => {this.setState({isOpen: true})}}>
              <p>+</p>
           </div>
           <NewNoteMenu isOpen = {this.state.isOpen} curDate = {this.props.curDate} getNoteData = {this.props.getNoteData} toggleIsOpen = {this.toggleIsOpen} collection = {this.props.collection}/>
           </div>
  }
}
//This class is a mess.
class FormatNotes extends React.Component {
    constructor(props) {
     super(props);
     this.state = {noteJson: "", dayNumber: 0};
   }

 
   componentDidMount() {
    this.getNotes();
   }
   //Converts an epoch number to a natural date
   epochToNatural(unix) {
    var date = new Date(0);
    date.setUTCSeconds(unix)
    var strDate = date.toDateString();
    return (strDate)
   }

   naturalToEpoch(nat) {
     var unix = new Date(nat);
     unix = unix.getTime();
     if (unix > 9999999999) {
      unix = unix/1000;
     }
     return unix;
   }

   formatToday(data, currentDate) {

    var that = this;
    var titles = [];
    var currentDateString = that.epochToNatural(currentDate);
    data.forEach(function(temp) {
      if (temp.date) {
        var noteDateNat = that.epochToNatural(temp.date);
        var noteDateEpoch = temp.date;
      }
      if (noteDateNat === currentDateString && !temp.isDaily) {
        titles.push(
          <div key = {temp._id + "-div1"}>
            <p className = "notes-title" key = {temp._id + "-title"}>{temp.name}</p>
          </div>
        );
      }
      else if (temp.isDaily === true && temp._id) {
        titles.push(
          <div key = {temp._id + "-div2"}>
            <p className = "notes-title notes-daily" key = {temp._id + "-title"}>{temp.name}</p>
          </div>
        );
      }
      else if (noteDateEpoch < currentDate) {
        titles.push(
          <div key = {temp._id + "-div3"}>
            <p className = "notes-title notes-late" key = {temp._id + "-title"}>{temp.name}</p>
          </div>
        );
      }
    })
    titles.push(<NewNoteMenuButton key = "332769595" curDate = {this.naturalToEpoch(currentDate)} getNoteData = {this.props.getNoteData} collection = "daily"/>);
    return titles;
   }

   formatFutureDay(data, currentDate) {
    var that = this;
    var titles = [];
    data.forEach(function(temp) {
      if (temp.date) {
        var noteDate = that.epochToNatural(temp.date);
      }
      if (noteDate === currentDate) {
        titles.push(
        <div key = {temp._id + "-div4"}>
          <p className = "notes-title" key = {temp._id + "-title"}>{temp.name}</p>
        </div>
        );
      }
    })
    titles.push(<NewNoteMenuButton key = "3324235235" curDate = {this.naturalToEpoch(currentDate)} getNoteData = {this.props.getNoteData} collection = "daily"/>);
    return titles;
   }

   //Takes an array of JSON objects and fromats it into HTML tags to be rendered, and a dayNumber for which days notes to use, 0 = today, 1 = tomorrow, etc.
   formatNotesJson(data, dayNumber) {
    //Gets the current date, adds 24 hours (86400 seconds) per dayNumber
    var currentDate = Math.round((new Date()).getTime() / 1000);
    currentDate += (86400 * dayNumber);
    var currentDateString = this.epochToNatural(currentDate)
    var titles;
    if (dayNumber == "0") {
      titles = this.formatToday(data, currentDate);
    }
    else {
      titles = this.formatFutureDay(data, currentDateString);
    }
    var response = <div>{titles}</div>
    return response;
   }

   getNotes(dayNumber) {
    return (this.formatNotesJson(this.props.notes, dayNumber));
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
     return <div className = "today">
              <Link to={`/`} className = "testingLink clickable"></Link>
              <div onClick={() => {if (this.state.dayNumber > 0){this.changeDayNumber(-1)}}} className = "openPreviousDay clickable"></div>
              <p className = "todayTitle">{day}</p>
              {this.getNotes(dayNumber)}
              <div onClick={() => {if (this.state.dayNumber < 13){this.changeDayNumber(1)}}} className = "openNextDay clickable"></div>
            </div>
   }
   notesFuture() {
     return <p>rfrfrfr</p>;
   }
   render() {
     return <div>
       {this.notesToday([this.state.dayNumber])}
       <div className = "future">
       <p className = "futureTitle">Future</p>
         {this.notesFuture}
       </div>
     </div>;
   }
 }
export default class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {noteJson: [{id: 8876586758,isDaily: true,title: "",desc: ""}, {id: 87858786,isDaily: true,title: "",desc: ""}]};
    this.getNotes = this.getNotes.bind(this);
  }
  
  componentDidMount() {
    this.getNotes();
  }

  getNotes() {
    console.log("getNotes called")
    //This REALLLLLYYY needs to be fixed
    var that = this;
    fetch('/notesapp/notes')
    .then(res => res.json())
    .then(notes => {
      that.setState({noteJson: notes})
    })
  }

  render() {
    return <div><FormatNotes notes = {this.state.noteJson} day = {this.props.currentDay} getNoteData = {this.getNotes}/> </div>;
  }
}