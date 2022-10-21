/**
 * @file
 * 창의 URL 변경, 새 창 열기 등을 담당하는 모듈입니다.
 * 웹 환경일 경우 브라우저에게, Electron 환경일 경우 밑단(Node.js)에게 요청하여 창을 생성 & 조작합니다.
 */

import { isDefined } from "common/Util";
import type { IpcRendererEvent } from "electron";

/**
 * 밑단(Node.js)과 주고받을 수 있는 메시지의 channel의 자료형입니다.
 */
type Channel =
  | "ReloadCurrentWindow"
  | "MinimizeCurrentWindow"
  | "MaximizeCurrentWindow"
  | "CloseWholeApp"
  | "lcu-connect"
  | "lcu-return";

const isRunningOnElectron = isDefined((window as any).electron);
export { isRunningOnElectron };

/**
 * 주어진 창에서 Electron으로 IPC 통신을 통해 메시지를 보냅니다.
 * 창을 지정하지 않을 경우, 현재 창을 사용합니다.
 */
function sendMessage(targetWindow: Window | undefined | null, channel: Channel, ...args: Array<any>) {
  // Electron 환경일 경우, Preload.js에서 정의한 객체가 됩니다.
  // 웹 환경일 경우 undefined가 됩니다.
  const { electron } = (targetWindow ?? window) as any;

  if (isDefined(electron)) {
    electron.sendMessage(channel, ...args);
  }
}

export function onMessage(
  targetWindow: Window | undefined | null,
  channel: Channel,
  listener: (event: IpcRendererEvent, arg: any) => void
) {
  // Electron 환경일 경우, Preload.js에서 정의한 객체가 됩니다.
  // 웹 환경일 경우 undefined가 됩니다.
  const { electron } = (targetWindow ?? window) as any;

  if (isDefined(electron)) {
    electron.onMessage(channel, listener);
  }
}

export function offMessage(
  targetWindow: Window | undefined | null,
  channel: Channel,
  listener: (event: IpcRendererEvent, arg: any) => void
) {
  // Electron 환경일 경우, Preload.js에서 정의한 객체가 됩니다.
  // 웹 환경일 경우 undefined가 됩니다.
  const { electron } = (targetWindow ?? window) as any;

  if (isDefined(electron)) {
    electron.offMessage(channel, listener);
  }
}

/**
 * App 편집창을 열 때 필요한 정보들입니다.
 */
export interface AppProps {
  timestamp?: string;
  width?: number;
  height?: number;
}

/**
 * 새로고침을 합니다.
 */
export function reloadCurrentWindow(targetWindow?: Window) {
  if (isRunningOnElectron) {
    sendMessage(targetWindow, "ReloadCurrentWindow");
  }
}

/**
 * 현재 창을 최소화합니다.
 */
export function minimizeCurrentWindow(targetWindow?: Window) {
  if (isRunningOnElectron) {
    sendMessage(targetWindow, "MinimizeCurrentWindow");
  } else {
    console.log("최소화는 Electron 환경에서만 작동합니다.");
  }
}

/**
 * 현재 창을 최대화합니다.
 * 창이 이미 최대화가 되어있으면 원래 크기로 복원합니다.
 */
export function maximizeCurrentWindow(targetWindow?: Window) {
  if (isRunningOnElectron) {
    sendMessage(targetWindow, "MaximizeCurrentWindow");
  } else {
    console.log("최대화는 Electron 환경에서만 작동합니다.");
  }
}

/**
 * 프로그램 전체를 종료합니다.
 */
export function closeWholeApp(targetWindow?: Window) {
  if (isRunningOnElectron) {
    sendMessage(targetWindow, "CloseWholeApp");
  } else {
    window.close();
  }
}

/**
 * connect
 */
export function connectLeagueClient(targetWindow?: Window) {
  if (isRunningOnElectron) {
    sendMessage(targetWindow, "lcu-connect");
  } else {
  }
}

export function onLeagueConnect() {
  if (isRunningOnElectron) {
  }
}

/**
 * return
 */

export function returnGameName() {}
