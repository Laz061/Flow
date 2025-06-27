import styles from "./styles/layout.module.css";
import TodoList from "./Components/TodoList/TodoList";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.content}>
        <div className={styles.leftHalf}>
          <TodoList></TodoList>
        </div>
        <div className={styles.rightHalf}></div>
      </div>
    </div>
  );
}

export default App;
