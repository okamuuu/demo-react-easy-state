import React, { Component } from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // これを変化させる
  }

  render() {
    return (
      <div>
        <div>{ this.state.count }</div>
        <button onClick={ () => this.setState({count: this.state.count + 1})}>click me</button>
      </div>
    );
  }
}
