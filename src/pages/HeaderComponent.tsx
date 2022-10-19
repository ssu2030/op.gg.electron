import { CloseIcon, MaximizeIcon, MinimizeIcon, RefreshIcon } from "common/Assets";

import style from "pages/Header.module.scss";
import { minimizeCurrentWindow, maximizeCurrentWindow, closeWholeApp, reloadCurrentWindow } from "Window";

const HeaderComponent = () => (
  <div className={style.BG}>
    <div className={style.Rectangle}>
      <RefreshIcon
        className={style.Icon01Basic16pxRefresh}
        onClick={() => {
          reloadCurrentWindow();
        }}
      />
      <div className={style.refreshText}> 리로딩 </div>
    </div>
    <div className={style.iconsWrapper}>
      <div className={style.iconWrapper}>
        <MinimizeIcon
          onClick={() => {
            minimizeCurrentWindow();
          }}
        />
      </div>
      <div className={style.iconWrapper}>
        <MaximizeIcon
          onClick={() => {
            maximizeCurrentWindow();
          }}
        />
      </div>
      <div className={style.iconWrapper}>
        <CloseIcon
          onClick={() => {
            closeWholeApp();
          }}
        />
      </div>
    </div>
  </div>
);

export default HeaderComponent;
