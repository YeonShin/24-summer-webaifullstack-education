import TodoType from '@/interface/todo';
import { NextPage } from 'next';

interface TodoListProps {
  todos: TodoType[];    
  removeItem: (index: number) => void;

}

const TodoList = ({todos, removeItem}: TodoListProps) => {
  //할일 삭제 이벤트 처리 함수
//   const removeItem = (
//     e: React.MouseEvent<HTMLButtonElement>,
//     index: number,
//   ) => {
//     //todos 배열에서 삭제하려는 index값과 일치하지 않는 모든 목록을 반환한다.
//     const filteredTodos = props.todos.filter(
//       (item: string, i: number) => i !== index,
//     );

//     //필터링된 배열목록으로 다시 할일목록 상태값을 갱신한다.
//     props.setTodos(filteredTodos);
//   };
  return (
    <ul>
      {todos.map((item: TodoType, index: number) => (
        <li
          key={index}
          className="flex items-center justify-between border-b border-gray-300 py-2"
        >
          <span>{item.title}</span>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
