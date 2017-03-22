import React, {Component} from 'react';

export default class Alert extends Component{
    constructor(){
        super();

        this.getAlertClass = this.getAlertClass.bind(this);
    }

    getAlertClass(){
        let className = 'alert alert-dismissible alert-' + this.props.type;
        return className;
    }

    render(){
         return (
            <div className={this.getAlertClass()}>
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                {this.props.message}
            </div>
        )
    }
}

Alert.propType = {
    type: React.PropTypes.string,
    message: React.PropTypes.string
}

Alert.defaultProps = {
    type : 'success',
    message: 'success'
}
