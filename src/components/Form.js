import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component{
	constructor(props){
		super(props);		
		this.state = {			
			name: ''
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e){
		e.preventDefault();		
		if (this.props.buttonName === 'Add Todo') {
			this.props.dispatch({
				type: 'ADD_TODO',
				name: this.state.name
			})
			this.setState({ name: '' });
		} else {
			this.props.dispatch({
				type: 'SAVE_TODO',
				name: this.state.name
			})
		}

	}

	onChange = (event) => {
    	this.setState({ name: event.target.value });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ name: nextProps.name });
	}


	render(){
		return (
		    <div>
		    	<form className="App" onSubmit={this.onSubmit}>
			        <input value={this.state.name} onChange={this.onChange} />
			        <button>{this.props.buttonName}</button>
		        </form>        
		    </div>
    	);
	}
}

function mapStateToProps(state){
	return {
		name: state.name,
		buttonName: state.buttonName
	};
}

export default connect(mapStateToProps)(Form);
