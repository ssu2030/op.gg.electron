import { useState } from "react";

import OPGGPageComponent from "./layouts/OPGGPageComponent";
import RunningStateComponent from "./layouts/RunningStateComponent";

import { LeagueOfLegendIcon, OPGGIcon, ValorantIcon } from "common/Assets";

import style from "pages/MainContent.module.scss";

const MainContentComponent = () => {
  const [page, setPage] = useState<"op.gg" | "lol" | "valo">("op.gg");

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
        <div className={style.iconWrapper}>
          <LeagueOfLegendIcon
            className={style.svgColor}
            onClick={() => {
              setPage("lol");
            }}
          />
        </div>
        <div className={style.iconWrapper}>
          <ValorantIcon
            className={style.svgColor}
            onClick={() => {
              setPage("valo");
            }}
          />
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
