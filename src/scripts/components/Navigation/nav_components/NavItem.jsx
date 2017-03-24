import React, {PureComponent} from 'react';

export default class NavItem extends PureComponent{
    constructor(props){
        super(props);
        this.getHref = this.getHref.bind(this);
        this.getClassName = this.getClassName.bind(this);
    }

    getHref(){
        if(this.props.to){
            return '#' + this.props.to;
        }
    }

    getClassName(){
        if(this.props.isActive){
            return 'active';
        }
    }

    render(){
        return (
            <li className={this.getClassName()}>
                <a href={this.getHref()}>
                    {this.props.title}
                    {this.props.children}
                </a>
            </li>
        )
    }
}

NavItem.propType = {
    to: React.PropTypes.string,
    title: React.PropTypes.string.isRequired,
    isActive: React.PropTypes.bool
}

NavItem.defaultProps = {
    isActive: false
}