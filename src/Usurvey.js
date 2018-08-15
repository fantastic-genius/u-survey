import React, {Component} from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyCpZbQzrXONOX1XYkLGiOSTOqBiLMY2Fqo",
    authDomain: "usurvey-646e9.firebaseapp.com",
    databaseURL: "https://usurvey-646e9.firebaseio.com",
    projectId: "usurvey-646e9",
    storageBucket: "usurvey-646e9.appspot.com",
    messagingSenderId: "34901534828"
  };
  firebase.initializeApp(config);

class Usurvey extends Component {
  nameSubmit(event){
    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, function(){
      console.log(this.state);
    });
  }
  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmitted = this.questionSubmitted.bind(this);
  }

  answerSelected(event){
    var answers = this.state.answers;
    if(event.target.name === 'answer1'){
      answers.answer1 = event.target.value;
    }else if(event.target.name === 'answer2'){
      answers.answer2 = event.target.value;
    }else if(event.target.name === 'answer3'){
      answers.answer3 = event.target.value;
    }

    this.setState({answers}, function(){
      console.log(this.state);
    });

  }

  questionSubmitted(){
    firebase.database().ref('uSurvey/' + this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });

    this.setState({isSubmitted: true});
  }

  render(){
    var studentName;
    var questions;
    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div>
        <h1>Hey student, pls let us know your name: </h1>
        <form onSubmit={this.nameSubmit}>
          <input className="namy" type="text" placeholder="Enter your name" ref="name" />
        </form>
      </div>;
      questions = '';
    }else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
      studentName = <h1>Welcome to U-Survey, {this.state.studentName}</h1>;
      questions = <div>
        <h2>Here are some questions: </h2>
        <form onSubmit={this.questionSubmitted}>
          <div className="card">
            <label>What kind of course do you like the most: </label> <br />
            <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} /> Technology
            <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} /> Design
            <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} /> Marketing
          </div>
          <div className="card">
            <label>You are a: </label> <br />
            <input type="radio" name="answer2" value="student" onChange={this.answerSelected} /> Student
            <input type="radio" name="answer2" value="in-job" onChange={this.answerSelected} /> In job
            <input type="radio" name="answer2" value="looking-job" onChange={this.answerSelected} /> Looking for job
          </div>
          <div className="card">
            <label>Is online learning helpful: </label> <br />
            <input type="radio" name="answer3" value="yes" onChange={this.answerSelected} /> Yes
            <input type="radio" name="answer3" value="no" onChange={this.answerSelected} /> No
            <input type="radio" name="answer3" value="may-be" onChange={this.answerSelected} /> May be
          </div>
          <input type="submit" className="feedback-button" value="submit"/>
        </form>
      </div>;
    }else if (this.state.studentName !== '' && this.state.isSubmitted === true) {
      studentName = <h1>Thanks, {this.state.studentName}</h1>
    }

    return(
      <div>
        {studentName}
        --------------------------------------------------
        {questions}
      </div>
    );
  }
}

export default Usurvey;
