import React, {Component} from 'react';

export default class ObjectiveQuestionaire extends Component{
    constructor(){
        super();

        this.state = {
            userAnswer: ''
        }

        this.onUserInputAnswerChange = this.onUserInputAnswerChange.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.handleReturnKey = this.handleReturnKey.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.question != this.props.question){
            this.setState({userAnswer: ''});
        } 
    }

    onUserInputAnswerChange(event){
        const value = event.target.value;
        this.setState({userAnswer:value});
    }

    checkAnswer(){
        const isAnswerCorrect = this.props.answer == this.state.userAnswer.toLowerCase();
        if(isAnswerCorrect){
            this.props.correctAnswerHandler();
        }else{
            this.props.incorrectAnswerHandler();
        }
    }

    handleReturnKey(event){
        const returnKeyCode = 'Enter';
        if(event.key == returnKeyCode){
            this.checkAnswer();
        }
    }

    render(){
         return (
            <div className={this.props.className}>
                 <div className="row">
                    <h1 className="text-center">
                        {this.props.question}
                    </h1>
                </div>
                <div className="row form-group">
                    <div className="col-sm-6 col-sm-offset-3">
                        <input type="text" placeholder="Enter Romaji Answer" className="form-control" value={this.state.userAnswer} onChange={this.onUserInputAnswerChange} onKeyPress={this.handleReturnKey} />
                    </div>
                </div>
                <div className="row">
                     <button className="btn btn-primary center-block" onClick={this.checkAnswer}>Submit Answer</button>
                </div>
            </div>
        )
    }
}

ObjectiveQuestionaire.propType = {
    question: React.PropTypes.string.isRequired,
    answer: React.PropTypes.string.isRequired,
    correctAnswerHandler: React.PropTypes.func,
    incorrectAnswerHandler: React.PropTypes.func,
    className: React.PropTypes.string
}
