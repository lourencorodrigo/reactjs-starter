import React, { Component } from 'react';

import styles from './App.css';

class App extends Component {
  render() {
    const title = 'React';
    return (
      <h1 className={styles.title}>Welcome to {title}</h1>
    );
  }
}

export default App;
