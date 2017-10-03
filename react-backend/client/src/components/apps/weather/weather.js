import React from 'react';
import './weather.css';
import {
  Link
} from 'react-router-dom'

class WeatherForecast extends React.Component {
   constructor(props) {
    super(props);
    this.state = {day0: "", day1: "", day2: "", day3: "", day4: "",date0: "", date1: "", date2: "", date3: "", date4: ""};
  }

  componentDidMount() {
    this.daily()
  }

  componentWillUnmount() {
    
  }
  
  dayOfWeek(seconds) {
    var d = new Date(0);
    d.setUTCSeconds(seconds);
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var n = weekday[d.getDay()];
    return n;
   }
  
  daily() {
    var that = this;
    fetch('https://api.apixu.com/v1/forecast.json?key=ed4074b8e05f40349e902646172009&q=18066&days=5')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        that.setState({day0: json.forecast.forecastday[0].day});
        that.setState({day1: json.forecast.forecastday[1].day});
        that.setState({day2: json.forecast.forecastday[2].day});
        that.setState({day3: json.forecast.forecastday[3].day});
        that.setState({day4: json.forecast.forecastday[4].day});
        that.setState({date0: json.forecast.forecastday[0].date_epoch});
        that.setState({date1: json.forecast.forecastday[1].date_epoch});
        that.setState({date2: json.forecast.forecastday[2].date_epoch});
        that.setState({date3: json.forecast.forecastday[3].date_epoch});
        that.setState({date4: json.forecast.forecastday[4].date_epoch});
  })
  }
  weatherDay (data,date) {
    var condition = data.condition;
    if (condition) {
      var text = condition.text;
      var icon = condition.icon
    }

    return <div className = "weather-day">
             <Link to={`/`} className = "testingLink clickable"></Link>
             <p className = "day-name">{this.dayOfWeek(date)}</p>
             <p className = "day-desc">{text}</p>
             <img className = "day-icon" src = {icon} alt = "weather-icon"/>
             <p className = "day-temp right-margin">{Math.round(data.mintemp_f)}</p>
             <p className = "day-temp left-margin">{Math.round(data.maxtemp_f)}</p>
             <p className = "day-wind">{Math.round(data.maxwind_mph)}mph</p>
           </div>
  }
  
  render() {
    var element = [];
    element.push(this.weatherDay(this.state.day0, this.state.date0));
    element.push(this.weatherDay(this.state.day1, this.state.date1));
    element.push(this.weatherDay(this.state.day2, this.state.date2));
    element.push(this.weatherDay(this.state.day3, this.state.date3));
    element.push(this.weatherDay(this.state.day4, this.state.date4));
    return <div className="forecast-weather">
      {element}
    </div>;
  }
}
export class CurrentWeather extends React.Component {
   constructor(props) {
    super(props);
    this.state = {description: ""};
    this.state = {image: ""};
    this.state = {temperature: ""};
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
    return <div className="current-weather">
      <img className = "current-icon" src = {this.state.image} alt = "weather-icon"/>
      <p className = "current-description">{this.state.description}</p>
      <p>{Math.round(this.state.temperature)}<sup>o</sup>F</p>
    </div>;
  }
}
export default class WeatherApp extends React.Component {
   constructor(props) {
    super(props);
    this.state = {temperature: ""};
  }

  componentDidMount() {
    this.tick()
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  
  tick() {
    fetch('https://api.apixu.com/v1/current.json?key=ed4074b8e05f40349e902646172009&q=18066')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
      });
  }
  render() {
    return <div className="weather-app">
      <CurrentWeather />
      <WeatherForecast />
    </div>;
  }
}