import style from "pages/layouts/RunningState.module.scss";

interface RunningStateComponentProps {
  gameName: string;
  status: string;
}
// 추후 어떤 게임이 실행되는지에 대한 정보를 받아
// 현재 해당게임이 실행중이 아닌 경우에 실행중이 아니거나 실행중임을 표시할 예정

/**
 * 게임의 실행 유무를 표현하는 컴포넌트
 */
const RunningStateComponent = ({ gameName, status }: RunningStateComponentProps) => (
  <div className={style.textValue}>{gameName + status}</div>
);

export default RunningStateComponent;
