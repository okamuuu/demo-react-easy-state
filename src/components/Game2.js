import _ from 'lodash';
import React, { Component } from 'react';
import Board from './Board';
import Box from './Box';
import Piece from './Piece';

class Game extends Component {

  constructor(props) {
    super(props)
    this.state = { position: 0 }
  }

  move(n) {
    this.setState({position: n})
  }

  render() {
    const boxes = _.times(9, n => {
      const piece = this.state.position === n ? <Piece /> : null;
      return (<Box onClick={() => this.move(n).bind(this)} key={n} position={n}>{piece}</Box>)
    })

    return (
      <div style={{padding: "15px"}}>
        <Board>
          {boxes}
        </Board>
      </div>
    );  
  }
}

export default Game;
