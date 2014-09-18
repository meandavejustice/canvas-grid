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
    var x = Math.floor(pos.x / this.rowWidth);
    var y = Math.floor(pos.y / this.columnHeight);
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