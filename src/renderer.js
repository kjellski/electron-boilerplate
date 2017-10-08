// Here is the starting point for your application code.

// Small helpers you might want to keep
import './helpers/context_menu.js';
import './helpers/external_links.js';

// All stuff below is just to show you how it works. You can delete all of it.
import { remote, ipcRenderer } from 'electron';
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

const drawPoint = ({ x, y }, color) => {
  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
}

const mouseMoveListener = (moveEvent) => {
  const { x, y } = moveEvent;
  const point = { x, y };
  drawPoint(point, 'blue');
  // your code here :)
  ipcRenderer.send('draw', point);
};

ipcRenderer.on('draw', (event, arg) => {
  drawPoint(arg, 'red');
});

import registerPressedMoveListener from './mouse_listener';
registerPressedMoveListener(canvas, mouseMoveListener);
