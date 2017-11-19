import React, { Component } from 'react';
import './KeyBoard.css';
import back from './images/as-34.png';
import pi from './images/as-3_12.png';
import log from './images/as-3_14.png';
import ln from './images/as-3_16.png';
import sure from './images/as-58.png';
import yx from './images/as-3_22.png';
import xgy from './images/as-45.png';
import xg2 from './images/as-56.png';
import xy from './images/as-3_27.png';
import abs from './images/as-3_36.png';
import xcy from './images/as-3_35.png';
import left from './images/as-left.png';
import right from './images/as-right.png';


class KeyBoard extends Component {
  static defaultProps = { 
    position:-1    
  }

  constructor(props) {
    super(props);
    this.equationContent = []
    this.pos = 0
    this.right = []
  }

  keyClick (e){
    var point = e.target;
    var cacheEquation = this.props.inputs;
    if (point.tagName === 'IMG') {
      point = e.target.parentNode;
    }
    if (point.dataset.info) {
      cacheEquation.focus();
      switch(point.dataset.info){
        case 'sin()':
          w.bind(this)(5);
        break;
        case 'cos()':
          w.bind(this)(5);
        break;
        case 'tan()':
          w.bind(this)(5);
        break;
        case 'back':
          if (this.pos == 0) {break;}
          this.pos--;
          this.equationContent.splice(this.pos,1);
          cacheEquation.value = this.equationContent.join('');
          cacheEquation.setSelectionRange(this.pos,this.pos);
        break;
        case 'log(,)':
          w.bind(this)(6);
        break;
        case 'ln()':
          w.bind(this)(4);
        break;
        case 'sure':
          this.props.addEq(cacheEquation.value,this.props.color);
          cacheEquation.parentNode.removeChild(cacheEquation.nextElementSibling);
          this.key.style.display = 'none';
          this.props.changeShow();
          cacheEquation.parentNode.style.border = 'none';
          cacheEquation.style.color = cacheEquation.parentNode.parentNode.style.color = this.props.color;
          cacheEquation.blur();
        break;
        case 'pow(,x)':
          w.bind(this)(7);
        break;
        case 'sqrts(,)':
          w.bind(this)(7);
        break;
        case 'sqrt()':
          w.bind(this)(6);
        break;
        case 'pow(x,)':
          w.bind(this)(7);
        break;
        case 'abs()':
          w.bind(this)(4);
        break;
        case 'x/y':
          alert('这是除法 直接用 /')
        break;
        case 'left':
          if (this.pos == 0) {break;}
          this.pos--;
          cacheEquation.setSelectionRange(this.pos,this.pos);
        break;
        case 'right':
          if (this.pos >= cacheEquation.value.length) {break;}
          this.pos++;
          cacheEquation.setSelectionRange(this.pos,this.pos);
        break;
        default:
          w.bind(this)();
      }
      function w(p){
        this.right = this.equationContent.splice(this.pos);
        var temp = this.pos;
        point.dataset.info.split('').forEach((val)=>{
          this.equationContent[temp++] = val;
        })
        this.equationContent = this.equationContent.concat(this.right)
        cacheEquation.value = this.equationContent.join('');
        this.pos += point.dataset.info.split('').length-(p?1:0);
        cacheEquation.setSelectionRange(this.pos,this.pos);
      }
    }
  }

  componentWillReceiveProps(req) {
    this.equationContent = [];
    this.pos = 0
  }

  render() {

    var postions = {};
    postions.display = 'block';
    postions.left = '650px';
    postions.top = 120+this.props.position*66+'px';
    if (!this.props.show) {postions={};}

    return (
        <table id="keyBord" style={postions} onClick={this.keyClick.bind(this)}  ref={(key) => this.key = key}>
          <tbody>
            <tr>
              <td className="l" data-info='9'>9</td>
              <td className="l" data-info='8'>8</td>
              <td className="l" data-info='7'>7</td>
              <td className="l" data-info='+'>+</td>
              <td data-info='sin()'>sin</td>
              <td data-info='cos()'>cos</td>
              <td data-info='tan()'>tan</td>
              <td data-info='x'>x</td>
              <td colSpan="2" data-info='back'>
                <img alt='img' src={back}/>
              </td>
            </tr>
            <tr>
              <td className="l" data-info='4'>4</td>
              <td className="l" data-info='5'>5</td>
              <td className="l" data-info='6'>6</td>
              <td className="l" data-info='-'>-</td>
              <td data-info='e'>e</td>
              <td data-info='π'>
                <img alt='img' src={pi}/>
              </td>
              <td data-info='log(,)'>
                <img alt='img' src={log}/>
              </td>
              <td data-info='ln()'>
                <img alt='img' src={ln}/>
              </td>
              <td colSpan="2" rowSpan="2" data-info='sure'>
                <img alt='img' src={sure}/>
              </td>
            </tr>
            <tr>
              <td className="l" data-info='1'>1</td>
              <td className="l" data-info='2'>2</td>
              <td className="l" data-info='3'>3</td>
              <td className="l" data-info='*'>*</td>
              <td data-info='pow(,x)'>
                <img alt='img' src={yx}/>
              </td>
              <td data-info='sqrts(,)'>
                <img alt='img' src={xgy}/>
              </td>
              <td data-info='sqrt()'>
                <img alt='img' src={xg2}/>
              </td>
              <td data-info='pow(x,)'>
                <img alt='img' src={xy}/>
              </td>
            </tr>
            <tr>
              <td className="l" data-info='0'>0</td>
              <td className="l"></td>
              <td className="l" data-info='.'>.</td>
              <td className="l" data-info='/'>/</td>
              <td  data-info='abs()'>
                <img alt='img' src={abs}/>
              </td>
              <td data-info='('>(</td>
              <td data-info=')'>)</td>
              <td data-info='x/y'>
                <img alt='img' src={xcy}/>
              </td>
              <td data-info='left'>
                <img alt='img' src={left}/>
              </td>
              <td data-info='right'>
                <img alt='img' src={right}/>
              </td>
            </tr>
          </tbody>
        </table>
    );
  }
}

export default KeyBoard;