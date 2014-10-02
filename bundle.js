(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CanvasGrid = require('./index.js');

var cvs = document.getElementById('grid');
var grid = new CanvasGrid(cvs, {
  borderColor: '#777'
});

var activeColor = '#ff0beb';

grid.drawMatrix({
  x: 16,
  y: 4
});

cvs.addEventListener('click', function(ev) {
  console.log('Attached: "ev.cursorPos"', ev.cursorPos);
  console.log('Attached: "ev.gridInfo"', ev.gridInfo);

  if (ev.gridInfo.color.hex !== activeColor) {
    grid.fillCell(ev.gridInfo.x, ev.gridInfo.y, activeColor);
  } else {
    grid.clearCell(ev.gridInfo.x, ev.gridInfo.y);
  }
});
},{"./index.js":2}],2:[function(require,module,exports){
var cPc = require('canvas-pixel-color');

function CanvasGrid(canvas, borderColor) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  this.borderColor = borderColor || '#000000';

  var self = this;
  this.canvas.addEventListener('click', function(ev) {
    var pos = {
        x: ev.offsetX || ev.layerX,
        y: ev.offsetY || ev.layerY
    };

    ev.cursorPos = pos;
    ev.gridInfo = self.lookup(pos);
    ev.gridInfo.color = cPc(ev, self.ctx);
  });
}

CanvasGrid.prototype = {
  lookup: function(pos) {
    // these are zero indexed, since they are most
    // likely representing an array/matrix.
    var x = Math.floor(pos.x / this.cellWidth);
    var y = Math.floor(pos.y / this.cellHeight);
    return {
      x: x,
      y: y,
      dimensions: {
        t: this.cellHeight * y,
        l: this.cellWidth * x,
        w: this.cellWidth,
        h: this.cellHeight
      }
    };
  },

  fillCell: function(x, y, color) {
    this.ctx.fillStyle = color || this.borderColor;
    this.ctx.fillRect(this.cellWidth * x + 1, this.cellHeight * y + 1, this.cellWidth - 1.4, this.cellHeight - 2);
  },

  clearCell: function(x, y) {
    this.ctx.clearRect(this.cellWidth * x + 1, this.cellHeight * y + 1, this.cellWidth - 1.4, this.cellHeight - 2);
  },

  drawMatrix: function(matrix) {
    this.cellWidth = this.canvas.width / matrix.x;
    this.cellHeight = this.canvas.height / matrix.y;

    this.drawTop();

    for(var i=1; i<matrix.y + 1; i++) {
      this.drawRow(this.cellHeight * i, matrix.x, this.cellWidth);
    }
  },

  drawTop: function () {
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.canvas.width, 0);
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke()
  },

  drawRow: function(y, columns, width) {
    // draw horizontal line at bottom of row.
    this.ctx.moveTo(0, y);
    this.ctx.lineTo(this.canvas.width, y);

    for(var x=0; x < columns + 1; x++) {
      this.ctx.moveTo(width * x, 0);
      this.ctx.lineTo(width * x, y);
    }

    this.ctx.strokeStyle = "#000";
    this.ctx.stroke()
  }
};

module.exports = CanvasGrid;
},{"canvas-pixel-color":3}],3:[function(require,module,exports){
function canvasPixelColor(ev, context) {
  var x = ev.offsetX || ev.layerX;
  var y = ev.offsetY || ev.layerY;
  var data = context.getImageData(x, y, 1, 1).data;
  var r = data[0];
  var g = data[1];
  var b = data[2];
  var a = data[3];

  return {
    hex: rgbToHex(r, g, b),
    rgba: [r,g,b,a]
  }
}

function rgbToHex(r, g, b) {
  return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
}

module.exports = canvasPixelColor;
},{}]},{},[1])