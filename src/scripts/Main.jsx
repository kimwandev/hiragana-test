import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as hiraganaService from '../_services/hiragana.service.js';
import ObjectiveQuestionaire from './components/ObjectiveQuestionaire.jsx';
import Alert from './components/Notification/Alert.jsx';

class Main extends Component{
    constructor(){
        super();

        this.state = {
            currentHiraganaItem: null,
            shouldShowNotification: false,
            isAnswerCorrect: false,
            notificationTimeoutInstance: null,
            correctAnswer: '',
            questionaireClass: 'form-group animated',
            numberOfItems: null,
            userInputItemNumbers: ''
        }

        this.onUserAnswerCorrectly = this.onUserAnswerCorrectly.bind(this);
        this.onUserAnswerIncorrectly = this.onUserAnswerIncorrectly.bind(this);
        this.fetchNewHiragana = this.fetchNewHiragana.bind(this);
        this.renderNotification = this.renderNotification.bind(this);
        this.renderHiraganaTest = this.renderHiraganaTest.bind(this);
        this.onUserInputItemNumbersChange = this.onUserInputItemNumbersChange.bind(this);
    }

    componentWillMount(){
        this.fetchNewHiragana();
    }

    onUserAnswerCorrectly(){
        if(this.state.notificationTimeoutInstance){
            clearTimeout(this.state.notificationTimeoutInstance);
        }

        const timeoutInstance = setTimeout(() => {
            this.setState({shouldShowNotification:false});
        }, 4000);

        this.setState({shouldShowNotification:true, isAnswerCorrect: true, notificationTimeoutInstance: timeoutInstance});
        this.fetchNewHiragana();
    }

    onUserAnswerIncorrectly(){
        if(this.state.notificationTimeoutInstance){
            clearTimeout(this.state.notificationTimeoutInstance);
        }

        let questionaireClass = 'form-group animated shake';

        const timeoutInstance = setTimeout(() => {
            this.setState({shouldShowNotification:false});
        }, 3000);

        this.setState({shouldShowNotification:true, isAnswerCorrect:false, notificationTimeoutInstance: timeoutInstance, correctAnswer: this.state.currentHiraganaItem.romaji, questionaireClass: questionaireClass});

        setTimeout(() => {
            this.setState({questionaireClass:'form-group animated'});
        }, 1000);

        this.fetchNewHiragana();
    }

    fetchNewHiragana(){
        const hiraganaItem = hiraganaService.getRandomHiraganaItem();
        this.setState({currentHiraganaItem:hiraganaItem});
    }

    onUserInputItemNumbersChange(event){
        const value = event.target.value;
        this.setState({onUserInputItemNumbersChange:value})
    }

    renderNotification(){
        if(this.state.shouldShowNotification){
            if(this.state.isAnswerCorrect){
                return (
                    <div className="col-sm-offset-4 col-sm-4 text-center">
                        <Alert type="success" message="Correct" />
                    </div>
                )
            }
            else{
                let message = 'Answer is incorrect the correct answer is "' + this.state.correctAnswer + '"';
                return (
                    <div className="col-sm-offset-4 col-sm-4 text-center">
                        <Alert type="danger" message={message} />
                        <h1 className="text-danger">"{this.state.correctAnswer}"</h1>
                    </div>
                )
            }
            
        }
    }

    renderHiraganaTest(){
        if(true){
            return (
                <div>
                    <ObjectiveQuestionaire 
                        className={this.state.questionaireClass} 
                        question={this.state.currentHiraganaItem.character} 
                        answer={this.state.currentHiraganaItem.romaji} 
                        correctAnswerHandler={this.onUserAnswerCorrectly} 
                        incorrectAnswerHandler={this.onUserAnswerIncorrectly} />
                </div>
            )
        }else{
            return (
                <div>
                    <br />
                    <div className="col-sm-4 col-sm-offset-4 form-group">
                        <label className="control-label">Please select number of items</label>
                        <input type="number" 
                            value={this.state.userInputItemNumbers} 
                            className="form-control" 
                            placeholder="Enter Number of Items"
                            onChange={this.onUserInputItemNumbersChange} />
                        <button className="btn btn-primary btn-block">Submit</button>
                    </div>
                </div>
            )
        }
    }

    render(){
         return (
            <div className="container">
                <h1 className="text-center">Hiragana Proficiency Test</h1>
                {this.renderHiraganaTest()}
                
                {this.renderNotification()}
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));