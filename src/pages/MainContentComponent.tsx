import { useState } from "react";

import OPGGPageComponent from "./layouts/OPGGPageComponent";
import RunningStateComponent from "./layouts/RunningStateComponent";

import { LeagueOfLegendIcon, OPGGIcon, ValorantIcon } from "common/Assets";

import style from "pages/MainContent.module.scss";
import classNames from "classnames";

// import { connectLeagueClient } from "Window";

type stat = "lol" | "val" | "disconnect";

/**
 * 왼쪽 툴페인에선 선택을 하면 현재 상태에 따라 스타일이 변하지만 추후
 * api 로 부터 리턴받은 값을 가지고 on된 부분에 스타일을 줄 예정
 */
const MainContentComponent = () => {
  const [page, setPage] = useState<"op.gg" | "lol" | "valo">("op.gg");

  // setInterval(() => {
  //   connectLeagueClient();
  //   console.log("execute");
  // }, 2500);

  return (
    <div className={style.mainContentent}>
      <div className={style.leftToolBar}>
        <div className={style.opggIconWrapper}>
          <OPGGIcon
            onClick={() => {
              setPage("op.gg");
            }}
          />
        </div>
        <div
          className={classNames(style.iconWrapper, { [style.isActive]: page === "lol" })}
          onClick={() => {
            setPage("lol");
          }}
        >
          <LeagueOfLegendIcon className={style.icon} />
          <div className={style.iconBorder} />
        </div>
        <div
          className={classNames(style.iconWrapper, { [style.isActive]: page === "valo" })}
          onClick={() => {
            setPage("valo");
          }}
        >
          <ValorantIcon className={style.icon} />
          <div className={style.iconBorder} />
        </div>
      </div>
      <div className={style.mainContentDivision}></div>
      <div className={style.contentSection}>
        {page === "op.gg" ? (
          <OPGGPageComponent />
        ) : page === "lol" ? (
          <RunningStateComponent gameName="League Of Legend" />
        ) : page === "valo" ? (
          <RunningStateComponent gameName="Valolant" />
        ) : null}
      </div>
    </div>
  );
};

export default MainContentComponent;
