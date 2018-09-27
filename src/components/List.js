import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
	getItems () {
		const { filterStatus, items } = this.props;		
		if (filterStatus === 'COMPLETED') return items.filter(item => item.completed);
		if (filterStatus === 'ACTIVE') return items.filter(item => !item.completed);
		return items;
	}

	editTodo (id) {
		this.props.dispatch({
			type: 'EDIT_TODO',
			id: id
		})
	}
	deleteTodo (id) {
		this.props.dispatch({
			type: 'DELETE_TODO',
			id: id
		})
	}
	render(){
		const itemsShow = this.getItems();
		return  (
			<ul>{itemsShow.map((obj, index) => <li key={index}><span style={{ textDecorationLine: obj.completed ? 'line-through': 'none' }}>{obj.name}</span>
			<button disabled={obj.disabledFeatures} onClick={() => this.editTodo(obj.id)}>Edit Todo</button>
			<button disabled={obj.disabledFeatures} onClick={() => {
				this.props.dispatch({
					type: 'TOGGLE_TODO',
					id: obj.id
				})
			}}>{obj.completed ? 'Open': 'Close'}</button>
			<button disabled={obj.disabledFeatures} onClick={() => this.deleteTodo(obj.id)}>Delete Todo</button></li>)}</ul>
		);
	}
}
function mapStateToProps(state){
	return {
		filterStatus: state.filterStatus,
		items: state.items
	};
}

export default connect(mapStateToProps)(List);
