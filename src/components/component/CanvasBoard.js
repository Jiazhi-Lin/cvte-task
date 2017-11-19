import React, { Component } from 'react';
// import { render } from 'react-dom';
import './CanvasBoard.css'
import ToolBoard from './ToolBoard'

class CanvasBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  canvasController(canvasNode) {

    // 画坐标轴的函数
    this.drawCoordinate = drawCoordinate;
    function drawCoordinate(context,showGrid) {
        //函数参数配置变量
        var canvas = {height:550,width:560};
        var AXIS_MARGIN = 40,    //一个常量
            AXIS_ORIGIN = {x:AXIS_MARGIN+200,y:canvas.height-AXIS_MARGIN-260},   //原点坐标

            AXIS_TOP = AXIS_MARGIN-50,        //纵轴端点
            AXIS_RIGHT = canvas.width-AXIS_MARGIN,//横轴端点

            HORIZONTAL_TICK_SPACING = 10,   //横轴间距
            VERTICAL_TICK_SPACING = 10,    //纵轴间距

            AXIS_WIDTH = AXIS_RIGHT-AXIS_ORIGIN.x-10,    //横轴长度
            AXIS_HEIGHT=AXIS_ORIGIN.y-AXIS_TOP,       //纵轴长度

            NUM_VERTICAL_TICKS = AXIS_HEIGHT/VERTICAL_TICK_SPACING,    //纵轴标尺的数量
            NUM_HORIZONTAL_TICKS = AXIS_WIDTH/HORIZONTAL_TICK_SPACING,  //横轴标尺的数量

            TICK_WIDTH = 10,
            TICKS_LINEWIDTH = 0.5,
            TICKS_COLOR = "navy",

            AXIS_LINEWIDTH = 1.0,
            AXIS_COLOR = "black";

        //横坐标
        function drawHorizontalAxis(){
            context.beginPath();
            context.moveTo(AXIS_ORIGIN.x-260,AXIS_ORIGIN.y);
            context.lineTo(AXIS_RIGHT,AXIS_ORIGIN.y);
            context.stroke();
        }

        //纵坐标
        function drawVerticalAxis(){
            context.beginPath();
            context.moveTo(AXIS_ORIGIN.x,AXIS_ORIGIN.y+250);
            context.lineTo(AXIS_ORIGIN.x,AXIS_TOP);
            context.stroke();
        }

        //绘制纵坐标标尺及刻度数
        function drawHorizontalAxisTicks(){
            var deltaY,num=1;
            for (var i = 1;i<NUM_HORIZONTAL_TICKS;++i){
                context.beginPath();
                if(i%5===0){
                    deltaY = TICK_WIDTH;
                    text(num,i);
                    text(-num,-i+1);
                    num++;
                }else{
                    deltaY = TICK_WIDTH/2;
                };

                if(i === 1) {
                    deltaY = TICK_WIDTH;
                    text(0,0);
                }

                // if (i > 21) {break;}
                //正着画坐标
                context.moveTo(AXIS_ORIGIN.x + i*HORIZONTAL_TICK_SPACING,AXIS_ORIGIN.y - deltaY);
                context.lineTo(AXIS_ORIGIN.x + i*HORIZONTAL_TICK_SPACING,AXIS_ORIGIN.y + deltaY);

                // 反着画坐标
                context.moveTo(AXIS_ORIGIN.x - i*HORIZONTAL_TICK_SPACING,AXIS_ORIGIN.y - deltaY);
                context.lineTo(AXIS_ORIGIN.x - i*HORIZONTAL_TICK_SPACING,AXIS_ORIGIN.y + deltaY);

                context.stroke();

            }
            function text(num,i){
                context.font = "12pt Helvetica";
                context.fillText(num*5,AXIS_ORIGIN.x +(i-1)*HORIZONTAL_TICK_SPACING,AXIS_ORIGIN.y + 3*deltaY);
            }
        }

        //横坐标标尺及刻度
        function drawVertialAxisTicks(){
            var deltaX,num=0;

            for (var i=1;i<NUM_VERTICAL_TICKS;++i){
                context.beginPath();
                if(i % 5 === 0){
                    deltaX = TICK_WIDTH;
                    num++;
                    text(num,i-1);
                    text(-num,-i);
                }else{
                    deltaX = TICK_WIDTH/2;
                }
                context.moveTo(AXIS_ORIGIN.x - deltaX,AXIS_ORIGIN.y - i*VERTICAL_TICK_SPACING);
                context.lineTo(AXIS_ORIGIN.x + deltaX,AXIS_ORIGIN.y - i*VERTICAL_TICK_SPACING);

                context.moveTo(AXIS_ORIGIN.x - deltaX,AXIS_ORIGIN.y + i*VERTICAL_TICK_SPACING);
                context.lineTo(AXIS_ORIGIN.x + deltaX,AXIS_ORIGIN.y + i*VERTICAL_TICK_SPACING);

                context.stroke();

            }
            function text(num,i){
                context.font = "12pt Helvetica";
                context.fillText(num*5,AXIS_ORIGIN.x - 3*deltaX,AXIS_ORIGIN.y - i*VERTICAL_TICK_SPACING);
            }
        }

        //绘制网格
        function drawGrid(context,color,stepx,stepy){
            context.strokeStyle = color;
            context.lineWidth = 0.5;

            for(var i = stepx + 0.5; i < context.canvas.width;i += stepx){
                context.beginPath();
                context.moveTo(i,0);
                context.lineTo(i,context.canvas.height);
                context.stroke();
            }

            for(i = stepy + 0.5;i < context.canvas.height;i +=stepy){
                context.beginPath();
                context.moveTo(0,i);
                context.lineTo(context.canvas.width,i);
                context.stroke();
            }
        }
        // 一个控制器 绘制坐标轴和刻度
        function drawAxes(){
            context.save();
            context.strokeStyle = AXIS_COLOR;
            context.lineWidth = AXIS_LINEWIDTH;

            drawHorizontalAxis();
            drawVerticalAxis();

            context.lineWidth = 0.5;
            context.lineWidth = TICKS_LINEWIDTH;
            context.strokeStyle = TICKS_COLOR;

            drawHorizontalAxisTicks();
            drawVertialAxisTicks();
        }

        // 最后执行调用
        if (showGrid) {drawGrid(context,"lightgray",10,10);}
        drawAxes();
    }

    var canvas, context,
        height, width, xAxis, yAxis;
    var _this = this;//unit = 100,

    // 首屏展示
    function drawEquationInit() {
        canvas = canvasNode;
        context = canvas.getContext("2d");
        _this.context = context;
        context.font = '18px sans-serif';
        context.strokeStyle = '#000';
        context.lineJoin = 'round';
        height = canvas.height;
        width = canvas.width;
        xAxis = Math.floor(height / 2);
        yAxis = Math.floor(width / 2);
        context.save();
        _this.draw(true);
    }

    this.drawEquation = drawEquation
    function drawEquation(eq,color) {

        var x = -26;
        var end = 27;
        var AXIS_ORIGIN = {OX:240,OY:250};

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 2;

        // context.moveTo(AXIS_ORIGIN.OX+10*0.01,AXIS_ORIGIN.OY-eq(x)*10);
        context.moveTo(10*(x),eq(x)*10);
        for(;x < end;x += 0.01){
            // 这个是负半轴
            if(eq(x) > 25) continue;
            // if (x == 0) {continue;console.log(eq(x));}
            // console.log(x,eq(x));
            // context.lineTo(10*(x),eq(x)*10);
            // context.moveTo(AXIS_ORIGIN.OX+10*x,AXIS_ORIGIN.OY-eq(x)*10);
            context.lineTo(AXIS_ORIGIN.OX+10*(x),AXIS_ORIGIN.OY-eq(x)*10);
        }

        // x = -0.01;
        // context.moveTo(AXIS_ORIGIN.OX+10*0.01,AXIS_ORIGIN.OY-eq(x)*10);
        // for(x = -0.1;x > -25;x-=0.2){
        //     context.lineTo(AXIS_ORIGIN.OX+10*x,AXIS_ORIGIN.OY-eq(x)*10);
        //     console.log(eq(x)*10);
        // }
        context.stroke();
    }
    drawEquationInit();
  }

  explainEq(val) {
    var value = val,
        partern = /sin|cos|tan|pow|abs|sqrt/g,
        ps1 = /log\((\w+),(\w+)\)/g,
        ps2 = /e/g,
        ps3 = /π/g,
        ps4 = /ln\((\w+)\)/g,
        ps5 = /sqrts\((\w+),(\w+)\)/g;
    value = value.replace(partern,'Math.$&');
    value = value.replace(ps1,'Math.log($2)/Math.log($1)');
    value = value.replace(ps2,'Math.E');
    value = value.replace(ps3,'Math.PI');
    value = value.replace(ps4,'Math.log($1)');
    value = value.replace(ps5,'pow($1,1/$2)');
    return value;
  }

  draw(showGrid,showLine) {
      // 清除画布
      this.context.clearRect(0, 0, 500, 500);
      // 把坐标轴画出来
      this.context.beginPath();
      this.drawCoordinate(this.context,showGrid);
      this.context.stroke();
      this.context.save();
      if (!showLine) {
        this.props.eqArr.forEach((val,ind)=>{
          var q = new Function('x','return '+ this.explainEq(val));
          this.drawEquation(q,this.props.color[ind]);
        })
      }
      this.context.restore();
  };

  clearGrid (s){
      this.draw(s);
  }
  clearLine (){
      // 清除画布
      // 把函数的那个数组设置为空 然后
      this.draw(true,true);
      this.props.clearAll();
  }
  canvasScale(level){
      this.context.clearRect(0, 0, 500, 500);
      this.context.translate(240*(1-level), 250*(1-level));
      this.context.scale(level,level);
      this.draw(true)
  }
  componentDidMount(req) {
    this.canvasController(this.canvas);
    this.context = this.canvas.getContext("2d");
  }  
  componentDidUpdate(req) {
    this.draw(true);
  }


  render() {
    return (
    	<div className="Canvas-Board">
	      <canvas id="sineCanvas" width="500" height="500" ref={(canvas) => this.canvas = canvas}></canvas>
        <ToolBoard grid={this.clearGrid.bind(this)} reset={this.clearLine.bind(this)} scale={this.canvasScale.bind(this)}/>
      </div>
    );
  }
}

export default CanvasBoard;
