// Here is the starting point for your application code.

// Small helpers you might want to keep
import './helpers/context_menu.js';
import './helpers/external_links.js';

// All stuff below is just to show you how it works. You can delete all of it.
import { remote } from 'electron';
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

const drawPoint = ({ x, y }, color) => {
  context.fillStyle = color;
  context.fillRect(x, y, 2, 2);
}

const getMousePos = (canvas, evt) => {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};

const mouseMoveListener = (moveEvent) => {
  const point = getMousePos(canvas, moveEvent);
  drawPoint(point, 'blue');

  // your code here :)
};


import registerPressedMoveListener from './mouse_listener';
registerPressedMoveListener(canvas, mouseMoveListener);
