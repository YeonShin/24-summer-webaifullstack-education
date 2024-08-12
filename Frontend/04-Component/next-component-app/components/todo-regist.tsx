import { NextPage } from 'next';
import TodoType from '@/interface/todo';

interface TodoRegistProps {
  todo: TodoType;
  todoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
}

const TodoRegist = ({todo, todoChange, onSave}: TodoRegistProps) => {
  //할일 텍스트 변경 이벤트 처리 함수

  return (
    <form className="flex mb-4">
      <input
        type="text"
        value={todo.title}
        onChange={todoChange}
        className="flex-grow border border-gray-300 rounded px-4 py-2 mr-2"
        placeholder="Enter a todo"
      />
      <button
        type="button"
        onClick={onSave}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
    </form>
  );
};

export default TodoRegist;
