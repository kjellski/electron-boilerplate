// Here is the starting point for your application code.

// Small helpers you might want to keep
import './helpers/context_menu.js';
import './helpers/external_links.js';

// All stuff below is just to show you how it works. You can delete all of it.
import { remote } from 'electron';
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

const drawPoint = ({ x, y }) => {
  context.strokeStyle = "#df4b26";
  context.fillRect(x, y, 1, 1);
}

const mouseMoveListener = (moveEvent) => {
  drawPoint(moveEvent);
  // your code here :)

};


import registerPressedMoveListener from './mouse_listener';
registerPressedMoveListener(canvas, mouseMoveListener);
