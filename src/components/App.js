import React, { Component } from 'react';
import './App.css';
import Filter from './Filter';
import Form from './Form';
import List from './List';

class App extends Component {  
  render() {
    return (
      <div>
      	<Filter />
        <Form />
        <List />
      </div>
    );
  }
}

export default App;
