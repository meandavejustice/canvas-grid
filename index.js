function canvasGrid(canvas, options) {
  this.canvas = canvas;
  this.rows = options.rows;
  this.columns = options.columns;
  this.borderColor = options.borderColor || '#000000';
  this.fillColor = options.fillColor || '#ffffff';
  this.activeColor = options.activeColor || 'pink';
  this.matrix = options.matrix || null;
  this.outerDimentions = options.outerDimentions || {width: canvas.width, height: canvas.height};

  this.ctx = this.canvas.getContext('2d');


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
    var rect = self.lookup(pos)
    self.ctx.fillStyle = self.activeColor;
    self.ctx.fillRect(rect.l + 1, parseInt(rect.t, 10) + 1, rect.w - 1 , rect.h - 2);
  });
  this.store = {};
}

canvasGrid.prototype.lookup = function(pos, cb) {
  var tops = Object.keys(this.store);

  var result = false;

  var self = this;
  function testTop(top, curTop) {
    return top < curTop && curTop < top + self.columnHeight;
  }

  function testLeft(left, curLeft) {
    return left < curLeft && curLeft < left + self.rowWidth;
  }

  // this is horribly inefficient
  tops.forEach(function(top) {
    if (testTop(parseInt(top, 10), pos.y)) {
      this.store[top].forEach(function(left, idx) {
        if (testLeft(left, pos.x)) {
          result = {
            t: top,
            l: this.store[top][idx],
            w: this.rowWidth,
            h: this.columnHeight
          };
        }
      }, this);
    }
  }, this);

  return result;
};

canvasGrid.prototype.drawMatrix = function(matrix) {
  for (var i = 0; i < matrix.y; i++) {
    this.drawRow(this.ctx, matrix.x, matrix.y, i);
  }
}

canvasGrid.prototype.drawRect = function(ctx, left, top, width, height) {
  ctx.strokeStyle = this.borderColor | '#000000';
  ctx.strokeRect(left, top, width, height);
}

canvasGrid.prototype.drawRow = function(ctx, x, y, idx) {
  var width = this.rowWidth = this.canvas.width / x,
      height = this.columnHeight = this.canvas.height / y,
      top = 0 + (idx * height),
      left = 0;

  this.store[top] = [];

  for (var i = 0; i < x; i++) {
    var l = left + (i * width);
    this.store[top].push(l);
    this.drawRect(ctx, l, top, width, height);
  }
}