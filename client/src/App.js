import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import RecordList from './components/RecordList';

class App extends Component {
  constructor(){
      super();
      this.state = {
          plate: '',
          fireRedirect: false,
          redirect: null,
          recordData: null,
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.resetRedirect = this.resetRedirect.bind(this);
      this.getRecord = this.getRecord.bind(this);
  }

  handleInputChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
          [name]: value,
      });
  }

  submitForm = (e) => {
    e.preventDefault();
    this.setState({
      fireRedirect: true,
    })
  }

  resetRedirect = () => {
    this.setState({
      fireRedirect: false,
    })
  }

  getRecord (plate) {
      axios.get(`/record/${plate}`, {
          plate: plate,
      })
      .then(res => {
          this.setState({
              recordData: res.data,
          })
          console.log(res.data);
      })
      .catch(err => {
          console.log(err);
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path = '/' render = {() => <Home
                                                      plate = {this.state.plate}
                                                      handleInputChange = {this.handleInputChange}
                                                      redirect = {this.state.redirect}
                                                      fireRedirect = {this.state.fireRedirect}
                                                      submitForm = {this.submitForm}
                                                      resetRedirect = {this.resetRedirect}
                                                    />}/>
          <Route exact path = '/record' render = {() => <RecordList
                                                            plate = {this.state.plate}
                                                            resetRedirect = {this.resetRedirect}
                                                            getRecord = {this.getRecord}
                                                            recordData = {this.state.recordData}
                                                          />}/>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
