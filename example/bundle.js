(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CanvasGrid = require('../index.js');

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
    grid.fillSection(ev.gridInfo.x, ev.gridInfo.y, activeColor);
  } else {
    grid.clearSection(ev.gridInfo.x, ev.gridInfo.y);
  }
});
},{"../index.js":2}],2:[function(require,module,exports){
 var cPc = require('canvas-pixel-color');

function CanvasGrid(canvas, borderColor) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  this.borderColor = borderColor || '#000000';

  this.cvsPos = {
    x: this.canvas.offsetLeft,
    y: this.canvas.offsetTop
  };

  var self = this;
  this.canvas.addEventListener('click', function(ev) {
    var pos = {
        x: ev.x + self.cvsPos.x,
        y: ev.y + self.cvsPos.y
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
    var x = Math.round(pos.x / this.rowWidth) - 1;
    var y = Math.round(pos.y / this.columnHeight) - 1;
    return {
      x: x,
      y: y,
      dimensions: {
        t: this.columnHeight * y,
        l: this.rowWidth * x,
        w: this.rowWidth,
        h: this.columnHeight
      }
    };
  },

  fillSection: function(x, y, color) {
    this.ctx.fillStyle = color || this.borderColor;
    this.ctx.fillRect(this.rowWidth * x + 1, this.columnHeight * y + 1, this.rowWidth - 1.4, this.columnHeight - 2);
  },

  clearSection: function(x, y) {
    this.ctx.clearRect(this.rowWidth * x + 1, this.columnHeight * y + 1, this.rowWidth - 1.4, this.columnHeight - 2);
  },

  drawMatrix: function(matrix) {
    for (var i = 0; i < matrix.y; i++) {
      this.drawRow(this.ctx, matrix.x, matrix.y, i);
    }
  },

  drawRect: function(ctx, left, top, width, height) {
    ctx.strokeStyle = this.borderColor;
    ctx.strokeRect(left, top, width, height);
  },

  drawRow: function(ctx, x, y, idx) {
    var width = this.rowWidth = this.canvas.width / x,
        height = this.columnHeight = this.canvas.height / y,
        top = 0 + (idx * height),
        left = 0;

    for (var i = 0; i < x; i++) {
      var l = left + (i * width);
      this.drawRect(ctx, l, top, width, height);
    }
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