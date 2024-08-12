import TodoList from '@/components/todo-list';
import TodoRegist from '@/components/todo-regist';
import TodoTemplate from '@/components/todo-template';
import TodoType from '@/interface/todo';
import React, { HTMLInputTypeAttribute, useState } from 'react';

const Todo = () => {
  const [todo, setTodo] = useState<TodoType>({
    title: '',
    desc: '',
    selected: false,
  });

  const [todos, setTodos] = useState<TodoType[]>([]);

  const todoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: event.target.value });
  };

  const onSave = () => {
    setTodos([...todos, todo]);
  };

  const removeItem = (index: number) => {
    const filteredTodos = todos.filter(
      (item: TodoType, i: number) => i !== index,
    );
    setTodos(filteredTodos);
  };

  return (
    // 할일 컨테이너 영역
    <TodoTemplate>
      <TodoRegist todo={todo} todoChange={todoChange} onSave={onSave} />
      <TodoList todos={todos} removeItem={removeItem}/>
    </TodoTemplate>
  );
};

export default Todo;
