import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import MainMenuBar from './components/Navigation/MainMenuBar.jsx';
import Home from './modules/Home.jsx';
import Hiragana from './modules/Hiragana.jsx';
import Toastr from './components/Notification/Toastr.jsx';
import ToastrStore from '../_store/ToastrStore.js';
import '../styles/global.less';

class Routes extends Component{
    constructor(){
        super();

        this.state = {
            shouldShowToastr:false
        }
    };

    componentWillMount(){
        ToastrStore.on('change', () => {
            this.setState({shouldShowToastr:true});
            setTimeout(() => this.setState({shouldShowToastr:false}), 5000);
        });
    }

    render(){
        return (
            <Router>
                <div>
                    <Toastr shouldShow={this.state.shouldShowToastr} />
                    <MainMenuBar />
                    <Route exact path="/" component={Home} />
                    <Route path="/Hiragana" component={Hiragana} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <Routes />, 
    document.getElementById('root')
)