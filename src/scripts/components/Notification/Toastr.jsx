import React, {Component} from 'react';

export default class Toastr extends Component {
    constructor(){
        super();

        this.state = {
            message : 'toaster',
            className: ''
        }
    }

    componentWillMount(){
        this.setState({className: 'toaster-container animated fadeIn'})
    }

    componentWillReceiveProps(nextProps){
        // let shouldNotShow = !nextProps.shouldShow;
        // if(shouldNotShow){
        //     this.setState({className: 'toaster-container animated fadeOut'});
        // }
    }

    render(){
        if(this.props.shouldShow){
            return (
                <div className={this.state.className}>
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
