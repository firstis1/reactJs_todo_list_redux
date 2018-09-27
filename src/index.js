import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const orgState = {
	name: '',
	buttonName: 'Add Todo',
	editId: 0,
	filterStatus: 'SHOW_ALL',
    items: [
	   {
		   id: 1,
		   name: 'Today todo',
		   disabledFeatures: false,
		   completed: true},
	   {
		   id: 2,
		   name: 'Tomorrow todo',
		   disabledFeatures: false,
		   completed: false}
	]
};

var reducer = (state = orgState, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				...state,
				items: state.items.concat(
					{
						id: Date.now(),
						name: action.name,
						disabledFeatures: false,
						completed: false
					}
				),
				name: ''				
			}
		case 'TOGGLE_TODO':
			return {				
				...state,
				items: state.items.map(todo =>
				(todo.id === action.id)
				? {...todo, completed: !todo.completed}
				: todo)
			}
		case 'EDIT_TODO':
			let index = state.items.findIndex(x => x.id === action.id);
			if (index === -1) {
				return state
			} else {
				return {				
					...state,
					items: state.items.map(todo =>
						(todo.id === action.id)
						? {...todo, disabledFeatures: !todo.disabledFeatures}
						: {...todo, disabledFeatures: false}),					
					name: state.items[index].name,
					editId: state.items[index].id,
					buttonName: 'Save Todo'
				}
			}
		case 'DELETE_TODO':
			let filteredItems = state.items.filter(function (item) {
					return (item.id !== action.id);
				});			 
			return {
				...state,
				items: filteredItems
			}
		case 'SAVE_TODO':			
			return {
				...state,
				items: state.items.map(todo =>
					(todo.id === state.editId)
					? {...todo, name: action.name, disabledFeatures: false}
					: todo),
				name: '',
				editId: 0,				
				buttonName: 'Add Todo'
			}
		case 'FILTER_SHOW_ALL':
			return { ...state, filterStatus: 'SHOW_ALL' }
		case 'FILTER_COMPLETED':
			return { ...state, filterStatus: 'COMPLETED' }
		case 'FILTER_ACTIVE':
			return { ...state, filterStatus: 'ACTIVE' }
		default:
			return state
	}
	
};

const store = createStore(reducer);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('root')
);
