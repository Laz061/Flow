import { useState, useEffect } from "react";
import styles from "./TodoList.module.css";

type TodoItem = string;

export default function TodoList() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const storageKey = "todoItems";

  // Load items
  useEffect(() => {
    const savedItems = localStorage.getItem(storageKey);
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setItems(parsedItems);
      } catch (error) {
        console.error("Failed to parse saved items:", error);
      }
    }
  }, []);

  const addItem = () => {
    if (!inputValue.trim()) return;

    const newItems = [...items, inputValue];
    setItems(newItems);
    localStorage.setItem(storageKey, JSON.stringify(newItems));
    setInputValue("");
  };

  const deleteItem = (index: number) => {
    setItems((prev) => {
      const newItems = prev.filter((_, i) => i !== index);
      localStorage.setItem(storageKey, JSON.stringify(newItems));
      return newItems;
    });
  };

  return (
    <div className={styles.todoWrapper}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addItem();
            }
          }}
          className={styles.todoInput}
        />
        <button onClick={addItem} className={styles.addButton}>
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>

      <div className={styles.todoItems}>
        {items.map((item, index) => (
          <div key={index} className={styles.itemContainer}>
            <p className={styles.itemText}>{item}</p>
            <button
              onClick={() => deleteItem(index)}
              className={styles.deleteButton}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
