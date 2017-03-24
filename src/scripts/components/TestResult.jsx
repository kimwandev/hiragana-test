import React, {Component} from 'react';

export default class TestResult extends Component{
    constructor(props){
        super(props);
        this.getScore = this.getScore.bind(this);
        this.getAverageTimePerAnswer = this.getAverageTimePerAnswer.bind(this);
    }

    getScore(){
        return 100 * (this.props.numberOfCorrectAnswers / this.props.totalNumberOfItems);
    }

    getAverageTimePerAnswer(){
        return this.props.totalDurationInSeconds/this.props.totalNumberOfItems;
    }

    render(){
        return (
            <div className="center-block form-group">
                <h1 className="text-center text-primary">Results</h1>
                <h2 className="text-primary text-center">
                    Score: {this.getScore()}% <br />
                    Avg. Time: {this.getAverageTimePerAnswer()} seconds <br/>
                    Total Time: {this.props.totalDurationInSeconds}
                </h2>
                <button className="btn btn-success center-block" onClick={this.props.tryAgainHandler}>Try Again</button>
            </div>
        )
    }
}

TestResult.propType = {
    totalDurationInSeconds: React.PropTypes.number.isRequired,
    totalNumberOfItems:React.PropTypes.number.isRequired,
    numberOfCorrectAnswers: React.PropTypes.number.isRequired,
    tryAgainHandler: React.PropTypes.func.isRequired
}

