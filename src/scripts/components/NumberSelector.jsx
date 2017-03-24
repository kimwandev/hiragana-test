import React, {Component} from 'react';

export default class NumberSelector extends Component{
    constructor(props){
        super(props);

        this.state = {
            userInputItemNumbers: ''
        }

        this.submitNumber = this.submitNumber.bind(this);
        this.onUserInputItemNumbersChange = this.onUserInputItemNumbersChange.bind(this);
    }

    submitNumber(){
        this.props.submitHandler(this.state.userInputItemNumbers);
    }

    onUserInputItemNumbersChange(event){
        const value = event.target.value;
        this.setState({userInputItemNumbers:value})
    }


    render(){
        return (
            <div className={this.props.className}>
                <label className="control-label">{this.props.label}</label>
                <input type="number" 
                    value={this.state.userInputItemNumbers} 
                    className="form-control" 
                    placeholder={this.props.placeholder}
                    onChange={this.onUserInputItemNumbersChange} />
                <button className="btn btn-primary btn-block" onClick={this.submitNumber}>Submit</button>
            </div>
        )
    }
}

NumberSelector.propType = {
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    submitHandler: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
}

