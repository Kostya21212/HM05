import React, { useState, useRef } from 'react'
import './TodosForm.css'
import services from '../../../services/todos';
export default function TodosForm({liftingNewTodo}) {
    const DEFAULT_NEW_TODO = {
        title: 'Hello',
        completed: true
    };
    const formRef = useRef();
    const btnRef = useRef();
    const [newTodo, setNewTodo] = useState(DEFAULT_NEW_TODO);
    const handleNewTodoTitle = (event) => {
        setNewTodo(prevState => ({ ...prevState, title: event.target.value }));
    }
    const handleNewTodoCompleted = (event) => {
        setNewTodo(prevState => ({ ...prevState, completed: event.target.checked }));
    }
    const handleNewTodoSubmit = async (event) => {
        event.preventDefault();
        const response = await services.post(newTodo);
        liftingNewTodo(response);
        setNewTodo(DEFAULT_NEW_TODO)
        formRef.current.style.backgroundColor = 'brown'
        formRef.current.reset();
        btnRef.current.style.borderColor = 'red'
    }

  return (
      <form className="todos__form" onSubmit={handleNewTodoSubmit}
      ref={formRef}>
      <label>
        Title:{" "}
              <input
            className='todos__form_input_text'
          type="text"
          defaultValue={newTodo.title}
                  onChange={handleNewTodoTitle}
            placeholder='Введіть будь ласка текст'
        />
      </label>
      <label>
        Completed:{" "}
        <input
          type="checkbox"
          defaultChecked={newTodo.completed}
          onChange={handleNewTodoCompleted}
        />
      </label>
      <button ref={btnRef} className='todos__form_btn'>Add new Todo</button>
    </form>
  );
}
