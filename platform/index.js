const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const { authenticate } = require("league-connect");
const ps = require("ps-node");

const path = require("path");
const platformPath = path.join(app.getAppPath(), "platform");

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
    webPreferences: {
      // 창(BrowserWindow)이 window.open()으로 직접 새 창을 열 때,
      // Electron에서 제공하는 wrapper(BrowserWindowProxy) 대신 브라우저에서 제공하는 창을 그대로 사용합니다.
      // 팝업창 등의 구현을 위하여 창에서 다른 창의 DOM API를 접근해야 하는데, BrowserWindowProxy는 DOM API가 뚫려있지 않아 이 옵션을 활성화합니다.
      // Electron 15부터는 이 옵션이 default로 true이어서, 만약 Electron 버전이 업데이트 되면 이 줄은 제거해도 됩니다.
      nativeWindowOpen: true,
      // 브라우저 쪽 코드에 require() 등의 Node.js API들을 뚫어주지 않습니다.
      nodeIntegration: false,
      preload: path.join(platformPath, "Preload.js"),
    },
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

async function connect() {
  let stat = "disconnect";
  await authenticate({
    awaitConnection: false,
    pollInterval: 5000,
  }).then(value => {
    ps.lookup({ pid: value.pid }, (err, resultList) => {
      console.log("data: [%s], [%s] , [%s]", resultList[0].pid, resultList[0].arguments, resultList[0].command);
      if (err) {
        throw new Error(err);
      }
      const process = resultList[0];
      if (process) {
        const data = process.command;
        if (data.indexOf("League of Legend") >= 0) {
          console.log("==== lol find");
          stat = "lol";
        } else if (data.indexOf("VALORANT") >= 0) {
          console.log("=== valorant");
          stat = "val";
        } else {
          console.log("no find");
          stat = "disconnect";
        }
      } else {
        console.log("no such process found!");
      }
    });
  });
  return stat;
}

app.on("ready", () => {
  globalShortcut.register("F5", onRequestReload);
  globalShortcut.register("F10", onRequestDevTools);
  globalShortcut.register("F12", onRequestDevTools);

  let gameNameType = "disconnect";

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

  ipcMain.on("lcu-connect", event => {
    gameNameType = connect();
    //event.reply("lcu-return", gameNameType);
  });

  const firstWindow = createWindow({ closeAppWhenClose: true });
  openURL(firstWindow, `${app.getAppPath()}/dist/index.html`);
});
