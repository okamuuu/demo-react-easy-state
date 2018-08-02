import _ from 'lodash';
import React, { Component } from 'react';
import Board from './Board';
import Box from './Box';
import Piece from './Piece';

import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { store, view } from 'react-easy-state';

const state = store({ position: 0 });

const DndBoard = DragDropContext(HTML5Backend)(Board);

const dropTarget = {
  drop(props, monitor) {
    const { position } = props;
    console.log(state, position);
    state.position = position;
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

const DndBox = DropTarget('piece', dropTarget, (connect, monitor) => {
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

const DndPiece = DragSource('piece', dragSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(ConnectedSource);

class Game extends Component {

  render() {
    const boxes = _.times(9, n => {
      const piece = state.position === n ? <DndPiece /> : null;
      return (<DndBox key={n} position={n}>{piece}</DndBox>)
    })

    return (
      <div style={{padding: "15px"}}>
        <DndBoard>
          {boxes}
        </DndBoard>
      </div>
    );  
  }
}

export default view(Game);
