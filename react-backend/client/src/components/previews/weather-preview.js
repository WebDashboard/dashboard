import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class WeatherPreview extends React.Component {
    constructor(props) {
     super(props);
     this.state = {description: ""};
     this.state = {image: ""};
     this.state = {temperature: ""};
     this.state = {day: ""};
   }
 
   componentDidMount() {
     this.tick()
   }
 
   componentWillUnmount() {
   }
   

   tick() {
     var that = this;
     function capFirst(str) {
       str = str.toLowerCase().split(' ');
       for(var i = 0; i < str.length; i++){
           str[i] = str[i].split('');
           str[i][0] = str[i][0].toUpperCase(); 
           str[i] = str[i].join('');
       }
       return str.join(' ');
     }
     fetch('https://api.apixu.com/v1/current.json?key=ed4074b8e05f40349e902646172009&q=18066')
       .then(function(response) {
         return response.json();
       })
       .then(function(json) {
         var desc = capFirst(json.current.condition.text);
         var img = json.current.condition.icon;
         var temp = json.current.temp_f;
         that.setState({image: img})
         that.setState({description: desc});
         that.setState({temperature: temp});
       });
   }
   render() {
     return <Link to={`/weather`} style={{ textDecoration: 'none', color: 'white' }}><div className="preview-weather">
       <img className = "icon" src = {this.state.image} />
       <p className = "description">{this.state.description}</p>
       <p>{Math.round(this.state.temperature)}<sup>o</sup>F</p>
     </div></Link>;
   }
 }