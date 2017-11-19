import React, { Component } from 'react';
import CanvasBoard from '../component/CanvasBoard';
import InputList from '../component/InputList';
import logo from './logo.svg';
import leftShow1 from './leftExample/leftShow_01.png';
import leftShow2 from './leftExample/leftShow_02.png';
import leftShow3 from './leftExample/leftShow_03.png';
import leftShow4 from './leftExample/leftShow_04.png';
import leftShow5 from './leftExample/leftShow_05.png';
import leftShow6 from './leftExample/leftShow_06.png';
import './App.css';

class App extends Component {
	static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {
      equationContent:[],
      color:[],
      resetClick:false,
      liItem:[],
      num : 0
    }
    this.isShowLeftExample = [false,false,false,false,false,false]
    this.exampleOrder = []
	}

  addLi (e) {
    if (this.state.num > 5) {return;}
    this.state.liItem.push(this.state.num);
    this.setState({
      num : this.state.num+1
    })
  }

  pushEquation (eq,co) {
    var exampleIndex = this.state.equationContent.push(eq);
    this.setState({
      equationContent : this.state.equationContent
    })
    this.state.color.push(co);
    this.setState({
      color : this.state.color
    })
    return exampleIndex;
   }

   clearAllLine(){
    this.setState({
      equationContent:[],
      color:[],
      resetClick : true,
      num:0,
      liItem:[]
    })
   }

   leftExampleHandle(eq,co,isShow,order){
    if(!isShow){
      this.exampleOrder[order-1] = this.pushEquation(eq,co)-1;
      this.isShowLeftExample[order-1] = true;
    }else{
      this.isShowLeftExample[order-1] = false;
      this.state.equationContent.splice(this.exampleOrder[order-1],1);
      this.setState({
        equationContent : this.state.equationContent
      })
      this.state.color.splice(this.exampleOrder[order-1],1);
      this.setState({
        color : this.state.color
      })
    }
   }

   componentDidMount(req) {
    // document.onkeydown = function(){
    //   return false;
    // }
   }  


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="86" height="500"/>
          <h2>函数编辑器</h2>
        </div>
        <div className="App-content">
          <div className="left-show">
            <img src={leftShow1} alt="photo1" onClick={this.leftExampleHandle.bind(this,'x','black',this.isShowLeftExample[0],1)}/>
            <img src={leftShow2} alt="photo2" onClick={this.leftExampleHandle.bind(this,'x*x','black',this.isShowLeftExample[1],2)}/>
            <img src={leftShow3} alt="photo3" onClick={this.leftExampleHandle.bind(this,'5/(x-1)','black',this.isShowLeftExample[2],3)}/>
            <img src={leftShow4} alt="photo4" onClick={this.leftExampleHandle.bind(this,'pow(2,x)','black',this.isShowLeftExample[3],4)}/>
            <img src={leftShow5} alt="photo5" onClick={this.leftExampleHandle.bind(this,'log(2,x)','black',this.isShowLeftExample[4],5)}/>
            <img src={leftShow6} alt="photo6" onClick={this.leftExampleHandle.bind(this,'5*sin(x)','black',this.isShowLeftExample[5],6)}/>
          </div>
          <CanvasBoard eqArr={this.state.equationContent}
            color={this.state.color} clearAll={this.clearAllLine.bind(this)}/> 
          <InputList addEq={this.pushEquation.bind(this)} resetClick={this.state.resetClick} 
            num={this.state.num} liItem={this.state.liItem} addLi={this.addLi.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
