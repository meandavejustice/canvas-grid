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
    grid.fillSection(ev.gridInfo.x, ev.gridInfo.y, activeColor);
  } else {
    grid.clearSection(ev.gridInfo.x, ev.gridInfo.y);
  }
});
  
```
Available Methods:
* drawRow: args[canvasContext, x(number of columns), y(total number of rows including this one), index(row number)]; **changing soon**
* drawMatrix: args[Object with attrs "x"(# of columns) & "y"(# of rows)]
* fillSection: args[columnNumber, rowNumber, color(string, hex or rgba)]
* clearSection: args[columnNumber, rowNumber]

## Example
[requirebin](http://requirebin.com/?gist=e3bcb7c64041c80ce2da) thanks @maxogden!

## License
MIT
