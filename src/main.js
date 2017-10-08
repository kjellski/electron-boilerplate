// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import { app, Menu, ipcMain, webContents } from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { editMenuTemplate } from './menu/edit_menu_template';
import createWindow from './helpers/window';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

const setApplicationMenu = () => {
  const menus = [editMenuTemplate];
  if (env.name !== 'production') {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (${env.name})`);
}

let windows = {};
let windowIndex = 0;
const createWindowSide = () => {
  const windowName = `window-${windowIndex++}`;
  const win = createWindow(windowName, {
    width: 400,
    height: 400,
    resizable: false
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true,
  }));

  if (env.name === 'development') {
    win.openDevTools();
  }

  win.on('closed', () => {
    delete windows[windowName];
  });

  return windows[windowName] = win;
};

app.on('ready', () => {
  setApplicationMenu();

  createWindowSide();
  createWindowSide();

  // your code here :)
  ipcMain.on('draw', (event, arg) => {
    const renderers = webContents.getAllWebContents();
    renderers.forEach( (renderer) => {
      if (renderer === event. sender) {
        return;
      }

      renderer.send('draw', arg);
    });
  });
});

app.on('create-draw-window', () => {
  createWindowSide();
});

app.on('window-all-closed', () => {
  app.quit();
});

