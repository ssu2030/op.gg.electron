import style from "pages/layouts/OPGGPage.module.scss";

const OPGGPageComponent = () => (
  <div className={style.page}>
    <iframe className={style.iFrame} src="https://www.op.gg/" frameBorder={0} />
  </div>
);

export default OPGGPageComponent;
