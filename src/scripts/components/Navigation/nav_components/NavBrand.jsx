import React, {PureComponent} from 'react';

export default class NavBrand extends PureComponent{
    constructor(props){
        super(props);
        this.getHref = this.getHref.bind(this);
    }

    getHref(){
        if(this.props.to){
            return '#' + this.props.to;
        }
    }

    render(){
        return (
            <a className="navbar-brand" href={this.getHref}>
                {this.props.title}
                {this.props.children}
            </a>
        )
    }
}

NavBrand.propType = {
    to: React.PropTypes.string,
    title: React.PropTypes.string.isRequired,
}