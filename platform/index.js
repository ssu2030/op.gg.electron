const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");

function createWindow({
  width = 1440,
  height = 720,
  minWidth = 217,
  minHeight = 64,
  closeAppWhenClose = false,
  frame = false,
} = {}) {
  const newWindow = new BrowserWindow({
    // 창의 초기 크기.
    width,
    height,
    minWidth,
    minHeight,
    // 기본 제목 표시줄 및 메뉴를 숨깁니다.
    frame,
    closeAppWhenClose,
  });

  return newWindow;
}

async function openURL(browserWindow, url) {
  await browserWindow.loadFile(url);
}

// 새로고침
function onRequestReload() {
  const targetWindow = BrowserWindow.getFocusedWindow();

  if (targetWindow === null) {
    return;
  }

  targetWindow.webContents.reloadIgnoringCache();
}

// 개발자 도구
function onRequestDevTools() {
  const targetWindow = BrowserWindow.getFocusedWindow();

  if (targetWindow === null) {
    return;
  }
  targetWindow.webContents.toggleDevTools();
}

app.on("ready", () => {
  globalShortcut.register("F5", onRequestReload);
  globalShortcut.register("F10", onRequestDevTools);
  globalShortcut.register("F12", onRequestDevTools);

  // 브라우저로부터 메시지 왔을 때의 동작들 등록.
  ipcMain.on("ReloadCurrentWindow", event => {
    onRequestReload();
  });

  ipcMain.on("MinimizeCurrentWindow", event => {
    const targetWindow = BrowserWindow.fromWebContents(event.sender);

    if (targetWindow === null) {
      return;
    }

    targetWindow.minimize();
  });

  ipcMain.on("MaximizeCurrentWindow", event => {
    const targetWindow = BrowserWindow.fromWebContents(event.sender);

    if (targetWindow === null) {
      return;
    }

    if (targetWindow.isMaximized()) {
      targetWindow.unmaximize();
    } else {
      targetWindow.maximize();
    }
  });

  ipcMain.on("CloseWholeApp", event => {
    app.quit();
  });

  const firstWindow = createWindow({ closeAppWhenClose: true });
  openURL(firstWindow, `${app.getAppPath()}/dist/index.html`);
});
