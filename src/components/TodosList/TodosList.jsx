import React, { useState, useEffect, useMemo } from "react";
import "./TodosList";
import services from "../../../services/todos";

export default function TodosList({ newTodo }) {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState("");

  const sortedTodos = useMemo(
    () => todos.sort((a, b) => b.completed - a.completed),
    [todos]
  );

  const getTodos = async () => {
    try {
      const response = await services.get();
      console.log("Fetched todos:", response);
      setTodos(response);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (Object.keys(newTodo).length) getTodos();
  }, [newTodo]);

  const capitalizeFirstLetter = (text) => {
    if (typeof text !== "string") return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const getItemNames = (item) => {
    const classes = ["todos__item"];
    if (item.completed) classes.push("todos__item_completed btn__completed");
    if (item.active) classes.push("todos__item_active");
    return classes.join(" ");
  };

  const handleItemDelete = async (e, id) => {
    e.stopPropagation();
    console.log(`Attempting to delete item with id: ${id}`);
    try {
      await services.delete(id);
      console.log(`Successfully deleted item with id: ${id}`);
      getTodos();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const handleChangeCompleted = async (e, item) => {
    e.stopPropagation();
    console.log(`Attempting to update item with id: ${item.id}`);
    try {
      await services.put(item.id, { ...item, completed: !item.completed });
      console.log(`Successfully updated item with id: ${item.id}`);
      getTodos();
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };

  const handleItemActive = async (item) => {
    await services.put(item.id, { ...item, active: true });
    getTodos();
  };

  const handleEditClick = (id, currentText) => {
    setEditingId(id);
    setNewText(currentText);
  };

  const handleTextChange = (event) => {
    setNewText(event.target.value);
  };

  const handleSaveClick = async (id) => {
    try {
      const updatedItem = todos.find((item) => item.id === id);
      await services.put(id, { ...updatedItem, title: newText });
      setEditingId(null);
      getTodos();
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };
   
  return sortedTodos.length ? (
    <ul>
      {sortedTodos.map((item) => (
        <li
          key={item.id}
          className={getItemNames(item)}
          onClick={() => handleItemActive(item)}
        >
          {editingId === item.id ? (
            <>
              <input type='text' className="todos__item_text_input" value={newText} onChange={handleTextChange} />
              <div className="todos__item_container">
                <button onClick={() => handleSaveClick(item.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
              
            </>
          ) : (
            <>
              {capitalizeFirstLetter(item.title)}
              <div className="todos__box_btn">
                <button onClick={(e) => handleItemDelete(e, item.id)}>
                  Delete
                </button>
                <button onClick={() => handleEditClick(item.id, item.title)}>
                  Change
                </button>
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(e) => handleChangeCompleted(e, item)}
                />
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  ) : null;
}
