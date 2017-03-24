import React, {Component} from 'react';

export default class Toastr extends Component {
    constructor(){
        super();

        this.state = {
            message : 'toaster'
        }
    }

    render(){
        if(this.props.shouldShow){
            return (
                <div className="toaster-container">
                    Toaster {this.state.message}
                </div>
            )
        }

        return null;
    }
}

Toastr.propType={
    shouldShow: React.PropTypes.bool.isRequired
}
