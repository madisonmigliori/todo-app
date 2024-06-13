import type { Task } from "../App";

// TO-DO: pass down delete button
interface TodoCardProps {
  todo: Task;
  deleteTask: (id: string) => void;
  handleChange: (id: string) => void;
}

//TO DO importing the functions
export default function TodoCard({
  todo,
  handleChange,
  deleteTask,
}: TodoCardProps) {
  return (
    <li draggable="true">
      <input
        type="checkbox"
        id="check-box"
        checked={todo.completed}
        onChange={() => handleChange(todo.id)}
      ></input>
      {todo.message}
      <button className="delete-task" onClick={() => deleteTask(todo.id)}>
        <img src="icon-cross.svg" />
      </button>
    </li>
  );
}

//set to-do items and then delete is import the
