import React, {Component} from 'react';
import NavItem from './nav_components/NavItem.jsx';
import NavBrand from './nav_components/NavBrand.jsx';
import {Link} from 'react-router-dom';

export default class MainMenuBar extends Component{
    constructor(){
        super();
    }

    render(){
        return (
            <nav className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <NavBrand>JP+</NavBrand>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/Hiragana">Hiragana</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}