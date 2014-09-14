# Canvas-grid


Playing around with canvas, grids, and interacting with each grid section.

I don't recommend using this, but if you'd like to...

``` javascript
       var cvs = document.getElementById('grid');

       var grid = new canvasGrid(cvs, {});

       grid.drawMatrix({
         x: 16,
         y: 4
       });

```

Apparently tracking shapes that you have drawn on canvas appears to be pretty
annoying if you are using canvas directly, I ended up storing the positions
in an object on the grid prototype. Paper.js makes it very easy to update
shapes and keep references to them. I'd really like to come up with an easy
way to do these as I don't feel I need much of the functionality that paper.js
provides, and prefer much smaller modular libraries.
