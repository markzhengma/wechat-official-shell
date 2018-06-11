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
import Login from './components/Login';
import AdminPage from './components/AdminPage';

class App extends Component {
  constructor(){
      super();
      this.state = {
          auth: false,
          plate: '',
          phone_num: '',
          fireRedirect: false,
          redirect: '',
          recordData: null,
          plateMatchesPhoneNum: true,
          plateExists: true,
          createCompleted: null,
          location: '',
          newServiceNum: null,
          serviceNum: null,
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.resetRedirect = this.resetRedirect.bind(this);
      this.getRecord = this.getRecord.bind(this);
      this.handleNewRecordSubmit = this.handleNewRecordSubmit.bind(this);
      this.resetCreateCompleted = this.resetCreateCompleted.bind(this);
      this.setAuthState = this.setAuthState.bind(this);
      this.handleNewUserSubmit = this.handleNewUserSubmit.bind(this);
      this.setRedirect = this.setRedirect.bind(this);
      this.setLocation = this.setLocation.bind(this);
      this.getNewHD = this.getNewHD.bind(this);
      this.getNewH = this.getNewH.bind(this);
      this.getNewM = this.getNewM.bind(this);
      this.getNewM8 = this.getNewM8.bind(this);
      this.getNewY = this.getNewY.bind(this);
      this.padNumbers = this.padNumbers.bind(this);
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
    axios.post("/record/new-record", {
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

  handleNewUserSubmit(e, service_num, make, plate, driver_name, phone_num){
    e.preventDefault();
    if(!e.target.make.value){
      alert("请输入车型");
    }else if(!e.target.plate.value){
      alert("请输入车牌号");
    }else if(!e.target.driver_name.value){
      alert("请输入车主姓名");
    }else if(!e.target.phone_num.value){
      alert("请输入联系方式");
    }else{
      axios.post("/record/new-user", {
        service_num: this.state.newServiceNum,
        make: e.target.make.value,
        plate: e.target.plate.value,
        driver_name: e.target.driver_name.value,
        phone_num: e.target.phone_num.value,
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          createCompleted: true,
        });
        alert("创建成功");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          createCompleted: false,
        });
        alert(`创建失败，原因：${err}`);
      })
    }
  }

  setRedirect(path){
    this.setState({
      fireRedirect: true,
      redirect: path,
    })
  }

  resetCreateCompleted(){
    this.setState({
      createCompleted: null,
    })
  }

  setAuthState(auth){
    this.setState({
      auth: auth,
    })
  }

  setLocation(location){
    this.setState({
      location: location,
    })
  }

  padNumbers(number, size){
    var s = number + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  getNewHD(){
    axios.get('/record/newhd')
    .then(res => {
        var serviceNum = "HD" + (this.padNumbers((parseInt(res.data.service_num.replace(/\D/g,'')) + 1), 4));
        console.log(res.data.service_num);
        this.setState({
          newServiceNum: serviceNum,
        })
    })
    .catch(err => {
        console.log(err);
    })
  }
  getNewH(){
    axios.get('/record/newh')
    .then(res => {
        var serviceNum = "H" + (this.padNumbers((parseInt(res.data.service_num.replace(/\D/g,'')) + 1), 4));
        console.log(res.data.service_num);
        this.setState({
          newServiceNum: serviceNum,
        })
    })
    .catch(err => {
        console.log(err);
    })
  }
  getNewM(){
    axios.get('/record/newm')
    .then(res => {
        var serviceNum = "M" + (this.padNumbers((parseInt(res.data.service_num.replace(/\D/g,'')) + 1), 4));
        console.log(res.data.service_num);
        this.setState({
          newServiceNum: serviceNum,
        })
    })
    .catch(err => {
        console.log(err);
    })
  }
  getNewM8(){
    axios.get('/record/newm8')
    .then(res => {
        var serviceNum = "M" + (parseInt(res.data.service_num.replace(/\D/g,'')) + 1);
        console.log(res.data.service_num);
        this.setState({
          newServiceNum: serviceNum,
        })
    })
    .catch(err => {
        console.log(err);
    })
  }
  getNewY(){
    axios.get('/record/newy')
    .then(res => {
        var serviceNum = "Y" + (this.padNumbers((parseInt(res.data.service_num.replace(/\D/g,'')) + 1), 4));
        console.log(res.data.service_num);
        this.setState({
          newServiceNum: serviceNum,
        })
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
          <Route exact path = '/login' render = {() => <Login
                                                          setAuthState = {this.setAuthState}
                                                          resetRedirect = {this.resetRedirect}
                                                          handleNewRecordSubmit = {this.handleNewRecordSubmit}
                                                          fireRedirect = {this.state.fireRedirect}
                                                          redirect = {this.state.redirect}
                                                          setRedirect = {this.setRedirect}
                                                          setLocation = {this.setLocation}
                                                          />}/>
          <Route exact path = '/admin' render = {() => <AdminPage
                                                          auth = {this.state.auth}
                                                          resetRedirect = {this.resetRedirect}
                                                          setAuthState = {this.setAuthState}
                                                          location = {this.state.location}
                                                          redirect = {this.state.redirect}
                                                          newServiceNum = {this.state.newServiceNum}
                                                          getNewHD = {this.getNewHD}
                                                          getNewH = {this.getNewH}
                                                          getNewM = {this.getNewM}
                                                          getNewM8 = {this.getNewM8}
                                                          getNewY = {this.getNewY}
                                                          handleNewUserSubmit = {this.handleNewUserSubmit}
                                                          createCompleted = {this.state.createCompleted}
                                                          resetCreateCompleted = {this.resetCreateCompleted}
                                                        />}/>
          <Footer auth = {this.state.auth}/>
        </div>
      </Router>
    );
  }
}

export default App;
