import React from 'react';
import {
  Link
} from 'react-router-dom'

export default class NotesPreview extends React.Component {
    constructor(props) {
     super(props);
     this.state = {placeholder: "so it doesn't throw an error"}
   }
 
   componentDidMount() {
   }
 
   componentWillUnmount() {
   }
   
   render() {
     return <Link to={`/notes/today`} style={{ textDecoration: 'none', color: 'white' }} className = "clickable"><div className="preview-weather clickable"></div>
    </Link>;
   }
 }