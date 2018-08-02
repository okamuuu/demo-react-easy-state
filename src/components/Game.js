import _ from 'lodash';
import React, { Component } from 'react';
import Board from './Board';
import Box from './Box';
import Piece from './Piece';

import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { store, view } from 'react-easy-state';

const state = store({ position: 0 });

function move(position) {
  if (canMove(position)) {
    state.position = position;
  }
}

const Types = {
  PIECE: 'piece'
};

const DndBoard = DragDropContext(HTML5Backend)(Board);

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

const dropTarget = {
  drop(props, monitor) {
    const { position } = props;
    state.position = position;
    return {};
  },
  canDrop(props, monitor) {
    const { position } = props;
    console.log(props);
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
 
class Game extends Component {

  render() {
    const dndBoxes = _.times(9, n => {
      const piece = state.position === n ? <DndPiece /> : null;
      return (<DndBox onClick={() => move(n)} key={n} position={n}>{piece}</DndBox>)
    })

    return (
      <div style={{padding: "15px"}}>
        <DndBoard>
          {dndBoxes}
        </DndBoard>
      </div>
    );  
  }
}

export default view(Game);
