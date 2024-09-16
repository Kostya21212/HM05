

import TodosForm from "../TodosForm/TodosForm";
import TodosList from "../TodosList/TodosList";
import { useState } from "react";
import "./Todos.css";

export default function Todos({ liftingNewTodoToApp }) {
  const [newTodo, setNewTodo] = useState({})
  const liftedNewTodo = (item) => {
    console.log("обьект в Todos: ", item);
    liftingNewTodoToApp(item);
    setNewTodo(item)
    
  };

  return (
    <>
      <TodosForm liftingNewTodo={liftedNewTodo} />
      <TodosList newTodo = {newTodo} />
    </>
  );
}
