import React from 'react';
import './tile-view.css';
import WeatherPreview from "../previews/weather-preview"
import NotesPreview from "../previews/notes-preview"

function Row(props) {
             function whichAppPreview (appName) {
               switch (appName){
                 case "WeatherPreview": return <WeatherPreview/>;
                 case "NotesPreview": return <NotesPreview/>;
                 default: return "";
                              }
             }
             return <div className = {props.class}>
                      <div className="row">
                        <div className="col first">
                          {whichAppPreview(props.preview1)}
                        </div>
                        <div className="col">
                        {whichAppPreview(props.preview2)}
                        </div>
                        <div className="col last">
                          
                        </div>
                      </div>
                    </div>;
};
export default class App extends React.Component {
  render() {
    return <div className="container-fluid">
             <Row class = "top" preview1 = "WeatherPreview" preview2 = "NotesPreview" />
             <Row />
             <Row class = "bottom" />
           </div>
  }
}