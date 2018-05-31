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
import NewRecord from './components/NewRecord';

class App extends Component {
  constructor(){
      super();
      this.state = {
          plate: '',
          phone_num: '',
          fireRedirect: false,
          redirect: '',
          recordData: null,
          plateMatchesPhoneNum: true,
          plateExists: true,
          createCompleted: null,
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.resetRedirect = this.resetRedirect.bind(this);
      this.getRecord = this.getRecord.bind(this);
      this.handleNewRecordSubmit = this.handleNewRecordSubmit.bind(this);
      this.resetCreateCompleted = this.resetCreateCompleted.bind(this);
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
      redirect: '',
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
                      redirect: '/record',
                      plateMatchesPhoneNum: true,
                      plateExists: true,
                  })
                  console.log(res.data);
              }else{
                  this.setState({
                    plateMatchesPhoneNum: false,
                    plateExists: true,
                  })
              }
          }
      })
      .catch(err => {
          console.log(err);
          this.setState({
            plateMatchesPhoneNum: true,
            plateExists: false,
          })
      })
  }

  handleNewRecordSubmit(e, record_time, record_name, record_milage, record_operator, record_gift, record_detail, record_id){
    e.preventDefault();
    axios.post("/record/new", {
      record_time: e.target.record_time.value,
      record_name: e.target.record_name.value,
      record_milage: e.target.record_milage.value,
      record_operator: e.target.record_operator.value,
      record_gift: e.target.record_gift.value,
      record_detail: e.target.record_detail.value,
      record_id: e.target.record_id.value,
    })
    .then(res => {
      console.log(res.data);
      this.setState({
        createCompleted: true,
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({
        createCompleted: false,
      })
    })
  }

  resetCreateCompleted(){
    this.setState({
      createCompleted: null,
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
                                                      fireRedirect = {this.state.fireRedirect}
                                                      redirect = {this.state.redirect}
                                                      submitForm = {this.submitForm}
                                                      resetRedirect = {this.resetRedirect}
                                                      plateMatchesPhoneNum = {this.state.plateMatchesPhoneNum}
                                                      plateExists = {this.state.plateExists}
                                                    />}/>
          <Route exact path = '/record' render = {() => <RecordList
                                                            plate = {this.state.plate}
                                                            resetRedirect = {this.resetRedirect}
                                                            getRecord = {this.getRecord}
                                                            recordData = {this.state.recordData}
                                                          />}/>
          <Route exact path = '/new' render = {() => <NewRecord
                                                          resetRedirect = {this.resetRedirect}
                                                          handleNewRecordSubmit = {this.handleNewRecordSubmit}
                                                          fireRedirect = {this.state.fireRedirect}
                                                          redirect = {this.state.redirect}
                                                          createCompleted = {this.state.createCompleted}
                                                          resetCreateCompleted = {this.resetCreateCompleted}
                                                        />}/>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
