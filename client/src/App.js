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
          phone_num: '',
          fireRedirect: false,
          redirect: null,
          recordData: null,
          inputCorrect: true,
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
    this.getRecord(this.state.plate, this.state.phone_num);
  }

  resetRedirect = () => {
    this.setState({
      fireRedirect: false,
    })
  }

  getRecord (plate, phone_num) {
      axios.get(`/record/${plate}`, {
          plate: plate,
      })
      .then(res => {
          if(res.data){
              if(res.data[0].phone_num == phone_num){
                  this.setState({
                      recordData: res.data,
                      fireRedirect: true,
                      inputCorrect: true,
                  })
                  console.log(res.data);
              }else{
                  this.setState({
                    inputCorrect: false,
                  })
              }
          }
      })
      .catch(err => {
          console.log(err);
          this.setState({
            inputCorrect: false,
          })
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path = '/' render = {() => <Home
                                                      plate = {this.state.plate}
                                                      phone_num = {this.state.phone_num}
                                                      handleInputChange = {this.handleInputChange}
                                                      redirect = {this.state.redirect}
                                                      fireRedirect = {this.state.fireRedirect}
                                                      submitForm = {this.submitForm}
                                                      resetRedirect = {this.resetRedirect}
                                                      inputCorrect = {this.state.inputCorrect}
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
