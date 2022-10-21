import style from "pages/layouts/OPGGPage.module.scss";

/**
 * op.gg 페이지를 표시하는 컴포넌트
 */
const OPGGPageComponent = () => (
  <div className={style.page}>
    <iframe className={style.iFrame} src="https://www.op.gg/" frameBorder={0} />
  </div>
);

export default OPGGPageComponent;
