// OPTIONS
const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  Tray
} = require('electron');
const path = require('path');
const url = require('url');
let win;
let tray = null;
const mpIcon = './favicon.png';

const template = [{
    role: 'window',
    submenu: [{
      role: 'close',
      accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q'
    }]
  },
  {
    role: 'help',
    submenu: [{
      label: '?',
      accelerator: process.platform === 'darwin' ? 'Cmd+I' : 'Ctrl+I',
      click() {
        dialog.showMessageBox({
          type: 'info',
          title: 'About',
          message: 'Edit MP3 tags!'
        });
        //require('electron').shell.openExternal('https://www.mattepuffo.com');
      }
    }]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// FUNCTIONS
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    //height: 700,
    resizable: false,
    icon: mpIcon
  });
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  //win.webContents.openDevTools();

  tray = new Tray(mpIcon);
  tray.setToolTip('MP3-Edit');

  win.on('closed', () => {
    win = null;
  });
}

// APP
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
