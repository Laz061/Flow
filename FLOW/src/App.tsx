import styles from "./styles/layout.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import TodoList from "./Components/TodoList/TodoList";
import Vinyl from "./Components/Background/Vinyl";

function App() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.background}>
        <Vinyl />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.leftHalf}>
            <TodoList></TodoList>
          </div>
          <div className={styles.rightHalf}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
