import React, { Component } from 'react';
import KeyBoard from './KeyBoard';
import './InputList.css'
import add from './img/add.PNG';
import kb from './img/keyB.png';

class InputList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      color : ['#912CEE','#FF0000','#00EE00','#1C86EE','#919191','#8B6508'],
      showBoard:false,
      inputs:null
    };
  }

  showKeyBorad (e) {
    this.setState({
      showBoard : !this.state.showBoard
    })
    this.forceUpdate()
    this.inputs.focus();
  }

  componentDidUpdate(req) {
    // this.inpute.onmousedown = function(){return false;}
  }

  render() {
    return (
    	<div className="Input-List">
        <div id="inputArea">
          <ul id="addUl">
            {
              this.props.liItem.map((val,ind)=>{
                return  <li key={ind}>
                  <p className="temp1">表达式 {val+1}</p>
                  <p><span className="temp2">y = </span><span className="formula"><input className="content" ref={(input) => this.inpute = this.inputs = input}/> 
                  <img src={kb} className="keyboard" data-index={val} onClick={this.showKeyBorad.bind(this)} alt={val}/></span></p>
                  </li>
              })
            }
          </ul>
          <div id="add">
            <img src={add} id="addLi" onClick={this.props.addLi} alt='add'/> 增加表达式 
            <span className="num" id="num"> {this.props.num}</span>
            <span> / 6</span>
          </div>
        </div>
        <KeyBoard position={this.props.num} show={this.state.showBoard} changeShow={this.showKeyBorad.bind(this)}
          inputs={this.inputs} addEq={this.props.addEq} color={this.state.color[this.props.num-1]}></KeyBoard>
    	</div>
    );
  }
}

export default InputList;