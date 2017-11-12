import React from 'react';
import './test.css';
import {
} from 'react-router-dom'

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {testState: "start"};
    }

    componentDidMount() {
        this.newNote();
      }

    newNote() {
        fetch('/notesapp/neww', {
            dataType:"json",
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: "name", quote: "It works"})
          })
        .then(res => res.json())
        .then(notes => {
        console.log(notes);
        })
    }  

    render() {
        return <p>{this.state.testState}</p>
    }
}