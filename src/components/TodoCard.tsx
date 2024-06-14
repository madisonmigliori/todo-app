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
      <div>
        <input
          type="checkbox"
          className="check-box"
          checked={todo.completed}
          onChange={() => handleChange(todo.id)}
        ></input>{" "}
        <span className={` ${todo.completed ? "completed" : ""}`}>
          {todo.message}
        </span>
      </div>
      <div className="button-hover">
        <button className="delete-task" onClick={() => deleteTask(todo.id)}>
          <img src="icon-cross.svg" />
        </button>
      </div>
    </li>
  );
}

//set to-do items and then delete is import the
