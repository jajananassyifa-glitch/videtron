const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

let mainWindow;  // Jendela Operator (Laptop Utama)
let outputWindow; // Jendela Videtron (Layar Kedua)

function createWindows() {
  const displays = screen.getAllDisplays();
  const primaryDisplay = screen.getPrimaryDisplay();
  const externalDisplay = displays.find((display) => display.id !== primaryDisplay.id);

  // 1. BUKA JENDELA OPERATOR (Layar Laptop)
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "Videtron Studio - Control Panel",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Buka file index.html dari repo kamu
  mainWindow.loadFile('index.html');

  // 2. BUKA JENDELA OUTPUT (Layar Videtron)
  if (externalDisplay) {
    outputWindow = new BrowserWindow({
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y,
      width: externalDisplay.bounds.width,
      height: externalDisplay.bounds.height,
      fullscreen: true,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
  } else {
    outputWindow = new BrowserWindow({
      width: 960,
      height: 540,
      title: "Preview Output Videtron",
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
  }

  // Buka halaman output / pop-up Videtron
  outputWindow.loadFile('index.html'); 

  mainWindow.on('closed', () => app.quit());
}

app.whenReady().then(createWindows);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
