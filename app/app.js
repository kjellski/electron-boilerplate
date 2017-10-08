(function () {'use strict';

var electron = require('electron');

// This gives you default context menu (cut, copy, paste)
// in all input fields and textareas across your app.

const Menu = electron.remote.Menu;
const MenuItem = electron.remote.MenuItem;

const isAnyTextSelected = () => {
  return window.getSelection().toString() !== '';
};

const cut = new MenuItem({
  label: 'Cut',
  click: () => {
    document.execCommand('cut');
  },
});

const copy = new MenuItem({
  label: 'Copy',
  click: () => {
    document.execCommand('copy');
  },
});

const paste = new MenuItem({
  label: 'Paste',
  click: () => {
    document.execCommand('paste');
  },
});

const normalMenu = new Menu();
normalMenu.append(copy);

const textEditingMenu = new Menu();
textEditingMenu.append(cut);
textEditingMenu.append(copy);
textEditingMenu.append(paste);

document.addEventListener('contextmenu', (event) => {
  switch (event.target.nodeName) {
    case 'TEXTAREA':
    case 'INPUT':
      event.preventDefault();
      textEditingMenu.popup(electron.remote.getCurrentWindow());
      break;
    default:
      if (isAnyTextSelected()) {
        event.preventDefault();
        normalMenu.popup(electron.remote.getCurrentWindow());
      }
  }
}, false);

// Convenient way for opening links in external browser, not in the app.
// Useful especially if you have a lot of links to deal with.
//
// Usage:
//
// Every link with class ".js-external-link" will be opened in external browser.
// <a class="js-external-link" href="http://google.com">google</a>
//
// The same behaviour for many links can be achieved by adding
// this class to any parent tag of an anchor tag.
// <p class="js-external-link">
//    <a href="http://google.com">google</a>
//    <a href="http://bing.com">bing</a>
// </p>

const supportExternalLinks = (event) => {
  let href;
  let isExternal = false;

  const checkDomElement = (element) => {
    if (element.nodeName === 'A') {
      href = element.getAttribute('href');
    }
    if (element.classList.contains('js-external-link')) {
      isExternal = true;
    }
    if (href && isExternal) {
      electron.shell.openExternal(href);
      event.preventDefault();
    } else if (element.parentElement) {
      checkDomElement(element.parentElement);
    }
  };

  checkDomElement(event.target);
};

document.addEventListener('click', supportExternalLinks, false);

// ------------------------------------------------
// add and remove the listener once the button is
// pressed / let go of or out of the window

var registerPressedMoveListener = (element, pressedMoveListener) => {
  element.addEventListener("mousedown", (event) => {
    element.addEventListener("mousemove", pressedMoveListener);
  });

  element.addEventListener("mouseup", (event) => {
    if (pressedMoveListener) {
      element.removeEventListener("mousemove", pressedMoveListener);
    }
  });

  element.addEventListener("mouseout", (event) => {
    if (pressedMoveListener) {
      element.removeEventListener("mousemove", pressedMoveListener);
    }
  });
};

// Here is the starting point for your application code.

// Small helpers you might want to keep
// All stuff below is just to show you how it works. You can delete all of it.
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

const drawPoint = ({ x, y }) => {
  context.strokeStyle = "#df4b26";
  context.fillRect(x, y, 1, 1);
};

const mouseMoveListener = (moveEvent) => {
  drawPoint(moveEvent);
  // your code here :)

};


registerPressedMoveListener(canvas, mouseMoveListener);

}());
//# sourceMappingURL=app.js.map