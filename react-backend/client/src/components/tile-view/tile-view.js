import React from 'react';
import './tile-view.css';
import WeatherPreview from "../previews/weather-preview"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
var jsonVar;
function Row(props) {
             function whichAppPreview (appName) {
               switch (appName){
                 case "WeatherPreview": return <WeatherPreview/>
                 default: return "";
                              }
             }
             return <div className = {props.class}>
                      <div className="row">
                        <div className="col first">
                          {whichAppPreview(props.preview)}
                        </div>
                        <div className="col">

                        </div>
                        <div className="col last">
                          
                        </div>
                      </div>
                    </div>;
};
export default class App extends React.Component {
  render() {
    return <div className="container-fluid">
             <Row class = "top" preview = "WeatherPreview"/>
             <Row />
             <Row class = "bottom" />
           </div>
  }
}