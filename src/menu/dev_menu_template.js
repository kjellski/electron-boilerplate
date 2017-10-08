import { app, BrowserWindow } from 'electron';

export const devMenuTemplate = {
  label: 'Development',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: () => {
      BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
    },
  },
  {
    label: 'Toggle DevTools',
    accelerator: 'Alt+CmdOrCtrl+I',
    click: () => {
      BrowserWindow.getFocusedWindow().toggleDevTools();
    },
  },
  {
    label: 'Add new window',
    accelerator: 'Cmd+T',
    click: () => {
      app.emit('create-draw-window');
    }
  },
  {
    label: 'Quit',
    accelerator: 'CmdOrCtrl+Q',
    click: () => {
      app.quit();
    },
  }],
};
