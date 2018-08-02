import _ from 'lodash';
import React, { Component } from 'react';
import Board from './Board';
import Box from './Box';
import Piece from './Piece';

import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const DndBoard = DragDropContext(HTML5Backend)(Board);

const dropTarget = {
  drop(props, monitor) {
    const { position } = props;
    return {};
  },
  canDrop(props, monitor) {
    const { position } = props;
    return true;
  }
};

const ConnectedTarget = props => {
  const {canDrop, children, connectDropTarget} = props;
  return (
    <Box {...props} innerRef={instance=>connectDropTarget(instance)}>{children}</Box>
  )
}

const DndBox = DropTarget(Types.PIECE, dropTarget, (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
}})(ConnectedTarget);
 
const dragSource = {
  beginDrag(props, monitor, component) {
    return {};
  },
  endDrag(props) {
    return {};
  }
};

const ConnectedSource = props => {
  const {connectDragSource} = props;
  return (<Piece {...props} innerRef={instance=>connectDragSource(instance)}></Piece>)
}

const DndPiece = DragSource(Types.PIECE, dragSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(ConnectedSource);

class Game extends Component {

  constructor(props) {
    super(props)
    this.state = { position: 0 }
  }

  render() {
    const boxes = _.times(9, n => {
      const piece = this.state.position === n ? <Piece /> : null;
      return (<Box onClick={() => this.setState({position: n})} key={n} position={n}>{piece}</Box>)
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
