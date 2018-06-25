import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import RecordList from './components/RecordList';
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
          userData: null,
          recordData: null,
          plateMatchesPhoneNum: true,
          plateExists: true,
          createCompleted: null,
          location: '',
          newServiceNum: null,
          serviceNum: null,
          admin_selection: '查找老客户',
          service_name_list: null,
          operator_list: null,
          gift_list: null,
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
      this.getRecordByPlate = this.getRecordByPlate.bind(this);
      this.getRecordByPhone = this.getRecordByPhone.bind(this);
      this.getRecordByName = this.getRecordByName.bind(this);
      this.getRecordByService = this.getRecordByService.bind(this);
      this.resetRecordData = this.resetRecordData.bind(this);
      this.updateUser = this.updateUser.bind(this);
      this.updateRecord = this.updateRecord.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
      this.deleteRecord = this.deleteRecord.bind(this);
      this.getServiceNameList = this.getServiceNameList.bind(this);
      this.getOpList = this.getOpList.bind(this);
      this.getGiftList = this.getGiftList.bind(this);
      this.updateServiceNameList = this.updateServiceNameList.bind(this);
      this.deleteServiceNameList = this.deleteServiceNameList.bind(this);
      this.addServiceNameList = this.addServiceNameList.bind(this);
      this.updateOpList = this.updateOpList.bind(this);
      this.deleteOpList = this.deleteOpList.bind(this);
      this.addOpList = this.addOpList.bind(this);
      this.updateGiftList = this.updateGiftList.bind(this);
      this.deleteGiftList = this.deleteGiftList.bind(this);
      this.addGiftList = this.addGiftList.bind(this);
      this.exportRecordData = this.exportRecordData.bind(this);
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
      axios.get(`/record/plate/${plate}`, {
          plate: plate,
      })
      .then(res => {
          if(res.data){
              if(res.data[0].phone_num === phone_num){
                  this.setState({
                      userData: res.data,
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
              axios.get(`/record/search/${res.data[0].service_num}`, {
                  service_num: res.data[0].service_num,
              })
              .then(res => {
                  if(res.data){
                      this.setState({
                          recordData: res.data,
                      })
                  }
              })
              .catch(err => {
                console.log(err);
              })
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

  getRecordByPlate (e, plate) {
    e.preventDefault();
    axios.get(`/record/plate/${plate}`, {
        plate: plate,
    })
    .then(res => {
        if(res.data){
            this.setState({
                userData: res.data,
                plateExists: true,
            })
            console.log(res.data);
            axios.get(`/record/search/${res.data[0].service_num}`, {
                service_num: res.data[0].service_num,
            })
            .then(res => {
                if(res.data){
                    this.setState({
                        recordData: res.data,
                    })
                }
            })
            .catch(err => {
              console.log(err);
            })
        }
    })
    .catch(err => {
        console.log(err);
        this.setState({
          plateExists: false,
        })
    })
  }
  getRecordByPhone (e, phone_num) {
    e.preventDefault();
    axios.get(`/record/phone/${phone_num}`, {
        phone_num: phone_num,
    })
    .then(res => {
        if(res.data){
            this.setState({
                userData: res.data,
                plateExists: true,
            })
            console.log(res.data);
            axios.get(`/record/search/${res.data[0].service_num}`, {
                service_num: res.data[0].service_num,
            })
            .then(res => {
                if(res.data){
                    this.setState({
                        recordData: res.data,
                    })
                }
            })
            .catch(err => {
              console.log(err);
            })
        }
    })
    .catch(err => {
        console.log(err);
        this.setState({
          plateExists: false,
        })
    })
  }
  getRecordByName (e, driver_name) {
    e.preventDefault();
    axios.get(`/record/name/${driver_name}`, {
        driver_name: driver_name,
    })
    .then(res => {
        if(res.data){
            this.setState({
                userData: res.data,
                plateExists: true,
            })
            console.log(res.data);
            axios.get(`/record/search/${res.data[0].service_num}`, {
                service_num: res.data[0].service_num,
            })
            .then(res => {
                if(res.data){
                    this.setState({
                        recordData: res.data,
                    })
                }
            })
            .catch(err => {
              console.log(err);
            })
        }
    })
    .catch(err => {
        console.log(err);
        this.setState({
          plateExists: false,
        })
    })
  }
  getRecordByService (e, service_num) {
    e.preventDefault();
    axios.get(`/record/service/${service_num}`, {
        service_num: service_num,
    })
    .then(res => {
        if(res.data){
            this.setState({
                userData: res.data,
                plateExists: true,
            })
            console.log(res.data);
            axios.get(`/record/search/${res.data[0].service_num}`, {
                service_num: res.data[0].service_num,
            })
            .then(res => {
                if(res.data){
                    this.setState({
                        recordData: res.data,
                    })
                }
            })
            .catch(err => {
              console.log(err);
            })
        }
    })
    .catch(err => {
        console.log(err);
        this.setState({
          plateExists: false,
        })
    })
  }

  handleNewRecordSubmit(e, record_time, record_name, record_milage, record_operator, record_gift, record_detail, record_id){
    e.preventDefault();
    if(!e.target.record_time.value){
      alert("请输入日期");
    }else if(!e.target.record_name.value){
      alert("请输入产品名称");
    }else if(!e.target.record_milage.value){
      alert("请输入表示里程");
    }else if(!e.target.record_operator.value){
      alert("请输入操作人");
    }else if(!e.target.record_gift.value){
      alert("请输入赠品情况");
    }else if(!e.target.record_detail.value){
      alert("请输入备注");
    }else{
      axios.post("/record/new-record", {
        record_time: e.target.record_time.value,
        record_name: e.target.record_name.value,
        record_milage: e.target.record_milage.value,
        record_operator: e.target.record_operator.value,
        record_gift: e.target.record_gift.value,
        record_detail: e.target.record_detail.value,
        record_id: record_id,
      })
      .then(res => {
        console.log(res.data);
        alert("创建成功");
        this.setState({
          createCompleted: true,
        })
      })
      .then(() => {
        axios.get(`/record/search/${record_id}`, {
          service_num: record_id,
        })
        .then(res => {
            if(res.data){
                this.setState({
                    recordData: res.data,
                })
            }
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          createCompleted: false,
        })
        alert(`创建失败。原因：${err}`);
      })
    }
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
          admin_selection: "查找老客户",
        });
        alert("创建成功");
        if(this.state.location === "海拉尔河东门店"){
            this.getNewHD();
        }
        if(this.state.location === "海拉尔河西门店"){
            this.getNewH();
        }
        if(this.state.location === "满洲里老店"){
            this.getNewM();
        }
        if(this.state.location === "满洲里新店"){
            this.getNewM8();
        }
        if(this.state.location === "牙克石门店"){
            this.getNewY();
        }
      })
      .then(() => {
        axios.get(`/record/service/${service_num}`, {
          service_num: service_num,
        })
        .then(res => {
            if(res.data){
                this.setState({
                    userData: res.data,
                    recordData: null,
                    plateExists: true,
                })
                console.log(res.data);
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({
              plateExists: false,
            })
        })
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

  resetRecordData(){
    this.setState({
      recordData: null,
      userData: null,
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

  updateUser = (e, make, plate, driver_name, phone_num, id) => {
    e.preventDefault();
    if(!make){
      alert("请输入车型");
    }else if(!plate){
      alert("请输入车牌号码");
    }else if(!driver_name){
      alert("请输入车主姓名");
    }else if(!phone_num){
      alert("请输入联系方式");
    }else{
      axios.put(`/record/update/user/${id}`, {
        make: make,
        plate: plate,
        driver_name: driver_name,
        phone_num: phone_num
      })
      .then(res => {
        console.log(res.data);
        axios.get(`/record/service/${this.state.userData[0].service_num}`, {
          service_num: this.state.userData[0].service_num,
        })
        .then(res => {
          if(res.data){
            this.setState({
              userData: res.data,
              plateExists: true,
            })
            console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        alert(`修改客户信息失败。原因：${err}`);
        console.log(err);
      })
    }
  }
  updateRecord = (e, record_time, record_name, record_milage, record_operator, record_gift, record_detail, id) => {
    e.preventDefault();
    if(!record_time){
      alert("请输入日期");
    }else if(!record_name){
      alert("请输入产品名称");
    }else if(!record_milage){
      alert("请输入表示里程");
    }else if(!record_operator){
      alert("请输入操作人");
    }else if(!record_gift){
      alert("请输入赠品情况");
    }else if(!record_detail){
      alert("请输入备注");
    }else{
      axios.put(`/record/update/record/${id}`, {
        record_time: record_time,
        record_name: record_name,
        record_milage: record_milage,
        record_operator: record_operator,
        record_gift: record_gift,
        record_detail: record_detail
      })
      .then(res => {
        console.log(res.data);
        axios.get(`/record/search/${this.state.userData[0].service_num}`, {
            service_num: this.state.userData[0].service_num,
        })
        .then(res => {
            if(res.data){
                this.setState({
                    recordData: res.data,
                })
            }
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        alert(`修改客户信息失败。原因：${err}`);
        console.log(err);
      })
    }
  }

  deleteUser = (id) => {
    let confirm = window.confirm(`确认删除用户：${this.state.userData[0].driver_name}？`);
    if(confirm === true){
      axios.delete(`/record/delete/user/${id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          userData: null,
          recordData: null,
        })
        alert("删除成功");
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  deleteRecord = (e, id) => {
    e.preventDefault();
    let confirm = window.confirm("确认删除该保养记录？");
    if(confirm === true){
      axios.delete(`/record/delete/record/${id}`)
      .then(res => {
        console.log(res.data);
        alert("删除成功");
      })
      .then(() => {
        axios.get(`/record/search/${this.state.userData[0].service_num}`, {
          service_num: this.state.userData[0].service_num,
        })
        .then(res => {
            if(res.data){
                this.setState({
                    recordData: res.data,
                })
            }
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  getServiceNameList = () => {
    axios.get('/option/all-names')
    .then(res => {
        this.setState({
            service_name_list: res.data,
        })
    })
    .catch(err => {
        console.log(err);
    })
  }
  getOpList = () => {
      axios.get('/option/all-ops')
      .then(res => {
          this.setState({
              operator_list: res.data,
          })
      })
      .catch(err => {
          console.log(err);
      })
  }
  getGiftList = () => {
      axios.get('/option/all-gifts')
      .then(res => {
          this.setState({
              gift_list: res.data,
          })
      })
      .catch(err => {
          console.log(err);
      })
  }

  updateServiceNameList = (e, record_name, type, id) => {
    e.preventDefault();
    axios.put(`/option/update/name-list/${id}`, {
      record_name: record_name,
      type: type,
    })
    .then(res => {
      console.log(res.data);
      this.getServiceNameList();
    })
    .catch(err => {
      console.log(err);
    })
  }
  deleteServiceNameList = (record_name, id) => {
    let confirm = window.confirm(`确认删除${record_name}？`);
    if(confirm === true){
      axios.delete(`/option/delete/name-list/${id}`)
      .then(res => {
        console.log(res.data);
        this.getServiceNameList();
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  addServiceNameList = (e, record_name, type) => {
    e.preventDefault();
    if(!record_name){
      alert("请输入产品名称");
    }else if(!type){
      alert("请输入产品分类");
    }else{
      axios.post("/option/new-name-list", {
        record_name: record_name,
        type: type,
      })
      .then(res => {
        console.log(res.data);
        alert("创建成功");
      })
      .then(() => {
        this.getServiceNameList();
      })
      .catch(err => {
        console.log(err);
        alert(`创建失败。原因：${err}`);
      })
    }
  }
  updateOpList = (e, record_operator, location, id) => {
    e.preventDefault();
    axios.put(`/option/update/op-list/${id}`, {
      record_operator: record_operator,
      location: location,
    })
    .then(res => {
      console.log(res.data);
      this.getOpList();
    })
    .catch(err => {
      console.log(err);
    })
  }
  deleteOpList = (record_operator, id) => {
    let confirm = window.confirm(`确认删除${record_operator}？`);
    if(confirm === true){
      axios.delete(`/option/delete/op-list/${id}`)
      .then(res => {
        console.log(res.data);
        this.getOpList();
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  addOpList = (e, record_operator, location) => {
    e.preventDefault();
    if(!record_operator){
      alert("请输入操作人");
    }else if(!location){
      alert("请输入门店地区");
    }else{
      axios.post("/option/new-op-list", {
        record_operator: record_operator,
        location: location,
      })
      .then(res => {
        console.log(res.data);
        alert("创建成功");
      })
      .then(() => {
        this.getOpList();
      })
      .catch(err => {
        console.log(err);
        alert(`创建失败。原因：${err}`);
      })
    }
  }
  updateGiftList = (e, record_gift, id) => {
    e.preventDefault();
    axios.put(`/option/update/gift-list/${id}`, {
      record_gift: record_gift,
    })
    .then(res => {
      console.log(res.data);
      this.getGiftList();
    })
    .catch(err => {
      console.log(err);
    })
  }
  deleteGiftList = (record_gift, id) => {
    let confirm = window.confirm(`确认删除${record_gift}？`);
    if(confirm === true){
      axios.delete(`/option/delete/gift-list/${id}`)
      .then(res => {
        console.log(res.data);
        this.getGiftList();
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  addGiftList = (e, record_gift) => {
    e.preventDefault();
    if(!record_gift){
      alert("请输入赠品");
    }else{
      axios.post("/option/new-gift-list", {
        record_gift: record_gift,
      })
      .then(res => {
        console.log(res.data);
        alert("创建成功");
      })
      .then(() => {
        this.getGiftList();
      })
      .catch(err => {
        console.log(err);
        alert(`创建失败。原因：${err}`);
      })
    }
  }

  exportRecordData = (data) => {
      console.log(data);
      axios.post('/record/export/record-data', {
        data: data,
      })
      // .then(res => {
      //   console.log(res.data);
      //   alert("下载成功！");
      // })
      // .catch(err => {
      //   console.log(err);
      // })
    // }
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
                                                            userData = {this.state.userData}
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
                                                          handleNewRecordSubmit = {this.handleNewRecordSubmit}
                                                          createCompleted = {this.state.createCompleted}
                                                          resetCreateCompleted = {this.resetCreateCompleted}
                                                          getRecordByPlate = {this.getRecordByPlate}
                                                          getRecordByPhone = {this.getRecordByPhone}
                                                          getRecordByName = {this.getRecordByName}
                                                          getRecordByService = {this.getRecordByService}
                                                          resetRecordData = {this.resetRecordData}
                                                          recordData = {this.state.recordData}
                                                          userData = {this.state.userData}
                                                          updateUser = {this.updateUser}
                                                          updateRecord = {this.updateRecord}
                                                          deleteUser = {this.deleteUser}
                                                          deleteRecord = {this.deleteRecord}
                                                          admin_selection = {this.state.admin_selection}
                                                          handleInputChange = {this.handleInputChange}
                                                          getServiceNameList = {this.getServiceNameList}
                                                          service_name_list = {this.state.service_name_list}
                                                          getOpList = {this.getOpList}
                                                          operator_list = {this.state.operator_list}
                                                          getGiftList = {this.getGiftList}
                                                          gift_list = {this.state.gift_list}
                                                          updateServiceNameList = {this.updateServiceNameList}
                                                          deleteServiceNameList = {this.deleteServiceNameList}
                                                          addServiceNameList = {this.addServiceNameList}
                                                          updateOpList = {this.updateOpList}
                                                          deleteOpList = {this.deleteOpList}
                                                          addOpList = {this.addOpList}
                                                          updateGiftList = {this.updateGiftList}
                                                          deleteGiftList = {this.deleteGiftList}
                                                          addGiftList = {this.addGiftList}
                                                          exportRecordData = {this.exportRecordData}
                                                        />}/>
          <Footer auth = {this.state.auth}/>
        </div>
      </Router>
    );
  }
}

export default App;
