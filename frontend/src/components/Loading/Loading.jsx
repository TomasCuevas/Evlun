//* styles *//
import Styles from './Loading.module.css';

export const Loading = () => {
  return (
    <div className={Styles.container}>
      <span pan className={Styles.loader}></span>
    </div>
  );
};
