import type { Task } from "../App";
// TO-DO: pass down delete button
interface TodoCardProps {
  todo: Task;
}

export default function TodoCard({ todo }: TodoCardProps) {
  return (
    <li>
      <input type="checkbox" id="check-box"></input>
      {todo.message}
    </li>
  );
}

//set to-do items and then delete is import the
