import { NextPage } from 'next';
import TodoRegist from './todo-regist';
import TodoList from './todo-list';
import { ReactNode, useState } from 'react';

interface TodoTemplateProps {
    children: ReactNode;
}

const TodoTemplate:NextPage<TodoTemplateProps> = ({children}) => {
  //단일 할일 텍스트 상태값 저장변수
  const [todo, setTodo] = useState<string>('');

  //할일목록 문자열 배열 상태값 정의하기
  const [todos, setTodos] = useState<string[]>([]);


  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {children}
    </div>
  );
};

export default TodoTemplate;
