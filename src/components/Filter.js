import React, { Component } from 'react';
import { connect } from 'react-redux';

class Filter extends Component{
	buttonStyled(status){
		const { filterStatus } = this.props;
		if (status === filterStatus) return { marginLeft: '4px', color: 'red', fontWeight: 'bold'};
		return { marginLeft: '6px', color: 'green' };
	}

	setFilterStatus(actionType){
		this.props.dispatch({ type: actionType })
	}
	render(){
		return (
	    	<div>
			    <span>Filter: </span>
			    <button onClick={() => this.setFilterStatus('FILTER_SHOW_ALL')} style={this.buttonStyled('SHOW_ALL')}>
			      All
			    </button>
			    <button onClick={() => this.setFilterStatus('FILTER_COMPLETED')} style={this.buttonStyled('COMPLETED')}>
			      Completed
			    </button>
			    <button onClick={() => this.setFilterStatus('FILTER_ACTIVE')} style={this.buttonStyled('ACTIVE')}>
			      Active
			    </button>
			</div>
	    );
	}
}

function mapStateToProps(state){
	  return {
		  filterStatus: state.filterStatus
	  };
}

export default connect(mapStateToProps)(Filter);
