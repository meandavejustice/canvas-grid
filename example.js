var CanvasGrid = require('canvas-grid');

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