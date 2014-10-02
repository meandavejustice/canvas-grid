# Canvas-grid

[![NPM](https://nodei.co/npm/canvas-grid.png?downloads=true)](https://npmjs.org/package/canvas-grid)

Draw a grid on canvas and be able to interact with rows, and columns as well as
get data about the grid.

## Usage

``` javascript

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
  if (ev.gridInfo.color.hex !== activeColor) {
    grid.fillCell(ev.gridInfo.x, ev.gridInfo.y, activeColor);
  } else {
    grid.clearCell(ev.gridInfo.x, ev.gridInfo.y);
  }
});
  
```
Available Methods:
* drawRow: args[y axis, # of columns, width of cells];
* drawMatrix: args[Object with attrs "x"(# of columns) & "y"(# of rows)]
* fillCell: args[columnNumber, rowNumber, color(string, hex or rgba)]
* clearCell: args[columnNumber, rowNumber]

## Example
[http://davejustice.com/canvas-grid](http://davejustice.com/canvas-grid)

## License
MIT
