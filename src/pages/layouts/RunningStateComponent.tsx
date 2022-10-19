import style from "pages/layouts/RunningState.module.scss";

interface RunningStateComponentProps {
  gameName: string;
}

const RunningStateComponent = ({ gameName }: RunningStateComponentProps) => (
  <div className={style.textValue}> {gameName} 실행 중</div>
);

export default RunningStateComponent;
