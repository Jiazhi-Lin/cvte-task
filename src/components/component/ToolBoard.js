import React, { Component } from 'react';
import './ToolBoard.css';

class ToolBoard extends Component {
  static defaultProps = {      
  }

  constructor(props) {
    super(props);
    this.state = {
      showGrid : false
    }
  }

  showGridFn () {
    this.setState({
      showGrid : !this.state.showGrid
    })
    this.props.grid(this.state.showGrid);
  }

  render() {
    return (
      <div>
        <div id="tool">
          <div id="grid" onClick={this.showGridFn.bind(this)}></div>
          <div id="reset" onClick={this.props.reset}></div>
          <div id="bigger" onClick={this.props.scale.bind(this,1.2)}></div>
          <div id="smaller" onClick={this.props.scale.bind(this,0.9)}></div>
        </div>
      </div>
    );
  }
}

export default ToolBoard;