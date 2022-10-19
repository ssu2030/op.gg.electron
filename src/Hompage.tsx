import HeaderComponent from "pages/HeaderComponent";
import MainContentComponent from "pages/MainContentComponent";

import style from "Homepage.module.scss";

const HomePage = () => (
  <div className={style.homePage}>
    <HeaderComponent />
    <div className={style.homePageDivision} />
    <div className={style.mainContentWrapper}>
      <MainContentComponent />
    </div>
  </div>
);

export default HomePage;
