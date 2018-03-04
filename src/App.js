import React, { Component } from 'react';
import InputMask from 'react-input-mask';
// import axios from 'axios'

import './App.css';

var key = 0;

class OperatorButton extends Component{
  render(){
  return(
    <div className="card btn btn-light" style={{width: '18rem'}} {...this.props} >
      <img className="card-img-top" src={this.props.logo} alt=""/>
      <div className="card-body">
        <h3 className="card-title text-center">{this.props.name}</h3>
      </div>
    </div>
    )
  }
}

class InputPanel extends Component{
  constructor(props) {
    super(props);

    this.state = {
      phoneNumberMask: props.phonenumbermask,
      phoneNumber: props.startwith,
      startWith: props.startwith,
      moneyValue: '',
      moneyValueError: null,
      phoneNumberError: null,
      showResults: false
    };
  }
  addChar(event, value) {
    switch(this.state.currentInput){
      case 'money':
        if (this.state.moneyValue.length < 4)
          this.setState({moneyValue: this.state.moneyValue + value}, this.handleInputChange);
        break;
      case 'phonenumber':
        if (this.state.phoneNumber.length < this.props.phonenumbermask.length)
          this.setState({phoneNumber: this.state.phoneNumber + value}, this.handleInputChange);
        break;
        default:
          break;
    }
  }
  removeLastChar(){
   switch(this.state.currentInput){
      case 'money':
        this.setState({moneyValue: this.state.moneyValue.length ? this.state.moneyValue.slice(0, -1) : this.state.moneyValue }, this.handleInputChange);
        break;
      case 'phonenumber':
        this.setState({phoneNumber: this.state.startWith === this.state.phoneNumber ? this.state.phoneNumber : this.state.phoneNumber.slice(0, -1)}, this.handleInputChange);
        
        break;
      default:
        break;
    }
    ;
  }
  checkMoneyValue(){
    if (parseInt(this.state.moneyValue, 10) > 1000 && parseInt(this.state.moneyValue, 10) < 1) return true;
    return false;
  }
  clearInput(){
    switch(this.state.currentInput){
      case 'money':
        this.setState({moneyValue: ''}, this.handleInputChange);
        break;
      case 'phonenumber':
        this.setState({phoneNumber: '+79'}, this.handleInputChange);
        break;
      default:
        break;
    }
  }
  handleInputChange(){
    let moneyValue = parseInt(this.state.moneyValue, 10);
    if (moneyValue > 1000 || moneyValue < 1) {
      this.setState({moneyValueError: 'Value must be from 1 to 1000'});
    }else{
      this.setState({moneyValueError: null});
    }
    if (this.state.phoneNumber.length < 12) {
      this.setState({phoneNumberError: 'Number not valid'});
    }else{
      this.setState({phoneNumberError: null});
    }

  }
  inputToCurrent(event, value){
    this.setState({currentInput: value});
  }
  pay(event){
  //http request must be here
    let fakePay = function(){
      this.setState(prev => ({showResults: !prev.showResults,
        paymentStatus: Math.random() >= 0.5}));
    }
    setTimeout(fakePay.bind(this), 2000);
  }
  cancel(event){
    this.props.onCancel();
  }
  componentDidMount(){
    this.inputWrapper.querySelector('input').focus();
  }
  render(){
  let result = <div className="text-center">
              <div className={"alert " + (this.state.paymentStatus ? "alert-success" : "alert-danger")} role="alert">
                <h2>Payment {this.state.paymentStatus ? "success!" : "error!"}</h2>
              </div>
              <button type="button" className="btn btn-default btn-lg" onClick={(e) => this.cancel()}>Back</button>
            </div>
  let mainForm = <form>
         <div className="form-group col-sm" ref={r => this.inputWrapper = r}>
            <InputMask mask={"9999"} maskChar=" " value={this.state.moneyValue} className="form-control" 
            onSelect={(e) => this.inputToCurrent(e, 'money')} onChange={(e) => {this.handleInputChange(e)}}/>
             <small className="form-text text-danger">{this.state.moneyValueError}</small>
          </div>
          <div className="form-group col-sm">
            <InputMask mask={this.state.phoneNumberMask} maskChar=" " value={this.state.phoneNumber} className="form-control"
            onSelect={(e) => this.inputToCurrent(e, 'phonenumber')} onChange={(e) => {this.handleInputChange(e)}}/>
            <small className="form-text text-danger">{this.state.phoneNumberError}</small>
          </div>
          <div className="btn-group-vertical btn-group-lg col-sm col-sm">
              <div className="btn-group" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.addChar(e, 1)}>1</button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.addChar(e, 2)}>2</button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.addChar(e, 3)}>3</button>
              </div>
              <div className="btn-group" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.addChar(e, 4)}>4</button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.addChar(e, 5)}>5</button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.addChar(e, 6)}>6</button>
              </div>
              <div className="btn-group" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.addChar(e, 7)}>7</button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.addChar(e, 8)}>8</button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.addChar(e, 9)}>9</button>
              </div>
              <div className="btn-group" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.clearInput(e)}>C</button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.addChar(e, 0)}>0</button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => this.removeLastChar(e)}><i className="oi oi-delete"></i></button>
              </div>
            </div>
            <div className="bg-white clearfix" style={{marginTop: '15px'}}>
              <button type="button" className="btn btn-default btn-lg float-left" onClick={(e) => this.cancel()}>Cancel</button>
              <button type="button" className="btn btn-primary btn-lg float-right" onClick={(e) => this.pay()} disabled={!!this.state.moneyValueError || !!this.state.phoneNumberError}>Pay</button>
            </div>
          </form>
  return(
    <div>{this.state.showResults ? result : mainForm}</div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentOperator: null,
    };
  } 

  toCurrent(event, value){
    this.setState({currentOperator: value});
  }

  createCards(){
    let data = [
      {
        "name": "МТС",
        "logo": "images/mts.png",
        "phonemask": "+7\9999999999"
      },
      {
        "name": "Beeline",
        "logo": "images/beeline.png", 
        "phonemask": "+7\9999999999"
      },
      {
        "name": "Мегафон",
        "logo": "images/megafon.png",
        "phonemask": "+7\9999999999"
      },
      {
        "name": "МТС",
        "logo": "images/mts.png",
        "phonemask": "+7\9999999999"
      },      
    ];

    let createGroupedArray = function(arr, chunkSize) {
        let groups = [], i;
        for (i = 0; i < arr.length; i += chunkSize) {
            groups.push(arr.slice(i, i + chunkSize));
        }
        return groups;
    }
    let lines_of_buttons = createGroupedArray(data, 4).map((buttons_data) =>
      buttons_data.map((button_data) => <OperatorButton key={key++} name={button_data['name']} logo={button_data['logo']} onClick={(e) => this.toCurrent(e, button_data)}/>)
    );
    let card_decks = lines_of_buttons.map((buttons) =>
        <div className="card-deck" style={{paddingTop: '30px'}} key={key++}>
            {buttons}
        </div>
    );
    return card_decks;
  }

  onCancel = (val) => {
    this.toCurrent(null, null)
  }

  render() {
    return (
      <div className="App">
        <div className="container">
        {
          this.state.currentOperator ?
          <div className="col-sm-4 container" style={{marginTop: '15px'}}>
            <img src={this.state.currentOperator.logo} alt="..." className="img-thumbnail"/>
            <div className="align-self-center" style={{marginTop: '15px'}}>
              <InputPanel onCancel={this.onCancel} phonenumbermask={this.state.currentOperator.phonemask} startwith="+7"/>
            </div>
          </div>
          :
          <div>
          {this.createCards()}
          </div>
        }
        </div>
      </div>
    );
  }
}

export default App;
