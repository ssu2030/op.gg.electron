/**
 * @file
 * 웹페이지를 띄울 때 자동으로 실행되는 스크립트
 * Electron 전용 API들을 프론트엔드 코드에 뚫어주기 위해 사용
 * BrowserWindow에서 nodeIntegration: true을 하여 프론트엔트 코드에서 Electron API를 직접 import하는 방안도 있지만,
 * 그것은 보안적인 위험성이 존재하여 이렇게 preload script에서 필요한 API를 뚫어주는 방법을 선택
 */

const { ipcRenderer, contextBridge } = require("electron");

// 브라우저 쪽에 객체 'electron'을 생성해줍니다.
contextBridge.exposeInMainWorld("electron", {
  sendMessage: (channel, ...args) => {
    return ipcRenderer.send(channel, ...args);
  },
  onMessage: (channel, listener) => {
    ipcRenderer.on(channel, listener);
  },
  offMessage: (channel, listener) => {
    ipcRenderer.off(channel, listener);
  },
});
