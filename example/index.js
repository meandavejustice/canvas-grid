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