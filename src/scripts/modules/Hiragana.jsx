import React, {Component} from 'react';
import * as hiraganaService from '../../_services/hiragana.service.js';
import ObjectiveQuestionaire from '../components/ObjectiveQuestionaire.jsx';
import Alert from '../components/Notification/Alert.jsx';
import NumberSelector from '../components/NumberSelector.jsx';
import TestResult from '../components/TestResult.jsx';

export default class Hiragana extends Component{
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
            currentItemNumber: 0,
            currentView: '',
            views: {
                numberOfItemsSelection: 'numberOfItemsSelection',
                hiraganaTestView: 'hiraganaTestView',
                resultsView: 'resultsView'
            },
            numberOfCorrectAnswers: 0, 
            timer: 0,
            timerInstance: null
        }

        this.onUserAnswerCorrectly = this.onUserAnswerCorrectly.bind(this);
        this.onUserAnswerIncorrectly = this.onUserAnswerIncorrectly.bind(this);
        this.fetchNewHiragana = this.fetchNewHiragana.bind(this);
        this.renderNotification = this.renderNotification.bind(this);
        this.renderHiraganaTest = this.renderHiraganaTest.bind(this);
        this.showAnswerNotificationFeedback = this.showAnswerNotificationFeedback.bind(this);
        this.shouldShowView = this.shouldShowView.bind(this);
        this.selectNumberOfItems = this.selectNumberOfItems.bind(this);
        this.resetTest = this.resetTest.bind(this);
    }

    componentWillMount(){
        this.setState({currentView: this.state.views.numberOfItemsSelection});
        this.fetchNewHiragana();
    }

    resetTest(){
        this.setState({numberOfItems: 0, currentView: this.state.views.numberOfItemsSelection, userInputItemNumbers: '', numberOfCorrectAnswers: 0, timer: 0});
    }

    showAnswerNotificationFeedback(isCorrect){
        const currentItemNumber = this.state.currentItemNumber + 1;

        if(isCorrect){
            const numberOfCorrectAnswers = this.state.numberOfCorrectAnswers + 1;
            this.setState({numberOfCorrectAnswers: numberOfCorrectAnswers})
        }

        const isTestFinish = currentItemNumber == this.state.numberOfItems;

        if(isTestFinish){
            clearInterval(this.state.timerInstance);
            setTimeout(() => {
                this.setState({currentView:this.state.views.resultsView})
            }, 2000);
        }
        else{
            if(this.state.notificationTimeoutInstance){
                clearTimeout(this.state.notificationTimeoutInstance);
            }

            const timeoutInstance = setTimeout(() => {
                this.setState({shouldShowNotification:false});
            }, 4000);

            this.setState({shouldShowNotification:true, isAnswerCorrect: isCorrect, notificationTimeoutInstance: timeoutInstance, currentItemNumber: currentItemNumber});

            this.fetchNewHiragana();
        }
    }

    onUserAnswerCorrectly(){
        this.showAnswerNotificationFeedback(true);
    }

    onUserAnswerIncorrectly(){
        let questionaireClass = 'form-group animated shake';

        this.setState({correctAnswer: this.state.currentHiraganaItem.romaji, questionaireClass: questionaireClass});

        setTimeout(() => {
            this.setState({questionaireClass:'form-group animated'});
        }, 1000);

        this.showAnswerNotificationFeedback(false);
    }

    fetchNewHiragana(){
        const hiraganaItem = hiraganaService.getRandomHiraganaItem();
        this.setState({currentHiraganaItem:hiraganaItem});
    }

    selectNumberOfItems(numberOfItems){
        if(numberOfItems > 0){
            const timerInstance = setInterval(() => {
                const timer = this.state.timer + 1;
                this.setState({timer:timer});
            }, 1000)
            this.setState({
                numberOfItems:numberOfItems, 
                currentItemNumber: 0, 
                currentView: this.state.views.hiraganaTestView, 
                timerInstance: timerInstance
            });
        }
    }

    shouldShowView(view){
        if(this.state.currentView == view){
            return true;
        }
        return false;
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
        if(this.shouldShowView(this.state.views.numberOfItemsSelection)){
            return (
                <div>
                    <br />
                    <NumberSelector 
                        className="col-sm-4 col-sm-offset-4 form-group" 
                        label="Please select number of items" 
                        placeholder="Enter Number of Items"
                        submitHandler={this.selectNumberOfItems}  />
                </div>
            )
        } else if(this.shouldShowView(this.state.views.hiraganaTestView)) {
            return (
                <div>
                    <ObjectiveQuestionaire 
                        className={this.state.questionaireClass} 
                        question={this.state.currentHiraganaItem.character} 
                        answer={this.state.currentHiraganaItem.romaji} 
                        correctAnswerHandler={this.onUserAnswerCorrectly} 
                        incorrectAnswerHandler={this.onUserAnswerIncorrectly} />
                    <div className="text-center text-muted">
                        {this.state.timer}.0s
                    </div>
                </div>
            )
        } else if(this.shouldShowView(this.state.views.resultsView)){
            return (
                <TestResult 
                    totalDurationInSeconds={this.state.timer}
                    totalNumberOfItems={this.state.numberOfItems}
                    numberOfCorrectAnswers={this.state.numberOfCorrectAnswers}
                    tryAgainHandler={this.resetTest} />
            );
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
