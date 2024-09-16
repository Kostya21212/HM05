import React from 'react'
import Todos from './components/Todos/Todos'


function App() {
  const liftNewTodo = (item) => {
    console.log("Обьект перейшов в App:", item);
  };
  return (
    <>
      <Todos liftingNewTodoToApp={liftNewTodo}></Todos>
    </>
  );
}

export default App
