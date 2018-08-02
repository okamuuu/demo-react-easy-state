import React, { Component } from 'react';
import Board from './Board';
import Box from './Box';
import Piece from './Piece';

class Game extends Component {
  render() {
    return (
      <div style={{padding: "15px"}}>
        <Board>
          <Box><Piece /></Box>
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Board>
      </div>
    );  
  }
}

export default Game;
