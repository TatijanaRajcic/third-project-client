import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class DraggableItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeDrags: 0,
      originalPosition: {
        x: 0, y: 0
      },
      controlledPosition: {
        x: 0, y: 0
      }
    }

    this.onStart = this.onStart.bind(this)
    this.onStop = this.onStop.bind(this)
    this.onControlledDrag = this.onControlledDrag.bind(this)
    this.onControlledDragStop = this.onControlledDragStop.bind(this)

  }

  onStart() {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop() {
    this.setState({activeDrags: --this.state.activeDrags});
  }

  onControlledDrag(e, position) {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  }

  onControlledDragStop(e, position) {
    this.onControlledDrag(e, position);
    this.onStop();
    this.props.updatePosition(this.props.id,this.state.controlledPosition)
  }

  render() {

    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {originalPosition, controlledPosition} = this.state;

    return (
      <Draggable position={controlledPosition} {...dragHandlers} onStop={this.onControlledDragStop}>
        <div className="oneExhibitionImage">
          <img src={this.props.src} alt=""/>
          <>
            <button className="DeleteBtn" onClick={()=>{this.props.deleteImage(this.props.id)}}>Remove</button>
          </>
        </div>
      </Draggable>
    )
  }
}

