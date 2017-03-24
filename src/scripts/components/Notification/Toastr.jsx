import React, {Component} from 'react';

export default class Toastr extends Component {
    constructor(){
        super();

        this.state = {
            message : 'toaster',
            className: '',
        }
    }

    componentWillMount(){
        this.setState({className: 'toaster-container animated hidden'});
    }

    componentWillReceiveProps(nextProps){
        // let shouldNotShow = !nextProps.shouldShow;
        if(nextProps.shouldShow){
            this.setState({className: 'toaster-container animated fadeIn'});
        } else{
            this.setState({className: 'toaster-container animated fadeOut'});
            setTimeout(() => this.setState({className: 'toaster-container animated hidden'}), 800);
        }
    }

    render(){
        return (
            <div className={this.state.className}>
                Toaster {this.state.message}
            </div>
        )
    }
}

Toastr.propType={
    shouldShow: React.PropTypes.bool.isRequired
}
